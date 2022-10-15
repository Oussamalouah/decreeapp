/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCustomerProfile
// ====================================================

export interface getCustomerProfile_customer_defaultAddress {
  __typename: "MailingAddress";
  /**
   * A globally-unique identifier.
   */
  id: string;
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
   * The region of the address, such as the province, state, or district.
   */
  province: string | null;
  /**
   * The name of the country.
   */
  country: string | null;
  /**
   * The zip or postal code of the address.
   */
  zip: string | null;
  /**
   * The first name of the customer.
   */
  firstName: string | null;
  /**
   * The last name of the customer.
   */
  lastName: string | null;
  /**
   * A unique phone number for the customer.
   * 
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone: string | null;
}

export interface getCustomerProfile_customer {
  __typename: "Customer";
  /**
   * A unique identifier for the customer.
   */
  id: string;
  /**
   * The customer’s first name.
   */
  firstName: string | null;
  /**
   * The customer’s last name.
   */
  lastName: string | null;
  /**
   * The customer’s email address.
   */
  email: string | null;
  /**
   * Indicates whether the customer has consented to be sent marketing material via email.
   */
  acceptsMarketing: boolean;
  /**
   * The customer’s default address.
   */
  defaultAddress: getCustomerProfile_customer_defaultAddress | null;
}

export interface getCustomerProfile {
  /**
   * Find a customer by its access token.
   */
  customer: getCustomerProfile_customer | null;
}

export interface getCustomerProfileVariables {
  customerAccessToken: string;
}
