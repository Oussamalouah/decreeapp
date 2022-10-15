/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerUpdateInput, CustomerErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: customerUpdate
// ====================================================

export interface customerUpdate_customerUpdate_customer {
  __typename: "Customer";
  /**
   * A unique identifier for the customer.
   */
  id: string;
}

export interface customerUpdate_customerUpdate_customerAccessToken {
  __typename: "CustomerAccessToken";
  /**
   * The customer’s access token.
   */
  accessToken: string;
  /**
   * The date and time when the customer access token expires.
   */
  expiresAt: any;
}

export interface customerUpdate_customerUpdate_customerUserErrors {
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

export interface customerUpdate_customerUpdate {
  __typename: "CustomerUpdatePayload";
  /**
   * The updated customer object.
   */
  customer: customerUpdate_customerUpdate_customer | null;
  /**
   * The newly created customer access token. If the customer's password is updated, all previous access tokens
   * (including the one used to perform this mutation) become invalid, and a new token is generated.
   */
  customerAccessToken: customerUpdate_customerUpdate_customerAccessToken | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  customerUserErrors: customerUpdate_customerUpdate_customerUserErrors[];
}

export interface customerUpdate {
  /**
   * Updates an existing customer.
   */
  customerUpdate: customerUpdate_customerUpdate | null;
}

export interface customerUpdateVariables {
  customerAccessToken: string;
  customer: CustomerUpdateInput;
}
