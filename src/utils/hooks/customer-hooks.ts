import {useQuery} from '@apollo/client';
import {toast} from 'react-toastify';
import {authentication} from '../../api/operations/queries/__generated__/authentication';
import {getCustomerProfile} from '../../api/operations/queries/__generated__/getCustomerProfile';
import {AUTHENTICATION} from '../../api/operations/queries/authentication';
import {GET_CUSTOMER_PROFILE} from '../../api/operations/queries/customer';

export const useEmail = (): string | null | undefined => {
  const customerData = useCustomerData();
  if (customerData?.customer?.email) {
    return customerData.customer.email;
  }
  return undefined;
};

export const useCustomerData = (): getCustomerProfile | undefined => {
  const {data: authData} = useQuery<authentication>(AUTHENTICATION);

  // Get customer profile from Shopify
  const {data} = useQuery<getCustomerProfile>(GET_CUSTOMER_PROFILE, {
    variables: {
      customerAccessToken: authData?.accessToken,
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return data;
};
