/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CountryCode, CurrencyCode, OrderFulfillmentStatus, OrderFinancialStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCustomerOrders
// ====================================================

export interface getCustomerOrders_customer_orders_edges_node_shippingAddress {
  __typename: "MailingAddress";
  /**
   * The full name of the customer, based on firstName and lastName.
   */
  name: string | null;
  /**
   * The first name of the customer.
   */
  firstName: string | null;
  /**
   * The last name of the customer.
   */
  lastName: string | null;
  /**
   * The first line of the address. Typically the street address or PO Box number.
   */
  address1: string | null;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   */
  address2: string | null;
  /**
   * The name of the city, district, village, or town.
   */
  city: string | null;
  /**
   * The two-letter code for the country of the address.
   * 
   * For example, US.
   */
  countryCodeV2: CountryCode | null;
  /**
   * The zip or postal code of the address.
   */
  zip: string | null;
  /**
   * A unique phone number for the customer.
   * 
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone: string | null;
}

export interface getCustomerOrders_customer_orders_edges_node_lineItems_edges_node_customAttributes {
  __typename: "Attribute";
  /**
   * Value of the attribute.
   */
  value: string | null;
  /**
   * Key or name of the attribute.
   */
  key: string;
}

export interface getCustomerOrders_customer_orders_edges_node_lineItems_edges_node_variant_priceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
  /**
   * Currency of the money.
   */
  currencyCode: CurrencyCode;
}

export interface getCustomerOrders_customer_orders_edges_node_lineItems_edges_node_variant_product {
  __typename: "Product";
  /**
   * A categorization that a product can be tagged with, commonly used for filtering and searching.
   */
  productType: string;
  /**
   * Stripped description of the product, single line with HTML tags removed.
   */
  description: string;
}

export interface getCustomerOrders_customer_orders_edges_node_lineItems_edges_node_variant {
  __typename: "ProductVariant";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * The product variant’s price.
   */
  priceV2: getCustomerOrders_customer_orders_edges_node_lineItems_edges_node_variant_priceV2;
  /**
   * The product object that the product variant belongs to.
   */
  product: getCustomerOrders_customer_orders_edges_node_lineItems_edges_node_variant_product;
}

export interface getCustomerOrders_customer_orders_edges_node_lineItems_edges_node {
  __typename: "OrderLineItem";
  /**
   * The title of the product combined with title of the variant.
   */
  title: string;
  /**
   * List of custom attributes associated to the line item.
   */
  customAttributes: getCustomerOrders_customer_orders_edges_node_lineItems_edges_node_customAttributes[];
  /**
   * The product variant object associated to the line item.
   */
  variant: getCustomerOrders_customer_orders_edges_node_lineItems_edges_node_variant | null;
  /**
   * The number of entries associated to the line item minus the items that have been removed.
   */
  currentQuantity: number;
  /**
   * The number of products variants associated to the line item.
   */
  quantity: number;
}

export interface getCustomerOrders_customer_orders_edges_node_lineItems_edges {
  __typename: "OrderLineItemEdge";
  /**
   * The item at the end of OrderLineItemEdge.
   */
  node: getCustomerOrders_customer_orders_edges_node_lineItems_edges_node;
}

export interface getCustomerOrders_customer_orders_edges_node_lineItems {
  __typename: "OrderLineItemConnection";
  /**
   * A list of edges.
   */
  edges: getCustomerOrders_customer_orders_edges_node_lineItems_edges[];
}

export interface getCustomerOrders_customer_orders_edges_node_subtotalPriceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
  /**
   * Currency of the money.
   */
  currencyCode: CurrencyCode;
}

export interface getCustomerOrders_customer_orders_edges_node_totalTaxV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
  /**
   * Currency of the money.
   */
  currencyCode: CurrencyCode;
}

export interface getCustomerOrders_customer_orders_edges_node_totalShippingPriceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
  /**
   * Currency of the money.
   */
  currencyCode: CurrencyCode;
}

export interface getCustomerOrders_customer_orders_edges_node_totalPriceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
  /**
   * Currency of the money.
   */
  currencyCode: CurrencyCode;
}

export interface getCustomerOrders_customer_orders_edges_node_successfulFulfillments_trackingInfo {
  __typename: "FulfillmentTrackingInfo";
  /**
   * The tracking number of the fulfillment.
   */
  number: string | null;
  /**
   * The URL to track the fulfillment.
   */
  url: any | null;
}

export interface getCustomerOrders_customer_orders_edges_node_successfulFulfillments_fulfillmentLineItems_edges_node_lineItem_variant {
  __typename: "ProductVariant";
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * A globally-unique identifier.
   */
  id: string;
}

export interface getCustomerOrders_customer_orders_edges_node_successfulFulfillments_fulfillmentLineItems_edges_node_lineItem {
  __typename: "OrderLineItem";
  /**
   * The title of the product combined with title of the variant.
   */
  title: string;
  /**
   * The product variant object associated to the line item.
   */
  variant: getCustomerOrders_customer_orders_edges_node_successfulFulfillments_fulfillmentLineItems_edges_node_lineItem_variant | null;
}

export interface getCustomerOrders_customer_orders_edges_node_successfulFulfillments_fulfillmentLineItems_edges_node {
  __typename: "FulfillmentLineItem";
  /**
   * The amount fulfilled in this fulfillment.
   */
  quantity: number;
  /**
   * The associated order's line item.
   */
  lineItem: getCustomerOrders_customer_orders_edges_node_successfulFulfillments_fulfillmentLineItems_edges_node_lineItem;
}

export interface getCustomerOrders_customer_orders_edges_node_successfulFulfillments_fulfillmentLineItems_edges {
  __typename: "FulfillmentLineItemEdge";
  /**
   * The item at the end of FulfillmentLineItemEdge.
   */
  node: getCustomerOrders_customer_orders_edges_node_successfulFulfillments_fulfillmentLineItems_edges_node;
}

export interface getCustomerOrders_customer_orders_edges_node_successfulFulfillments_fulfillmentLineItems {
  __typename: "FulfillmentLineItemConnection";
  /**
   * A list of edges.
   */
  edges: getCustomerOrders_customer_orders_edges_node_successfulFulfillments_fulfillmentLineItems_edges[];
}

export interface getCustomerOrders_customer_orders_edges_node_successfulFulfillments {
  __typename: "Fulfillment";
  /**
   * The name of the tracking company.
   */
  trackingCompany: string | null;
  /**
   * Tracking information associated with the fulfillment,
   * such as the tracking number and tracking URL.
   */
  trackingInfo: getCustomerOrders_customer_orders_edges_node_successfulFulfillments_trackingInfo[];
  /**
   * List of the fulfillment's line items.
   */
  fulfillmentLineItems: getCustomerOrders_customer_orders_edges_node_successfulFulfillments_fulfillmentLineItems;
}

export interface getCustomerOrders_customer_orders_edges_node {
  __typename: "Order";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * A unique numeric identifier for the order for use by shop owner and customer.
   */
  orderNumber: number;
  /**
   * The date and time when the order was imported.
   * This value can be set to dates in the past when importing from other systems.
   * If no value is provided, it will be auto-generated based on current date and time.
   */
  processedAt: any;
  /**
   * The address to where the order will be shipped.
   */
  shippingAddress: getCustomerOrders_customer_orders_edges_node_shippingAddress | null;
  /**
   * List of the order’s line items.
   */
  lineItems: getCustomerOrders_customer_orders_edges_node_lineItems;
  /**
   * Price of the order before duties, shipping and taxes.
   */
  subtotalPriceV2: getCustomerOrders_customer_orders_edges_node_subtotalPriceV2 | null;
  /**
   * The total cost of taxes.
   */
  totalTaxV2: getCustomerOrders_customer_orders_edges_node_totalTaxV2 | null;
  /**
   * The total cost of shipping.
   */
  totalShippingPriceV2: getCustomerOrders_customer_orders_edges_node_totalShippingPriceV2;
  /**
   * The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive).
   */
  totalPriceV2: getCustomerOrders_customer_orders_edges_node_totalPriceV2;
  /**
   * The fulfillment status for the order.
   */
  fulfillmentStatus: OrderFulfillmentStatus;
  /**
   * The financial status of the order.
   */
  financialStatus: OrderFinancialStatus | null;
  /**
   * The unique URL for the order's status page.
   */
  statusUrl: any;
  /**
   * List of the order’s successful fulfillments.
   */
  successfulFulfillments: getCustomerOrders_customer_orders_edges_node_successfulFulfillments[] | null;
}

export interface getCustomerOrders_customer_orders_edges {
  __typename: "OrderEdge";
  /**
   * The item at the end of OrderEdge.
   */
  node: getCustomerOrders_customer_orders_edges_node;
}

export interface getCustomerOrders_customer_orders {
  __typename: "OrderConnection";
  /**
   * A list of edges.
   */
  edges: getCustomerOrders_customer_orders_edges[];
}

export interface getCustomerOrders_customer {
  __typename: "Customer";
  /**
   * The orders associated with the customer.
   */
  orders: getCustomerOrders_customer_orders;
}

export interface getCustomerOrders {
  /**
   * Find a customer by its access token.
   */
  customer: getCustomerOrders_customer | null;
}

export interface getCustomerOrdersVariables {
  customerAccessToken: string;
}
