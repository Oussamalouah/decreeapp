import {gql} from '@apollo/client';

/**
 * Gets the customer's profile from the Shopify database
 * Reference: https://shopify.dev/docs/storefront-api/reference/customers/customer
 */
export const GET_CUSTOMER_PROFILE = gql`
  query getCustomerProfile($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      acceptsMarketing
      defaultAddress {
        id
        address1
        address2
        city
        province
        country
        zip
        firstName
        lastName
        phone
      }
    }
  }
`;
