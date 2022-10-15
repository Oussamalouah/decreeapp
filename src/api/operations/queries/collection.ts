import {gql} from '@apollo/client';

/**
 * Gets the products of a collection
 *
 * Reference: https://shopify.dev/docs/storefront-api/reference/common-objects/queryroot#collectionbyhandle-2021-04
 */
export const GET_COLLECTION_PRODUCTS_BY_HANDLE = gql`
  query getCollectionProductsByHandle(
    $collectionHandle: String!
    $productsCount: Int!
  ) {
    collectionByHandle(handle: $collectionHandle) {
      description
      id
      title
      products(first: $productsCount) {
        edges {
          node {
            id
            title
            description
            tags
            productType
            subtitle: metafield(namespace: "global", key: "subtitle") {
              value
            }
            media(first: 10) {
              edges {
                node {
                  previewImage {
                    originalSrc
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
