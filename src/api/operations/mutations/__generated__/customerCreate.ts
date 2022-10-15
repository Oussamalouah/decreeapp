/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerCreateInput, CustomerErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: customerCreate
// ====================================================

export interface customerCreate_customerCreate_customer {
  __typename: "Customer";
  /**
   * A unique identifier for the customer.
   */
  id: string;
}

export interface customerCreate_customerCreate_customerUserErrors {
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

export interface customerCreate_customerCreate {
  __typename: "CustomerCreatePayload";
  /**
   * The created customer object.
   */
  customer: customerCreate_customerCreate_customer | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  customerUserErrors: customerCreate_customerCreate_customerUserErrors[];
}

export interface customerCreate {
  /**
   * Creates a new customer.
   */
  customerCreate: customerCreate_customerCreate | null;
}

export interface customerCreateVariables {
  input: CustomerCreateInput;
}
