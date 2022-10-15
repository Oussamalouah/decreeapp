/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerAccessTokenCreateInput, CustomerErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: customerAccessTokenCreate
// ====================================================

export interface customerAccessTokenCreate_customerAccessTokenCreate_customerAccessToken {
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

export interface customerAccessTokenCreate_customerAccessTokenCreate_customerUserErrors {
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

export interface customerAccessTokenCreate_customerAccessTokenCreate {
  __typename: "CustomerAccessTokenCreatePayload";
  /**
   * The newly created customer access token object.
   */
  customerAccessToken: customerAccessTokenCreate_customerAccessTokenCreate_customerAccessToken | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  customerUserErrors: customerAccessTokenCreate_customerAccessTokenCreate_customerUserErrors[];
}

export interface customerAccessTokenCreate {
  /**
   * Creates a customer access token.
   * The customer access token is required to modify the customer object in any way.
   */
  customerAccessTokenCreate: customerAccessTokenCreate_customerAccessTokenCreate | null;
}

export interface customerAccessTokenCreateVariables {
  input: CustomerAccessTokenCreateInput;
}
