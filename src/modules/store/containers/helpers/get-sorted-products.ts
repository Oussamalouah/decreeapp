import {StationeryTypes} from '../../../../utils/constants/stationery-type.constants';
import {ProductEdges} from '../StoreScreenContainer';
import {extractMetadataField} from '../../../../utils/metadata-field-extractor';
import {metadataFields} from '../../../../utils/constants/metafields.constants';

/**
 * Sorts products if under bespoke so that tags with custom card will always be first
 * paper color is also filtered here since we cant filter using shopify
 *
 * @param stationeryType
 * @param productEdges
 * @param paperColors
 */
export const getSortedProducts = (
  stationeryType: StationeryTypes | undefined,
  productEdges?: ProductEdges,
  paperColors?: string[]
) => {
  const products = productEdges?.filter(product => {
    const productPaperColors = extractMetadataField(
      product.node,
      metadataFields.PAPER_COLOR
    );
    return paperColors?.every(paperColor =>
      productPaperColors.some(productColor => productColor.name === paperColor)
    );
  });
  const isBespokeStationery = stationeryType === StationeryTypes.BESPOKE;

  if (!products || !isBespokeStationery) {
    return products || [];
  }

  return [...products].sort((p1, p2) => {
    if (p1.node.tags.includes('custom-card')) {
      return -1;
    } else if (p2.node.tags.includes('custom-card')) {
      return 1;
    } else {
      return 0;
    }
  });
};
