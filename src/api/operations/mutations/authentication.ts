import {gql} from '@apollo/client';

/**
 * Shopify mutation for creating access token.
 */
export const CUSTOMER_ACCESS_TOKEN_CREATE = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
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
 * Shopify mutation for sending password-reset email
 * Ref: https://shopify.dev/docs/storefront-api/reference/customers/customerrecover
 */
export const CUSTOMER_RECOVER = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

/**
 * Shopify mutation for creating new accounts
 * Ref: https://shopify.dev/docs/storefront-api/reference/customers/customercreate
 */
export const CUSTOMER_CREATE = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
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
 * Shopify mutation for deleting the customer access token
 * Ref: https://shopify.dev/api/storefront/reference/customers/customeraccesstokendelete
 */
export const CUSTOMER_ACCESS_TOKEN_DELETE = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;
