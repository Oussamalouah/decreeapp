import {
  DocumentNode,
  QueryHookOptions,
  QueryResult,
  useQuery,
} from '@apollo/client';
import {toast} from 'react-toastify';
import {
  GET_CHECKOUT,
  GET_CHECKOUT_ID,
} from '../../api/operations/queries/checkout';
import {
  PACKAGE_QUERY,
  PRODUCT_QUERY,
  PRODUCT_QUERY_BY_HANDLE,
  PRODUCT_RECOMMENDATION_QUERY,
} from '../../api/operations/queries/store';
import {
  getCheckoutVariables,
  getCheckout_node_Checkout,
} from '../../api/operations/queries/__generated__/getCheckout';
import {getCheckoutId} from '../../api/operations/queries/__generated__/getCheckoutId';
import {getPackage_node_Collection} from '../../api/operations/queries/__generated__/getPackage';
import {getProduct_node_Product} from '../../api/operations/queries/__generated__/getProduct';
import {getProductByHandle_productByHandle} from '../../api/operations/queries/__generated__/getProductByHandle';
import {getProductRecommendations} from '../../api/operations/queries/__generated__/getProductRecommendations';

type GetPackageQuery = {
  node: getPackage_node_Collection;
};

type GetProductQuery = {
  node: getProduct_node_Product;
};

/**
 * Gets Package/Collection data based on the id
 * @param id
 * @param args
 * @returns {packageData, loadingPackageData}
 */
export const usePackageData = (
  id: string,
  args?: {
    /** If true, the query is not executed */
    skip?: boolean;
    onCompleted?: (data: GetPackageQuery) => void;
  }
) => {
  const {data: packageData, loading: loadingPackageData} =
    useQuery<GetPackageQuery>(PACKAGE_QUERY, {
      fetchPolicy: 'cache-and-network',
      variables: {id},
      onCompleted: args?.onCompleted,
      onError: error => {
        toast.error(error.message);
      },
      skip: args?.skip,
    });

  return {packageData, loadingPackageData};
};

/**
 * Gets Product data based on the id
 * @param id
 * @param args
 * @returns {productData, loadingProductData}
 */
export const useProductData = (
  id: string,
  args?: {
    /** If true, the query is not executed */
    skip?: boolean;
    onCompleted?: (data: GetProductQuery) => void;
  }
) => {
  const {data: productData, loading: loadingProductData} = useQuery<{
    node: getProduct_node_Product;
  }>(PRODUCT_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {id},
    onCompleted: args?.onCompleted,
    skip: args?.skip,
  });

  return {productData, loadingProductData};
};

/**
 * Gets Product data based on the handle
 * @param handle
 * @param args
 * @returns {productData, loadingProductData}
 */
export const useProductByHandleData = (
  handle: string,
  args?: {
    /** If true, the query is not executed */
    skip?: boolean;
    onCompleted?: (data: {productByHandle: getProduct_node_Product}) => void;
  }
) => {
  const {data: productData, loading: loadingProductData} = useQuery<{
    productByHandle: getProductByHandle_productByHandle;
  }>(PRODUCT_QUERY_BY_HANDLE, {
    fetchPolicy: 'cache-and-network',
    variables: {handle},
    onCompleted: args?.onCompleted,
    skip: args?.skip,
  });

  return {productData, loadingProductData};
};

/**
 * Gets checkout data based on reactive checkoutId
 * @returns {loadingCheckoutData, checkoutData}
 */
export const useCheckoutData = () => {
  // Gets reactive checkoutId from the cache
  const {data} = useQuery<getCheckoutId>(GET_CHECKOUT_ID);

  // Gets checkout data using reactive checkoutId
  const {loading: loadingCheckoutData, data: checkoutData} = useQuery<
    // getCheckout doesn't let us have access to stuff like node.id
    {node: getCheckout_node_Checkout},
    getCheckoutVariables
  >(GET_CHECKOUT, {
    variables: {
      id: data?.checkoutId || '',
    },
    // checks cache and updates if it doesnt match with server-side
    fetchPolicy: 'cache-and-network',
    onError: e => {
      // skip error message if existingCheckoutId() is empty
      const isInvalidIdErr =
        e.message === 'Variable $id of type ID! was provided invalid value';
      if (!isInvalidIdErr) {
        toast.error(e.message);
      }
    },
  });

  return {loadingCheckoutData, checkoutData};
};

/**
 * Gets product recommendations data based on product id
 * @returns {recommendationsData, loadingRecommendationsData}
 */
export const useRelatedProductsData = (
  id: string,
  args?: {
    skip?: boolean;
  }
) => {
  const {data: recommendationsData, loading: loadingRecommendationsData} =
    useQuery<getProductRecommendations>(PRODUCT_RECOMMENDATION_QUERY, {
      fetchPolicy: 'cache-and-network',
      variables: {id},
      skip: args?.skip,
    });

  return {recommendationsData, loadingRecommendationsData};
};

/**
 * Returns an array of useQuery hooks
 *
 * @param queries
 */
export const useManyQueries = <TData>(
  queries: [DocumentNode, QueryHookOptions][]
): QueryResult<TData>[] => {
  return queries.map(queryData => {
    const [query, options] = queryData;
    return useQuery<TData>(query, options);
  });
};
