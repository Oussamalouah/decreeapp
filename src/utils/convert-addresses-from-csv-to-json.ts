import Papa from 'papaparse';
import {CreateCustomerAddressBookEntryResponse} from '../services/customer-service';

export const getAddressesFromCsv = async (link: string) => {
  return new Promise<CreateCustomerAddressBookEntryResponse[]>(
    (resolve, reject) => {
      Papa.parse(link, {
        download: true,
        header: true,
        complete: results => {
          return resolve(
            results.data as CreateCustomerAddressBookEntryResponse[]
          );
        },
        error: error => {
          return reject(error);
        },
      });
    }
  );
};
