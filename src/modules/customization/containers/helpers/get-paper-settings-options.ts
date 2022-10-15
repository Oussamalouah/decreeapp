import {getCheckout_node_Checkout_lineItems_edges_node_variant_product} from '../../../../api/operations/queries/__generated__/getCheckout';
import {getProduct_node_Product} from '../../../../api/operations/queries/__generated__/getProduct';
import {metadataFields} from '../../../../utils/constants/metafields.constants';
import {extractMetadataField} from '../../../../utils/metadata-field-extractor';
import {PaperSettingsOptions} from '../../models/PaperSettingsOptions';
import {quantityPresetFormatter} from '../../../../utils/quantity-preset-formatter';
import {formatPrice} from '../../../../utils/format-price';

const {QUANTITY_PRESET, PAPER_COLOR} = metadataFields;

/**
 * Gets the initial values of the fields for paper settings
 *
 * @param productNode
 * @param formatQuantityList
 *
 * @returns paperSettingsOptions
 */
export const getPaperSettingsOptions = (
  productNode:
    | getProduct_node_Product
    | getCheckout_node_Checkout_lineItems_edges_node_variant_product
    | undefined,
  formatQuantityList?: boolean,
  variantIndex = 0
) => {
  const quantityList = extractMetadataField(productNode, QUANTITY_PRESET);
  const price = productNode?.variants.edges[variantIndex]?.node.priceV2.amount;
  const productHasTierredPricing = productNode?.options.find(
    option => option.name === 'Tier'
  );

  const paperSettingsOptions: PaperSettingsOptions = {
    paperColorList: extractMetadataField(productNode, PAPER_COLOR),
    quantityList: productHasTierredPricing
      ? getTierredQuantityList(
          productNode,
          productNode?.variants.edges[variantIndex]?.node.title.split(' / ') ||
            [],
          quantityList
        )
      : formatQuantityList
      ? quantityPresetFormatter(price, quantityList)
      : quantityList,
  };

  return paperSettingsOptions;
};

const getTierredQuantityList = (
  productNode:
    | getProduct_node_Product
    | getCheckout_node_Checkout_lineItems_edges_node_variant_product
    | undefined,
  splittedTitle: string[],
  quantityList: {name: string; value: string}[]
) => {
  const productInfo: any = {};
  splittedTitle.forEach(optionIdentifier => {
    const optionName = productNode?.options.find(option =>
      option.values.includes(optionIdentifier)
    );

    if (optionName) {
      productInfo[optionName.name] = optionIdentifier;
    }
  });

  const tierredQuantity = quantityList.map(quantity => {
    const constructedProductTitle = Object.keys(productInfo)
      .map(key => {
        if (key === 'Tier') {
          return quantity.value;
        } else {
          return productInfo[key];
        }
      })
      .join(' / ');

    const productVariant = productNode?.variants.edges.find(
      variant => variant.node.title === constructedProductTitle
    );

    return {
      name: `${quantity.value} at ${formatPrice(
        productVariant?.node.priceV2.amount
      )}/ea`,
      value: quantity.value,
    };
  });

  return tierredQuantity;
};
