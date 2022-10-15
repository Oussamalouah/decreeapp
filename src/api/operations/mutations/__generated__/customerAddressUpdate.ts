/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MailingAddressInput, CustomerErrorCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: customerAddressUpdate
// ====================================================

export interface customerAddressUpdate_customerAddressUpdate_customerAddress {
  __typename: "MailingAddress";
  /**
   * A globally-unique identifier.
   */
  id: string;
}

export interface customerAddressUpdate_customerAddressUpdate_customerUserErrors {
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

export interface customerAddressUpdate_customerAddressUpdate {
  __typename: "CustomerAddressUpdatePayload";
  /**
   * The customer’s updated mailing address.
   */
  customerAddress: customerAddressUpdate_customerAddressUpdate_customerAddress | null;
  /**
   * The list of errors that occurred from executing the mutation.
   */
  customerUserErrors: customerAddressUpdate_customerAddressUpdate_customerUserErrors[];
}

export interface customerAddressUpdate {
  /**
   * Updates the address of an existing customer.
   */
  customerAddressUpdate: customerAddressUpdate_customerAddressUpdate | null;
}

export interface customerAddressUpdateVariables {
  customerAccessToken: string;
  id: string;
  address: MailingAddressInput;
}
