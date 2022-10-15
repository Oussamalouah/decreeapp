import {useMutation, useQuery} from '@apollo/client';
import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {MailingAddressInput} from '../../../../__generated__/globalTypes';
import {
  CUSTOMER_ADDRESS_CREATE,
  CUSTOMER_ADDRESS_UPDATE,
} from '../../../api/operations/mutations/customer';
import {
  customerAddressCreate,
  customerAddressCreateVariables,
} from '../../../api/operations/mutations/__generated__/customerAddressCreate';
import {
  customerAddressUpdate,
  customerAddressUpdateVariables,
} from '../../../api/operations/mutations/__generated__/customerAddressUpdate';
import {AUTHENTICATION} from '../../../api/operations/queries/authentication';
import {GET_CUSTOMER_PROFILE} from '../../../api/operations/queries/customer';
import {authentication} from '../../../api/operations/queries/__generated__/authentication';
import {
  getCustomerProfile,
  getCustomerProfile_customer,
} from '../../../api/operations/queries/__generated__/getCustomerProfile';
import {AddressFormValidationSchema} from '../../../utils/validation-schemas';
import {routes} from '../../../route-list';

export type AddressFormState = MailingAddressInput;

export type AddressProps = {
  loading: boolean;
  user: getCustomerProfile_customer | null | undefined;
  form: UseFormReturn<AddressFormState>;
  updating: boolean;
  userClickedBack: () => void;
  userClickedClose: () => void;
  userClickedCancel: () => void;
  userSubmittedForm: (addressPayload: AddressFormState) => void;
};

/**
 * A higher order component responsible for providing stateful information
 * to the presentational component that renders the address screen
 * @param Screen
 * @constructor
 */
export const AddressContainer = (Screen: React.ComponentType<AddressProps>) => {
  return () => {
    const history = useHistory();

    const {data: auth} = useQuery<authentication>(AUTHENTICATION);

    const {
      loading: loadingProfile,
      data: profile,
      refetch: refetchProfile,
    } = useQuery<getCustomerProfile>(GET_CUSTOMER_PROFILE, {
      variables: {
        customerAccessToken: auth?.accessToken,
      },
      onError(error) {
        toast.error(error.message);
      },
    });

    const userAddressForm = useForm<AddressFormState>({
      resolver: yupResolver(AddressFormValidationSchema),
      defaultValues: profile?.customer?.defaultAddress
        ? {
            address1: profile?.customer?.defaultAddress?.address1 || '',
            address2: profile?.customer?.defaultAddress?.address2 || '',
            city: profile?.customer?.defaultAddress?.city || '',
            firstName: profile?.customer?.defaultAddress?.firstName || '',
            lastName: profile?.customer?.defaultAddress?.lastName || '',
            phone: profile?.customer?.defaultAddress?.phone || '',
            province: profile?.customer?.defaultAddress?.province || '',
            zip: profile?.customer?.defaultAddress?.zip || '',
            country: profile?.customer?.defaultAddress?.country || '',
          }
        : {
            address1: '',
            address2: '',
            city: '',
            firstName: profile?.customer?.firstName,
            lastName: profile?.customer?.lastName,
            phone: '',
            province: '',
            zip: '',
            country: '',
          },
    });

    const [updateCustomerAddress, {loading: loadingAddressUpdate}] =
      useMutation<customerAddressUpdate, customerAddressUpdateVariables>(
        CUSTOMER_ADDRESS_UPDATE,
        {
          onCompleted: data => {
            if (data.customerAddressUpdate?.customerUserErrors.length) {
              toast.error(
                data.customerAddressUpdate.customerUserErrors[0].message
              );
              return;
            }
            toast.success('Address updated!');
            refetchProfile();
          },
          onError: e => {
            const hasNoDefault =
              e.message ===
              'Variable $id of type ID! was provided invalid value';
            if (hasNoDefault) {
              toast.error(
                "Unable to update `country`. You don't have a default address"
              );
            } else {
              toast.error(`Failed to update Address: ${e.message}`);
            }
          },
        }
      );

    const [createCustomerAddress, {loading: loadingAddressCreate}] =
      useMutation<customerAddressCreate, customerAddressCreateVariables>(
        CUSTOMER_ADDRESS_CREATE,
        {
          onCompleted: data => {
            if (data.customerAddressCreate?.customerUserErrors.length) {
              toast.error(
                data.customerAddressCreate.customerUserErrors[0].message
              );
              return;
            }
            toast.success('Address Created!');
            refetchProfile();
          },
          onError: e => {
            toast.error(`Failed to create Address: ${e.message}`);
          },
        }
      );

    return (
      <Screen
        loading={loadingProfile}
        user={profile?.customer}
        form={userAddressForm}
        userClickedBack={() => history.goBack()}
        userClickedCancel={() => history.goBack()}
        userClickedClose={() => history.push(routes.HOME)}
        userSubmittedForm={data => {
          if (!profile?.customer?.defaultAddress) {
            createCustomerAddress({
              variables: {
                customerAccessToken: auth?.accessToken || '',
                address: data,
              },
            });
          } else {
            updateCustomerAddress({
              variables: {
                id: profile?.customer?.defaultAddress?.id || '',
                customerAccessToken: auth?.accessToken || '',
                address: data,
              },
            });
          }
        }}
        updating={loadingAddressUpdate || loadingAddressCreate}
      />
    );
  };
};
