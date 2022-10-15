import {gql} from '@apollo/client';
import {CORE_CHECKOUT_FIELDS} from '../fragments/checkout-fragment';

/**
 * Creates a new checkout.
 * Reference: https://shopify.dev/docs/storefront-api/reference/checkouts/checkoutcreate
 */
export const CHECKOUT_CREATE = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

/**
 * Adds a list of line items to a checkout.
 * Reference: https://shopify.dev/docs/storefront-api/reference/checkouts/checkoutlineitemsadd
 */
export const CHECKOUT_LINE_ITEMS_ADD = gql`
  ${CORE_CHECKOUT_FIELDS}
  mutation checkoutLineItemsAdd(
    $lineItems: [CheckoutLineItemInput!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
        ...CoreCheckoutFields
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

/**
 * Removes line items from an existing checkout.
 * Reference: https://shopify.dev/docs/storefront-api/reference/checkouts/checkoutlineitemsremove
 */
export const CHECKOUT_LINE_ITEMS_REMOVE = gql`
  ${CORE_CHECKOUT_FIELDS}
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      checkout {
        ...CoreCheckoutFields
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

/**
 * Updates a line item in a existing checkout.
 * Reference: https://shopify.dev/docs/storefront-api/reference/checkouts/checkoutlineitemsupdate
 */
export const CHECKOUT_LINE_ITEM_UPDATE = gql`
  ${CORE_CHECKOUT_FIELDS}
  mutation checkoutLineItemsUpdate(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemUpdateInput!]!
  ) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        ...CoreCheckoutFields
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

/**
 * Links customer to the current checkout
 * Ref: https://shopify.dev/docs/storefront-api/reference/checkouts/checkoutcustomerassociatev2
 */
export const CHECKOUT_LINK_CUSTOMER = gql`
  mutation associateCustomerWithCheckout(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`;

/**
 * Updates checkout shipping address
 * Ref: https://shopify.dev/api/storefront/reference/checkouts/checkoutshippingaddressupdatev2
 */
export const CHECKOUT_UPDATE_SHIPPING_ADDRESS = gql`
  mutation checkoutShippingAddressUpdateV2(
    $shippingAddress: MailingAddressInput!
    $checkoutId: ID!
  ) {
    checkoutShippingAddressUpdateV2(
      shippingAddress: $shippingAddress
      checkoutId: $checkoutId
    ) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
