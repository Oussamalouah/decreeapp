import {gql} from '@apollo/client';
import {CORE_PRODUCT_FIELDS} from './product-fragment';

/**
 * Core fields of type Collection
 * Ref for Collection: https://shopify.dev/docs/storefront-api/reference/products/collection
 * Ref for fragment: https://www.apollographql.com/docs/react/data/fragments/
 */
export const CORE_PACKAGE_FIELDS = gql`
  ${CORE_PRODUCT_FIELDS}
  fragment CorePackageFields on Collection {
    id
    title
    image {
      originalSrc
    }
    bundle_type: metafield(namespace: "global", key: "bundle_type") {
      value
    }
    subtitle: metafield(namespace: "global", key: "subtitle") {
      value
    }
    collection_type: metafield(namespace: "global", key: "collection_type") {
      value
    }
    metafields(first: 10) {
      edges {
        node {
          namespace
          key
        }
      }
    }
    products(first: 250) {
      edges {
        node {
          ...CoreProductFields
        }
      }
    }
  }
`;
