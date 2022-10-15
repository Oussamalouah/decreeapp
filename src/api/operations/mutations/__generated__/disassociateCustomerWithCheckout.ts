/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: disassociateCustomerWithCheckout
// ====================================================

export interface disassociateCustomerWithCheckout_checkoutCustomerDisassociateV2_checkout {
  __typename: "Checkout";
  /**
   * A globally-unique identifier.
   */
  id: string;
}

export interface disassociateCustomerWithCheckout_checkoutCustomerDisassociateV2_checkoutUserErrors {
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

export interface disassociateCustomerWithCheckout_checkoutCustomerDisassociateV2 {
  __typename: "CheckoutCustomerDisassociateV2Payload";
  /**
   * The updated checkout object.
   */
  checkout: disassociateCustomerWithCheckout_checkoutCustomerDisassociateV2_checkout | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  checkoutUserErrors: disassociateCustomerWithCheckout_checkoutCustomerDisassociateV2_checkoutUserErrors[];
}

export interface disassociateCustomerWithCheckout {
  /**
   * Disassociates the current checkout customer from the checkout.
   */
  checkoutCustomerDisassociateV2: disassociateCustomerWithCheckout_checkoutCustomerDisassociateV2 | null;
}

export interface disassociateCustomerWithCheckoutVariables {
  checkoutId: string;
}
