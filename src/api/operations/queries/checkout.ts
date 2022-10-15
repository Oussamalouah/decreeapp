import {gql} from '@apollo/client';
import {CORE_CHECKOUT_FIELDS} from '../fragments/checkout-fragment';

/**
 * Retrieves reactive checkoutId from the cache
 */
export const GET_CHECKOUT_ID = gql`
  query getCheckoutId {
    checkoutId @client
  }
`;

/**
 * Gets specific checkout by id
 * Reference: https://shopify.dev/docs/storefront-api/reference/checkouts/checkout
 * https://shopify.dev/graphiql/storefront-graphiql
 */
export const GET_CHECKOUT = gql`
  ${CORE_CHECKOUT_FIELDS}
  query getCheckout($id: ID!) {
    node(id: $id) {
      ... on Checkout {
        ...CoreCheckoutFields
      }
    }
  }
`;
