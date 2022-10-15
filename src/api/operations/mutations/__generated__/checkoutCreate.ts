/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutCreateInput, CheckoutErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: checkoutCreate
// ====================================================

export interface checkoutCreate_checkoutCreate_checkout {
  __typename: "Checkout";
  /**
   * A globally-unique identifier.
   */
  id: string;
}

export interface checkoutCreate_checkoutCreate_checkoutUserErrors {
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

export interface checkoutCreate_checkoutCreate {
  __typename: "CheckoutCreatePayload";
  /**
   * The new checkout object.
   */
  checkout: checkoutCreate_checkoutCreate_checkout | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  checkoutUserErrors: checkoutCreate_checkoutCreate_checkoutUserErrors[];
}

export interface checkoutCreate {
  /**
   * Creates a new checkout.
   */
  checkoutCreate: checkoutCreate_checkoutCreate | null;
}

export interface checkoutCreateVariables {
  input: CheckoutCreateInput;
}
