import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {routes} from '../../../route-list';
import {
  CreateCustomerAddressBookEntryRequest,
  customerService,
} from '../../../services/customer-service';
import {useEmail} from '../../../utils/hooks/customer-hooks';
import {AddressBookFormState} from '../components/AddressBookFormScreen';

export type AddressBookFormContainerProps = {
  loading: boolean;
  defaultValues?: AddressBookFormState;
  customerEmail: string;
  userClickedClose: () => void;
  userClickedCancelButton: () => void;
  userClickedSavedButton: (
    data: CreateCustomerAddressBookEntryRequest
  ) => Promise<void>;
};

export const AddressBookFormContainer = (
  Screen: React.VFC<AddressBookFormContainerProps>
) => {
  return (props: {mode?: 'edit'}) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    // the email address of the authenticated user
    const email = useEmail();
    const [defaultValues, setDefaultValues] =
      useState<AddressBookFormState | undefined>();
    const params = useParams<{id: string}>();

    const loadData = async () => {
      try {
        setLoading(true);

        const data = (await customerService.getCustomerAddressBookEntry(
          params!.id
        )) as unknown;
        setDefaultValues(data as AddressBookFormState);

        setLoading(false);
      } catch (e) {
        toast.error(e);
        setLoading(false);
      }
    };

    useEffect(() => {
      if (props.mode === 'edit') {
        loadData();
      }
    }, []);

    return (
      <Screen
        loading={loading}
        defaultValues={defaultValues}
        customerEmail={email || ''}
        userClickedClose={() => {
          history.push(routes.HOME);
        }}
        userClickedCancelButton={() => {
          history.push(routes.USER__SETTING__ADDRESS_BOOK);
        }}
        userClickedSavedButton={async (
          data: CreateCustomerAddressBookEntryRequest
        ) => {
          try {
            setLoading(true);

            if (props.mode === 'edit') {
              await customerService.updateCustomerAddressBookEntry(data);
              toast.success('The contact has been updated!');
              history.push(routes.USER__SETTING__ADDRESS_BOOK);
            } else {
              const response =
                await customerService.createCustomerAddressBookEntry(data);

              if (response.customerId) {
                toast.success(
                  'The contact has been added to your Address Book!'
                );
                history.push(routes.USER__SETTING__ADDRESS_BOOK);
              }
            }

            setLoading(false);
          } catch (e) {
            setLoading(false);
            toast.error(e.message);
          }
        }}
      />
    );
  };
};
