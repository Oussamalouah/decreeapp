import {useMutation, useQuery} from '@apollo/client';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {confirmAlert} from 'react-confirm-alert';
import {useForm, UseFormReturn} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {CustomerUpdateInput} from '../../../../__generated__/globalTypes';
import {
  CUSTOMER_ADDRESS_UPDATE,
  CUSTOMER_UPDATE,
} from '../../../api/operations/mutations/customer';
import {
  customerAddressUpdate,
  customerAddressUpdateVariables,
} from '../../../api/operations/mutations/__generated__/customerAddressUpdate';
import {
  customerUpdate,
  customerUpdateVariables,
} from '../../../api/operations/mutations/__generated__/customerUpdate';
import {AUTHENTICATION} from '../../../api/operations/queries/authentication';
import {GET_CUSTOMER_PROFILE} from '../../../api/operations/queries/customer';
import {authentication} from '../../../api/operations/queries/__generated__/authentication';
import {
  getCustomerProfile,
  getCustomerProfile_customer,
} from '../../../api/operations/queries/__generated__/getCustomerProfile';
import {EditProfileValidationSchema} from '../../../utils/validation-schemas';
import {NewPasswordForm} from '../components/shared/NewPasswordForm';
import {client} from '../../../api/ApolloClient';
import {routes} from '../../../route-list';

export type EditProfileFormState = {
  country: string | null;
} & CustomerUpdateInput;

export type EditProfileProps = {
  loading: boolean;
  user: getCustomerProfile_customer | null | undefined; // a customer is an end product user
  form: UseFormReturn<EditProfileFormState>;
  updating: boolean;
  userClickedBack: () => void;
  userClickedClose: () => void;
  userClickedCancel: () => void;
  userSubmittedForm: (payload: EditProfileFormState) => void;
  userClickedEditPassword: () => void;
};

/**
 * A higher order component responsible for providing stateful information
 * to the presentational component that renders the profile screen
 * @param Screen
 * @constructor
 */
export const EditProfileContainer = (
  Screen: React.ComponentType<EditProfileProps>
) => {
  return () => {
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const history = useHistory();

    // Get access token from the cache
    const {data: auth} = useQuery<authentication>(AUTHENTICATION);

    // Get customer profile from Shopify. This is a lazy query.. and it needs
    // customer access token to get a valid result
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

    const form = useForm<EditProfileFormState>({
      resolver: yupResolver(EditProfileValidationSchema),
      defaultValues: {
        firstName: profile?.customer?.firstName,
        lastName: profile?.customer?.lastName,
        email: profile?.customer?.email,
        country: profile?.customer?.defaultAddress?.country,
      },
    });

    // mutation to update an existing customer
    const [updateCustomer, {loading: loadingProfileUpdate}] = useMutation<
      customerUpdate,
      customerUpdateVariables
    >(CUSTOMER_UPDATE, {
      onCompleted: data => {
        if (data.customerUpdate?.customerUserErrors.length) {
          // Only show first error
          toast.error(data.customerUpdate.customerUserErrors[0].message);
          return;
        }

        if (isChangingPassword) {
          client.writeQuery({
            query: AUTHENTICATION,
            data: {
              accessToken:
                data.customerUpdate?.customerAccessToken?.accessToken,
            },
          });

          toast.success('Successfully updated password!');
          setIsChangingPassword(false);
        } else {
          toast.success('Profile updated!');
          refetchProfile();
        }
      },
      onError: e => {
        // Means user has the wrong token or token expired
        if (e.message === 'CustomerUpdate access denied') {
          client.writeQuery({
            query: AUTHENTICATION,
            data: {accessToken: null},
          });
          toast.error('Token has expired! Please login again');
        } else {
          toast.error(e.message);
        }

        setIsChangingPassword(false);
      },
    });

    // Mutation to update the address of an existing customer
    const [updateCustomerAddress, {loading: loadingAddressUpdate}] =
      useMutation<customerAddressUpdate, customerAddressUpdateVariables>(
        CUSTOMER_ADDRESS_UPDATE,
        {
          onCompleted: data => {
            if (data.customerAddressUpdate?.customerUserErrors.length) {
              // Only show first error
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

    return (
      <Screen
        form={form}
        user={profile?.customer}
        loading={loadingProfile}
        updating={loadingProfileUpdate || loadingAddressUpdate}
        userClickedBack={() => history.goBack()}
        userClickedCancel={() => history.goBack()}
        userClickedClose={() => history.push(routes.HOME)}
        userSubmittedForm={async formState => {
          const {country, ...customer} = formState;

          const {errors} = await updateCustomer({
            variables: {
              customerAccessToken: auth?.accessToken || '',
              customer,
            },
          });

          if (country && !errors) {
            updateCustomerAddress({
              variables: {
                id: profile?.customer?.defaultAddress?.id || '',
                customerAccessToken: auth?.accessToken || '',
                address: {country},
              },
            });
          }
        }}
        userClickedEditPassword={() => {
          confirmAlert({
            customUI: ({onClose}) => {
              return (
                <NewPasswordForm
                  onClose={onClose}
                  onSubmit={formState => {
                    setIsChangingPassword(true);
                    updateCustomer({
                      variables: {
                        customerAccessToken: auth?.accessToken || '',
                        customer: {password: formState.newPassword},
                      },
                    });
                    onClose();
                  }}
                />
              );
            },
          });
        }}
      />
    );
  };
};
