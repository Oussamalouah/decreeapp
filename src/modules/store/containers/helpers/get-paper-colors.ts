import _ from 'lodash';
import {QueryProps} from '../StoreScreenContainer';
import {extractMetadataField} from '../../../../utils/metadata-field-extractor';
import {metadataFields} from '../../../../utils/constants/metafields.constants';

/**
 * Gets all the product nodes
 *
 * @param isPackages
 * @param data
 *
 * @returns {node: getProduct_node_Product}
 */
const getProducts = (isPackages: boolean, data: QueryProps) => {
  if (!isPackages) {
    return data?.products?.edges || [];
  } else {
    const packages = data?.collections?.edges;
    return _.flatten(packages?.map(edge => edge.node.products.edges));
  }
};

/**
 * Gets all the paper colors available
 *
 * @param isPackages
 * @param data
 *
 * @returns {id: string, text: string}[]
 */
export const getPaperColors = (
  isPackages: boolean,
  data: QueryProps | undefined
) => {
  if (!data) {
    return [];
  }

  const products = getProducts(isPackages, data);

  const colorArray = _.flatten(
    products.map(product =>
      extractMetadataField(product.node, metadataFields.PAPER_COLOR)
    )
  );

  return _.uniqBy(
    colorArray.map(color => ({id: color.value, text: color.name})),
    'id'
  );
};
