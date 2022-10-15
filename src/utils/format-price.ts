import numeral from 'numeral';

/**
 * Formats the price to $0,0.00
 *
 * @param price
 * return {string}
 */
export const formatPrice = (price: string | number) => {
  return numeral(price).format('$0,0.00');
};
