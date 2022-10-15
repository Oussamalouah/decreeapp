import {StationeryTypes} from '../../../../utils/constants/stationery-type.constants';
import {
  bespokeCategories,
  // Uncomment out once business stationery is available
  businessCategories,
  greetingCategories,
  holidayCategories,
  weddingCategories,
} from '../../../../utils/constants/store.contants';

/**
 * Gets an array of categories corresponding to the stationery type
 *
 * @param stationeryType
 *
 * @returns {{id: string, text: string}[]}
 */
export const getProductCategories = (
  stationeryType: StationeryTypes | undefined
) => {
  if (stationeryType === StationeryTypes.WEDDING) {
    return weddingCategories;
  } else if (stationeryType === StationeryTypes.BESPOKE) {
    return bespokeCategories;
  } else if (stationeryType === StationeryTypes.HOLIDAY) {
    return holidayCategories;
  } else if (stationeryType === StationeryTypes.GREETING) {
    return greetingCategories;
    // Uncomment out once business stationery is available
  } else if (stationeryType === StationeryTypes.BUSINESS) {
    return businessCategories;
  } else {
    return [];
  }
};
