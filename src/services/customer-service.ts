import {Omit} from 'utility-types';
import {baseURL} from '../utils/constants/base-url-constants';

const BASE_API_URL = `${
  process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev
}/Customer`;

export type CreateCustomerAddressBookEntryRequest = {
  id: string;
  customerId: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  specialDates: SpecialDate[];
  familyMembers: FamilyMember[];
  phone: string;
  emailAddress: string;
  customerEmail: string;
  postal: string;
};

export type CustomerAddressBookEntry = {
  id: string;
  customerId: string;
  shopifyCustomerAddressId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  countryCode: string;
  city: string;
  state: string;
  countryName: string;
  postal: string;
  phone: string;
  emailAddress: string;
  specialDates: SpecialDate[];
  familyMembers: FamilyMember[];
  dateCreated: Date;
};

export type GetCustomerAddressBookEntriesResponse = CustomerAddressBookEntry[];

type SpecialDate = {
  type: string;
  month: string;
  day: string;
};

type FamilyMember = {
  type: string;
  title: string;
  firstName: string;
  lastName: string;
  dates: SpecialDate[];
};

export type AddressGroupMember = {
  customerId: string;
  firstName: string;
  id: string;
  lastName: string;
  middleName?: string;
  title: string;
};

export type AddressGroup = {
  name: string;
  id: string;
  customerAddresses: string[];
  customerAddressesWithNames?: AddressGroupMember[] | null;
};

export type CreateCustomerAddressBookEntryResponse =
  CreateCustomerAddressBookEntryRequest & {
    id: string;
    dateCreated: string;
  };

export type CustomerService = {
  getCustomerAddresses: (
    email: string
  ) => Promise<CreateCustomerAddressBookEntryResponse[]>;
  getCustomerId: (email: string) => Promise<string>;
  deleteCustomerAddressBookEntry: (id: string) => Promise<void>;
  createCustomerAddressBookEntriesFromFile: (
    email: string,
    file: File
  ) => Promise<void>;
  createCustomerAddressBookEntry: (
    data: CreateCustomerAddressBookEntryRequest
  ) => Promise<CreateCustomerAddressBookEntryResponse>;
  getCustomerAddressBookEntries: (
    email: string
  ) => Promise<GetCustomerAddressBookEntriesResponse>;
  getCustomerAddressBookEntry: (
    id: string
  ) => Promise<CustomerAddressBookEntry>;
  updateCustomerAddressBookEntry: (
    data: CreateCustomerAddressBookEntryRequest
  ) => Promise<void>;
  createAddressGroup: (
    email: string,
    data: Omit<AddressGroup, 'id' | 'customerAddressesWithNames'>
  ) => Promise<AddressGroup[]>;
  getAddressesGroups: (email: string) => Promise<AddressGroup[]>;
  getAddressGroupById: (
    email: string,
    groupId: string
  ) => Promise<AddressGroup>;
  deleteAddressGroupById: (email: string, groupId: string) => Promise<void>;
  updateAddressGroupById: (email: string, data: AddressGroup) => Promise<void>;
};

const getCustomerId = async (email: string) => {
  const customerIDRequestURL =
    BASE_API_URL + `/shopifycustomerid?emailaddress=${email}`;
  const customerIDRequestResponse = await fetch(customerIDRequestURL);
  const {customerId} = await customerIDRequestResponse.json();
  return customerId;
};

export const customerService: CustomerService = {
  // you can't access the object inside of itself
  getCustomerId: getCustomerId,

  /**
   * Updates a single address book entry
   * @param data {CreateCustomerAddressBookEntryResponse} - the new data for the address book entry
   */
  updateCustomerAddressBookEntry: async (
    data: CreateCustomerAddressBookEntryRequest
  ) => {
    const id = data.id;
    const requestURL = BASE_API_URL + `/${id}/address`;
    const response = await fetch(requestURL, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();

    // So user can determine why the form didnt register
    if (responseJSON?.innerError) {
      throw new Error(responseJSON.innerError);
    }
  },
  /**
   * Returns a single address book entry
   * @param id {string} - the id of the resource object
   */
  getCustomerAddressBookEntry: async (id: string) => {
    const requestURL = BASE_API_URL + `/${id}/address`;
    const request = await fetch(requestURL);
    return (await request.json()) as CustomerAddressBookEntry;
  },
  /**
   * Creates address book entries from a csv file
   * @param {string} email - the email of the customer
   * @param {Blob | File} file - the csv file
   */
  createCustomerAddressBookEntriesFromFile: async (email, file) => {
    const customerId = await getCustomerId(email);
    const requestURL = BASE_API_URL + `/${customerId}/address/upload`;
    const formData = new FormData();
    formData.append('file', file, 'customers.csv');
    await fetch(requestURL, {
      method: 'POST',
      body: formData,
    });
  },
  /**
   * Returns all the address book entries of a customer
   * @param {string} email - the email of the customer
   */
  getCustomerAddressBookEntries: async (email: string) => {
    const customerId = await getCustomerId(email);
    if (!customerId) return [];
    // create the endpoint
    const requestURL = BASE_API_URL + `/${customerId}/addresses`;
    const request = await fetch(requestURL);
    return (await request.json()) as GetCustomerAddressBookEntriesResponse;
  },
  /**
   * Creates a single address book entry
   * @param {CreateCustomerAddressBookEntryRequest} data - the form data for the endpoint
   */
  createCustomerAddressBookEntry: async (
    data: CreateCustomerAddressBookEntryRequest
  ) => {
    const {customerEmail} = data;
    // get the customer id from the admin API
    const customerId = await getCustomerId(customerEmail);
    data.customerId = customerId;
    const requestURL = BASE_API_URL + `/${customerId}/address`;
    const response = await fetch(requestURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();

    // So user can determine why the form didnt register
    if (responseJSON?.innerError) {
      throw new Error(responseJSON.innerError);
    }

    return responseJSON as CreateCustomerAddressBookEntryResponse;
  },
  /**
   * Deletes a single address book entry based on the id of the address provided in the function call
   * @param {string} id - the id of the resource object
   */
  deleteCustomerAddressBookEntry: async (id: string) => {
    const requestURL = BASE_API_URL + `/${id}/address`;
    await fetch(requestURL, {
      method: 'DELETE',
    });
  },
  getCustomerAddresses: async email => {
    const customerId = await getCustomerId(email);

    if (!customerId) return [];
    const requestURL = BASE_API_URL + `/${customerId}/addresses`;
    const response = await fetch(requestURL, {
      method: 'GET',
    });

    return (await response.json()) as CreateCustomerAddressBookEntryResponse[];
  },
  createAddressGroup: async (email, data) => {
    const customerId = await getCustomerId(email);

    const requestURL = BASE_API_URL + `/${customerId}/group`;
    const response = await fetch(requestURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();

    if (responseJSON?.innerError) {
      throw new Error(responseJSON.innerError);
    }

    return responseJSON;
  },

  getAddressesGroups: async email => {
    const customerId = await getCustomerId(email);
    if (!customerId) return [];

    const requestURL = BASE_API_URL + `/${customerId}/groups`;
    const response = await fetch(requestURL, {
      method: 'GET',
    });

    const responseJSON = await response.json();

    if (responseJSON?.innerError) {
      throw new Error(responseJSON.innerError);
    }

    return responseJSON;
  },
  getAddressGroupById: async (email, groupId) => {
    const customerId = await getCustomerId(email);

    const requestURL = BASE_API_URL + `/${customerId}/group/${groupId}`;
    const response = await fetch(requestURL, {
      method: 'GET',
    });

    const responseJSON = await response.json();

    if (responseJSON?.innerError) {
      throw new Error(responseJSON.innerError);
    }

    return responseJSON;
  },
  deleteAddressGroupById: async (email, groupId) => {
    const customerId = await getCustomerId(email);

    const requestURL = BASE_API_URL + `/${customerId}/group/${groupId}`;
    await fetch(requestURL, {
      method: 'DELETE',
    });
  },

  updateAddressGroupById: async (email, data) => {
    const customerId = await getCustomerId(email);
    const groupId = data.id;

    const requestURL = BASE_API_URL + `/${customerId}/group/${groupId}`;
    await fetch(requestURL, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
