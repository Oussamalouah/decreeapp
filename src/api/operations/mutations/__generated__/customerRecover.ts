/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: customerRecover
// ====================================================

export interface customerRecover_customerRecover_customerUserErrors {
  __typename: "CustomerUserError";
  /**
   * The error code.
   */
  code: CustomerErrorCode | null;
  /**
   * The path to the input field that caused the error.
   */
  field: string[] | null;
  /**
   * The error message.
   */
  message: string;
}

export interface customerRecover_customerRecover {
  __typename: "CustomerRecoverPayload";
  /**
   * The list of errors that occurred from executing the mutation.
   */
  customerUserErrors: customerRecover_customerRecover_customerUserErrors[];
}

export interface customerRecover {
  /**
   * Sends a reset password email to the customer, as the first step in the reset password process.
   */
  customerRecover: customerRecover_customerRecover | null;
}

export interface customerRecoverVariables {
  email: string;
}
