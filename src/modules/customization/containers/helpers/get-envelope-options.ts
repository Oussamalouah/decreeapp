import {getProduct_node_Product} from '../../../../api/operations/queries/__generated__/getProduct';
import {metadataFields} from '../../../../utils/constants/metafields.constants';
import {extractMetadataField} from '../../../../utils/metadata-field-extractor';
import {quantityPresetFormatter} from '../../../../utils/quantity-preset-formatter';
import {getCheckout_node_Checkout_lineItems_edges_node_variant_product} from '../../../../api/operations/queries/__generated__/getCheckout';
import {EnvelopeSettingsOptions} from '../../models/EnvelopeSettingsOptions';

const {ENVELOPE_COLOR, QUANTITY_PRESET, LINING_COLOR} = metadataFields;

/**
 * Gets the envelope options for the envelope customizer
 *
 * @param productNode
 * @param formatQuantityList
 * @param variantIndex
 *
 * @returns EnvelopeSettingsOptions
 */

export const getEnvelopeOptions = (
  productNode:
    | getProduct_node_Product
    | getCheckout_node_Checkout_lineItems_edges_node_variant_product
    | undefined,
  formatQuantityList: boolean,
  variantIndex = 0
) => {
  const quantityList = extractMetadataField(productNode, QUANTITY_PRESET);
  const envelopeColorList = extractMetadataField(productNode, ENVELOPE_COLOR);
  const liningColorList = extractMetadataField(productNode, LINING_COLOR);
  const price = productNode?.variants.edges[variantIndex]?.node.priceV2.amount;

  const envelopeSettingsOptions: EnvelopeSettingsOptions = {
    quantityList: formatQuantityList
      ? quantityPresetFormatter(price, quantityList)
      : quantityList,
    envelopeColorList,
    liningColorList: [
      ...liningColorList,
      ...parseEnvelopeDescription(productNode?.description),
    ],
  };

  return envelopeSettingsOptions;
};

const parseEnvelopeDescription = (description: string | undefined) => {
  if (!description) {
    return [];
  }

  const liningPatternOptions = description.split(',').map(option => {
    const liningPatterKeyValue = option.split('|');
    return {
      name: liningPatterKeyValue[0].trim(),
      value: liningPatterKeyValue[1],
    };
  });

  return liningPatternOptions;
};
