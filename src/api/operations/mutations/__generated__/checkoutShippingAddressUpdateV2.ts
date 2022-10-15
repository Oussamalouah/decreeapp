/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MailingAddressInput, CheckoutErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: checkoutShippingAddressUpdateV2
// ====================================================

export interface checkoutShippingAddressUpdateV2_checkoutShippingAddressUpdateV2_checkout {
  __typename: "Checkout";
  /**
   * A globally-unique identifier.
   */
  id: string;
}

export interface checkoutShippingAddressUpdateV2_checkoutShippingAddressUpdateV2_checkoutUserErrors {
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

export interface checkoutShippingAddressUpdateV2_checkoutShippingAddressUpdateV2 {
  __typename: "CheckoutShippingAddressUpdateV2Payload";
  /**
   * The updated checkout object.
   */
  checkout: checkoutShippingAddressUpdateV2_checkoutShippingAddressUpdateV2_checkout | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  checkoutUserErrors: checkoutShippingAddressUpdateV2_checkoutShippingAddressUpdateV2_checkoutUserErrors[];
}

export interface checkoutShippingAddressUpdateV2 {
  /**
   * Updates the shipping address of an existing checkout.
   */
  checkoutShippingAddressUpdateV2: checkoutShippingAddressUpdateV2_checkoutShippingAddressUpdateV2 | null;
}

export interface checkoutShippingAddressUpdateV2Variables {
  shippingAddress: MailingAddressInput;
  checkoutId: string;
}
