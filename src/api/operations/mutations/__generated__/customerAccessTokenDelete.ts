/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: customerAccessTokenDelete
// ====================================================

export interface customerAccessTokenDelete_customerAccessTokenDelete_userErrors {
  __typename: "UserError";
  /**
   * The path to the input field that caused the error.
   */
  field: string[] | null;
  /**
   * The error message.
   */
  message: string;
}

export interface customerAccessTokenDelete_customerAccessTokenDelete {
  __typename: "CustomerAccessTokenDeletePayload";
  /**
   * The destroyed access token.
   */
  deletedAccessToken: string | null;
  /**
   * ID of the destroyed customer access token.
   */
  deletedCustomerAccessTokenId: string | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  userErrors: customerAccessTokenDelete_customerAccessTokenDelete_userErrors[];
}

export interface customerAccessTokenDelete {
  /**
   * Permanently destroys a customer access token.
   */
  customerAccessTokenDelete: customerAccessTokenDelete_customerAccessTokenDelete | null;
}

export interface customerAccessTokenDeleteVariables {
  customerAccessToken: string;
}
