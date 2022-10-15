import {CollectionEdges} from '../StoreScreenContainer';
import _ from 'lodash';
import {extractMetadataField} from '../../../../utils/metadata-field-extractor';
import {metadataFields} from '../../../../utils/constants/metafields.constants';

/**
 * Filter collections here since we cant filter it via Shopify's API
 *
 * @param tags
 * @param tagTypeIds
 * @param collectionEdges
 * @param paperColors
 *
 * @returns collectionEdges
 */
export const getFilteredCollections = (
  tags: {id: string; text: string}[],
  tagTypeIds: string[],
  paperColors: string[],
  collectionEdges?: CollectionEdges
) => {
  if (!collectionEdges) {
    return [];
  }
  return collectionEdges?.filter(edge => {
    // If this has any value, it indicates its being shown elsewhere like the homepage
    const isSpecialBundle = edge.node.bundle_type?.value;

    if (isSpecialBundle) {
      return false;
    }

    const filteredTags = _.uniq(
      _.flatten(
        edge.node.products.edges.map(productEdge => productEdge.node.tags)
      )
    );
    const filteredColors = _.uniqBy(
      _.flatten(
        edge.node.products.edges.map(productEdge =>
          extractMetadataField(productEdge.node, metadataFields.PAPER_COLOR)
        )
      ),
      'name'
    );

    const productHasFilteredColors = paperColors?.every(paperColor =>
      filteredColors.some(filteredColor => filteredColor.name === paperColor)
    );
    const productHasFilteredTags = tagTypeIds.every(tag =>
      filteredTags.some(filteredTag => filteredTag === tag)
    );

    return productHasFilteredTags && productHasFilteredColors;
  });
};
