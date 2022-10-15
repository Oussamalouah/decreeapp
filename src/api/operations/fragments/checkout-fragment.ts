import {gql} from '@apollo/client';
import {CORE_PRODUCT_FIELDS} from './product-fragment';

/**
 * Core fields of type Checkout
 * Ref for checkout: https://shopify.dev/docs/storefront-api/reference/checkouts/checkout
 * Ref for fragment: https://www.apollographql.com/docs/react/data/fragments/
 */
export const CORE_CHECKOUT_FIELDS = gql`
  ${CORE_PRODUCT_FIELDS}
  fragment CoreCheckoutFields on Checkout {
    id
    email
    createdAt
    lineItems(first: 50) {
      edges {
        node {
          id
          customAttributes {
            key
            value
          }
          quantity
          title
          variant {
            id
            product {
              ...CoreProductFields
            }
            title
            sku
            priceV2 {
              amount
              currencyCode
            }
            image {
              originalSrc
            }
          }
        }
      }
    }
    lineItemsSubtotalPrice {
      amount
    }
    note
    subtotalPriceV2 {
      amount
    }
    updatedAt
    webUrl
    currencyCode
    totalPriceV2 {
      amount
    }
    completedAt
  }
`;
