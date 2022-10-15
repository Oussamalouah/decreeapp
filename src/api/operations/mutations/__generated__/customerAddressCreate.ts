/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MailingAddressInput, CustomerErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: customerAddressCreate
// ====================================================

export interface customerAddressCreate_customerAddressCreate_customerAddress {
  __typename: "MailingAddress";
  /**
   * A globally-unique identifier.
   */
  id: string;
}

export interface customerAddressCreate_customerAddressCreate_customerUserErrors {
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

export interface customerAddressCreate_customerAddressCreate {
  __typename: "CustomerAddressCreatePayload";
  /**
   * The new customer address object.
   */
  customerAddress: customerAddressCreate_customerAddressCreate_customerAddress | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  customerUserErrors: customerAddressCreate_customerAddressCreate_customerUserErrors[];
}

export interface customerAddressCreate {
  /**
   * Creates a new address for a customer.
   */
  customerAddressCreate: customerAddressCreate_customerAddressCreate | null;
}

export interface customerAddressCreateVariables {
  customerAccessToken: string;
  address: MailingAddressInput;
}
