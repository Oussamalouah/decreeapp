import {gql} from '@apollo/client';
import {CORE_PRODUCT_FIELDS} from '../fragments/product-fragment';
import {CORE_PACKAGE_FIELDS} from '../fragments/package-fragment';

/**
 * Query for a single product
 * Ref: https://shopify.dev/docs/storefront-api/reference/products/product
 */
export const PRODUCT_QUERY = gql`
  ${CORE_PRODUCT_FIELDS}
  query getProduct($id: ID!) {
    node(id: $id) {
      ... on Product {
        ...CoreProductFields
      }
    }
  }
`;

export const PRODUCT_QUERY_BY_HANDLE = gql`
  ${CORE_PRODUCT_FIELDS}
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...CoreProductFields
    }
  }
`;

/**
 * Query for products with filters
 * Ref: https://shopify.dev/docs/storefront-api/reference/products/product
 */
export const PRODUCTS_QUERY = gql`
  ${CORE_PRODUCT_FIELDS}
  query getProducts($query: String!, $sortKey: ProductSortKeys) {
    products(first: 50, query: $query, sortKey: $sortKey) {
      edges {
        node {
          ...CoreProductFields
        }
      }
    }
  }
`;

/**
 * Query for a single collection/package
 * Ref: https://shopify.dev/docs/storefront-api/reference/products/collection
 */
export const PACKAGE_QUERY = gql`
  ${CORE_PACKAGE_FIELDS}
  query getPackage($id: ID!) {
    node(id: $id) {
      ... on Collection {
        ...CorePackageFields
      }
    }
  }
`;

/**
 * Query for collections/packages. Does not support filters.
 * Ref: https://shopify.dev/docs/storefront-api/reference/products/collection
 */
export const PACKAGES_QUERY = gql`
  ${CORE_PACKAGE_FIELDS}
  query getPackages {
    collections(first: 50) {
      edges {
        node {
          ...CorePackageFields
        }
      }
    }
  }
`;

/**
 * Query for related products. does not support number of recommendations.
 * Ref: https://shopify.dev/api/storefront/reference/common-objects/queryroot
 */
export const PRODUCT_RECOMMENDATION_QUERY = gql`
  ${CORE_PRODUCT_FIELDS}
  query getProductRecommendations($id: ID!) {
    productRecommendations(productId: $id) {
      ...CoreProductFields
    }
  }
`;
