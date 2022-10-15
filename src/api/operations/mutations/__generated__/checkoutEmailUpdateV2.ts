/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: checkoutEmailUpdateV2
// ====================================================

export interface checkoutEmailUpdateV2_checkoutEmailUpdateV2_checkout {
  __typename: "Checkout";
  /**
   * A globally-unique identifier.
   */
  id: string;
}

export interface checkoutEmailUpdateV2_checkoutEmailUpdateV2_checkoutUserErrors {
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

export interface checkoutEmailUpdateV2_checkoutEmailUpdateV2 {
  __typename: "CheckoutEmailUpdateV2Payload";
  /**
   * The checkout object with the updated email.
   */
  checkout: checkoutEmailUpdateV2_checkoutEmailUpdateV2_checkout | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  checkoutUserErrors: checkoutEmailUpdateV2_checkoutEmailUpdateV2_checkoutUserErrors[];
}

export interface checkoutEmailUpdateV2 {
  /**
   * Updates the email on an existing checkout.
   */
  checkoutEmailUpdateV2: checkoutEmailUpdateV2_checkoutEmailUpdateV2 | null;
}

export interface checkoutEmailUpdateV2Variables {
  checkoutId: string;
  email: string;
}
