import * as Parser from 'json2csv';
import {CreateCustomerAddressBookEntryResponse} from '../services/customer-service';

export const ConvertAddressesToCsvBlob = (
  customerAddresses: CreateCustomerAddressBookEntryResponse[]
) => {
  const formattedAddresses = Parser.parse(customerAddresses);
  return new Blob([formattedAddresses], {type: 'text/csv'});
};
