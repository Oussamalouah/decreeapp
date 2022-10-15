import {gql} from '@apollo/client';

/**
 * Gets customer's orders
 * https://shopify.dev/docs/storefront-api/reference/orders/order
 */
export const GET_CUSTOMER_ORDERS = gql`
  query getCustomerOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 50) {
        edges {
          node {
            id
            orderNumber
            processedAt
            shippingAddress {
              name
              firstName
              lastName
              address1
              address2
              city
              countryCodeV2
              zip
              phone
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  customAttributes {
                    value
                    key
                  }
                  variant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      productType
                      description
                    }
                  }
                  currentQuantity
                  quantity
                }
              }
            }
            subtotalPriceV2 {
              amount
              currencyCode
            }
            totalTaxV2 {
              amount
              currencyCode
            }
            totalShippingPriceV2 {
              amount
              currencyCode
            }
            totalPriceV2 {
              amount
              currencyCode
            }
            fulfillmentStatus
            financialStatus
            statusUrl
            successfulFulfillments(first: 10) {
              trackingCompany
              trackingInfo {
                number
                url
              }
              fulfillmentLineItems(first: 10) {
                edges {
                  node {
                    quantity
                    lineItem {
                      title
                      variant {
                        title
                        id
                      }
                    }
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
