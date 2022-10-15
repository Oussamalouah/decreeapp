/* tslint:disable */
/* eslint-disable */

/**
 * Populates an array with blank data
 *
 * @param originalArray
 * @param itemsToAdd
 */
export const populateArray = (originalArray: any[], itemsToAdd: number) => {
  return [...originalArray, ...new Array(itemsToAdd)];
};
