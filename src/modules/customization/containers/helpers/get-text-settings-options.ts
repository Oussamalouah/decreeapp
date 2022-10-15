import {getCheckout_node_Checkout_lineItems_edges_node_variant_product} from '../../../../api/operations/queries/__generated__/getCheckout';
import {getProduct_node_Product} from '../../../../api/operations/queries/__generated__/getProduct';
import {metadataFields} from '../../../../utils/constants/metafields.constants';
import {productFontSizes} from '../../../../utils/constants/product-font-sizes.constants';
import {extractMetadataField} from '../../../../utils/metadata-field-extractor';
import {TextSettingsOptions} from '../../models/TextSettingsOptions';

const {FONT_COLOR, FONT_WEIGHT, FONT_STYLE} = metadataFields;

/**
 * Gets the initial values of the fields for the text settings
 *
 * @param productNode
 *
 * @returns textSettingsOptions
 */
export const getTextSettingsOptions = (
  productNode:
    | getProduct_node_Product
    | getCheckout_node_Checkout_lineItems_edges_node_variant_product
    | undefined
) => {
  const textSettingsOptions: TextSettingsOptions = {
    fontColorList: extractMetadataField(productNode, FONT_COLOR),
    fontWeightList: extractMetadataField(productNode, FONT_WEIGHT),
    fontSizeList: productFontSizes,
    fontList: extractMetadataField(productNode, FONT_STYLE),
  };

  return textSettingsOptions;
};
