import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {AUTHENTICATION} from '../../../api/operations/queries/authentication';
import {GET_CUSTOMER_PROFILE} from '../../../api/operations/queries/customer';
import {authentication} from '../../../api/operations/queries/__generated__/authentication';
import {
  getCustomerProfile,
  getCustomerProfile_customer,
} from '../../../api/operations/queries/__generated__/getCustomerProfile';
import {routes} from '../../../route-list';
import {customerService} from '../../../services/customer-service';
import {useEmail} from '../../../utils/hooks/customer-hooks';

export type ProfileProps = {
  loading: boolean;
  addressLength: number;
  user: getCustomerProfile_customer | null | undefined;
  userClickedEdit: () => void;
  userClickedOnCreateAddress: () => void;
  userClickedOnEditAddress: () => void;
  userClickedClose: () => void;
  userClickedEditAddressBook: () => void;
};

/**
 * A higher order component responsible for providing stateful information
 * to the presentational component that renders the profile screen
 * @param Screen
 * @constructor
 */
export const ProfileContainer = (Screen: React.ComponentType<ProfileProps>) => {
  return () => {
    const history = useHistory();
    const email = useEmail();

    const [addressLength, setAddressLength] = useState(0);

    // Get access token from the cache
    const {data: authData} = useQuery<authentication>(AUTHENTICATION);

    // Get customer profile from Shopify
    const {loading, data} = useQuery<getCustomerProfile>(GET_CUSTOMER_PROFILE, {
      variables: {
        customerAccessToken: authData?.accessToken,
      },
      onError(error) {
        toast.error(error.message);
      },
    });

    const getAddressBookEntryLength = async (email: string) => {
      try {
        const response = await customerService.getCustomerAddressBookEntries(
          email
        );
        setAddressLength(response.length);
      } catch (e) {
        // Do nothing...
      }
    };

    useEffect(() => {
      if (email) {
        getAddressBookEntryLength(email);
      }
    }, [email]);

    return (
      <Screen
        user={data?.customer}
        loading={loading}
        addressLength={addressLength}
        userClickedEdit={() => history.push(routes.USER__SETTING__PROFILE)}
        userClickedOnCreateAddress={() =>
          history.push(routes.USER__SETTING__ADDRESS)
        }
        userClickedOnEditAddress={() =>
          history.push(routes.USER__SETTING__ADDRESS)
        }
        userClickedEditAddressBook={() =>
          history.push(routes.USER__SETTING__ADDRESS_BOOK)
        }
        userClickedClose={() => history.push(routes.HOME)}
      />
    );
  };
};
