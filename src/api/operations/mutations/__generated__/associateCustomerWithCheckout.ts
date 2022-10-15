/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: associateCustomerWithCheckout
// ====================================================

export interface associateCustomerWithCheckout_checkoutCustomerAssociateV2_checkout {
  __typename: "Checkout";
  /**
   * A globally-unique identifier.
   */
  id: string;
}

export interface associateCustomerWithCheckout_checkoutCustomerAssociateV2_checkoutUserErrors {
  __typename: "CheckoutUserError";
  /**
   * The error code.
   */
  code: CheckoutErrorCode | null;
  /**
   * The path to the input field that caused the error.
   */
  field: string[] | null;
  /**
   * The error message.
   */
  message: string;
}

export interface associateCustomerWithCheckout_checkoutCustomerAssociateV2_customer {
  __typename: "Customer";
  /**
   * A unique identifier for the customer.
   */
  id: string;
}

export interface associateCustomerWithCheckout_checkoutCustomerAssociateV2 {
  __typename: "CheckoutCustomerAssociateV2Payload";
  /**
   * The updated checkout object.
   */
  checkout: associateCustomerWithCheckout_checkoutCustomerAssociateV2_checkout | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  checkoutUserErrors: associateCustomerWithCheckout_checkoutCustomerAssociateV2_checkoutUserErrors[];
  /**
   * The associated customer object.
   */
  customer: associateCustomerWithCheckout_checkoutCustomerAssociateV2_customer | null;
}

export interface associateCustomerWithCheckout {
  /**
   * Associates a customer to the checkout.
   */
  checkoutCustomerAssociateV2: associateCustomerWithCheckout_checkoutCustomerAssociateV2 | null;
}

export interface associateCustomerWithCheckoutVariables {
  checkoutId: string;
  customerAccessToken: string;
}
