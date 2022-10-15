import {StationeryTypes} from '../../../../utils/constants/stationery-type.constants';
import {
  greetingTags,
  weddingTags,
} from '../../../../utils/constants/store.contants';
import _ from 'lodash';

/**
 * Gets an array of tags corresponding to the stationery type
 *
 * @param stationeryType
 * @param productId
 *
 * @returns {{id: string, text: string}[]}
 */
export const getProductTags = (
  stationeryType: StationeryTypes | undefined,
  productId?: string
) => {
  if (stationeryType === StationeryTypes.WEDDING) {
    return weddingTags;
  } else if (stationeryType === StationeryTypes.GREETING) {
    return _.result(greetingTags, productId!, []);
  } else if (stationeryType === StationeryTypes.HOLIDAY) {
    return [];
  } else if (stationeryType === StationeryTypes.BESPOKE) {
    return [];
    // Uncomment out once business stationery is available
  } else if (stationeryType === StationeryTypes.BUSINESS) {
    return [];
  } else {
    return [];
  }
};
