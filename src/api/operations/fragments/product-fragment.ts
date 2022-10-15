import {gql} from '@apollo/client';

/**
 * Core fields of type Product
 * Ref for Product: https://shopify.dev/docs/storefront-api/reference/products/product
 * Ref for fragment: https://www.apollographql.com/docs/react/data/fragments/
 */
export const CORE_PRODUCT_FIELDS = gql`
  fragment CoreProductFields on Product {
    id
    tags
    title
    totalInventory
    description
    createdAt
    productType
    tags
    updatedAt
    options(first: 10) {
      id
      name
      values
    }
    subtitle: metafield(namespace: "global", key: "subtitle") {
      value
    }
    priceRange {
      maxVariantPrice {
        amount
      }
      minVariantPrice {
        amount
      }
    }
    metafields(first: 20) {
      edges {
        node {
          key
          value
        }
      }
    }
    images(first: 1) {
      edges {
        node {
          originalSrc
        }
      }
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
    variants(first: 30) {
      edges {
        node {
          id
          priceV2 {
            amount
            currencyCode
          }
          title
          image {
            originalSrc
          }
        }
      }
    }
  }
`;
