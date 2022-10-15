import {
  bespokeCategories,
  businessCategories,
  greetingCategories,
  holidayCategories,
  weddingCategories,
} from './constants/store.contants';
import {StationeryTypes} from './constants/stationery-type.constants';

/**
 * Returns the stationery type based from the product type
 * @param productType
 */
export const getProductStationeryType = (productType: string | undefined) => {
  if (!productType) return;

  if (weddingCategories.some(category => category.id === productType)) {
    return StationeryTypes.WEDDING;
  } else if (greetingCategories.some(category => category.id === productType)) {
    return StationeryTypes.GREETING;
  } else if (holidayCategories.some(category => category.id === productType)) {
    return StationeryTypes.HOLIDAY;
  } else if (businessCategories.some(category => category.id === productType)) {
    return StationeryTypes.BUSINESS;
  } else if (bespokeCategories.some(category => category.id === productType)) {
    return StationeryTypes.BESPOKE;
  }
};
