import {formatPrice} from './format-price';

type QuantityOption = {
  name: string;
  value: string;
};

/**
 * Formats the name of the quantity list metafield to have a price attached
 *
 * @param productPrice
 * @param quantityOptions
 * @returns {{name: string, value: string}[]}
 */
export const quantityPresetFormatter = (
  productPrice: number,
  quantityOptions: QuantityOption[]
) => {
  return quantityOptions.map(option => {
    return {
      name: `${option.name} at ${formatPrice(productPrice || 0)}/ea`,
      value: option.value,
    };
  });
};
