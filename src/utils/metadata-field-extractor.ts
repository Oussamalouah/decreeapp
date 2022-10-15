import _ from 'lodash';
import {getCheckout_node_Checkout_lineItems_edges_node_variant_product} from '../api/operations/queries/__generated__/getCheckout';
import {getPackage_node_Collection_products_edges_node} from '../api/operations/queries/__generated__/getPackage';
import {getProduct_node_Product} from '../api/operations/queries/__generated__/getProduct';
import {colorFields, metadataFields} from './constants/metafields.constants';

const fontWeightNames = {
  '100': 'Thin',
  '200': 'Extra Light',
  '300': 'Light',
  '400': 'Normal',
  '500': 'Medium',
  '600': 'Semi Bold',
  '700': 'Bold',
  '800': 'Extra Bold',
  '900': 'Black',
} as {
  [key: string]: string;
};

/**
 * Extracts metadata fields from product
 *
 * @param product
 * @param field
 * @param unit
 *
 * @return {{name: string, value: string}[]} metadata
 */
export const extractMetadataField = (
  product:
    | getProduct_node_Product
    | getCheckout_node_Checkout_lineItems_edges_node_variant_product
    | getPackage_node_Collection_products_edges_node
    | undefined,
  field: string,
  unit?: string
) => {
  try {
    if (!product) return [];

    const edges = product.metafields.edges;
    const index = edges.findIndex(item => item.node.key === field);

    return edges[index].node.value.split(',').map(item => {
      const trimmedItem = _.trim(item);

      if (field === metadataFields.FONT_WEIGHT) {
        return {
          name: fontWeightNames[trimmedItem] || trimmedItem,
          value: trimmedItem,
        };
      } else if (colorFields.some(colorField => colorField === field)) {
        // Example color metadata:
        // Blue: #005EB8
        const colorArray = trimmedItem.split(':');
        const colorName = _.trim(_.first(colorArray));
        const colorValue = _.trim(_.last(colorArray));

        return {
          name: colorName,
          value: colorValue,
        };
      }

      return {
        name: unit ? `${trimmedItem} px` : trimmedItem,
        value: trimmedItem,
      };
    });
  } catch (e) {
    return [];
  }
};
