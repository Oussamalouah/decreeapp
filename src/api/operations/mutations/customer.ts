import {gql} from '@apollo/client';

/**
 * Updates an existing customer
 * Reference: https://shopify.dev/docs/storefront-api/reference/customers/customerupdate
 * Example variables {
 *   "customerAccessToken": "ae0f1d2e179c9571122a0595a6ac8125",
 *   "customer": {}
 * }
 */
export const CUSTOMER_UPDATE = gql`
  mutation customerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

/**
 * Updates the address of an existing customer.
 * Reference: https://shopify.dev/docs/storefront-api/reference/customers/customeraddressupdate
 * Exsample variables: {
 *  "customerAccessToken": "ae0f1d2e179c9571122a0595a6ac8125",
 *  "id": "Z2lkOi8vU2hvcGlmeS9FeGFtcGxlLzE=",
 *  "address": {}
 * }
 */
export const CUSTOMER_ADDRESS_UPDATE = gql`
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      customerAccessToken: $customerAccessToken
      id: $id
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

/**
 * Creates address for an existing customer
 * Reference: https://shopify.dev/docs/storefront-api/reference/customers/customeraddresscreate
 * Example Variables : {
  "customerAccessToken": "ae0f1d2e179c9571122a0595a6ac8125",
  "address": {}
}
 */
export const CUSTOMER_ADDRESS_CREATE = gql`
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
