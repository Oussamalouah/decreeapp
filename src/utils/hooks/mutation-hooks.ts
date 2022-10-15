import {ApolloError, useMutation} from '@apollo/client';
import {toast} from 'react-toastify';
import {
  CHECKOUT_CREATE,
  CHECKOUT_LINE_ITEMS_ADD,
  CHECKOUT_LINE_ITEM_UPDATE,
  CHECKOUT_LINE_ITEMS_REMOVE,
  CHECKOUT_LINK_CUSTOMER,
  CHECKOUT_UPDATE_SHIPPING_ADDRESS,
} from '../../api/operations/mutations/checkout';
import {
  checkoutCreate,
  checkoutCreateVariables,
} from '../../api/operations/mutations/__generated__/checkoutCreate';
import {
  checkoutLineItemsAdd,
  checkoutLineItemsAddVariables,
} from '../../api/operations/mutations/__generated__/checkoutLineItemsAdd';
import {
  checkoutLineItemsUpdate,
  checkoutLineItemsUpdateVariables,
} from '../../api/operations/mutations/__generated__/checkoutLineItemsUpdate';
import {GET_CHECKOUT_ID} from '../../api/operations/queries/checkout';
import {
  customerAccessTokenDelete,
  customerAccessTokenDeleteVariables,
} from '../../api/operations/mutations/__generated__/customerAccessTokenDelete';
import {
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_ACCESS_TOKEN_DELETE,
  CUSTOMER_CREATE,
} from '../../api/operations/mutations/authentication';
import {client} from '../../api/ApolloClient';
import {AUTHENTICATION} from '../../api/operations/queries/authentication';
import {
  checkoutLineItemsRemove,
  checkoutLineItemsRemoveVariables,
} from '../../api/operations/mutations/__generated__/checkoutLineItemsRemove';
import {
  associateCustomerWithCheckout,
  associateCustomerWithCheckoutVariables,
} from '../../api/operations/mutations/__generated__/associateCustomerWithCheckout';
import {
  checkoutShippingAddressUpdateV2,
  checkoutShippingAddressUpdateV2Variables,
} from '../../api/operations/mutations/__generated__/checkoutShippingAddressUpdateV2';
import {
  customerAccessTokenCreate,
  customerAccessTokenCreateVariables,
} from '../../api/operations/mutations/__generated__/customerAccessTokenCreate';
import {
  customerCreate,
  customerCreateVariables,
} from '../../api/operations/mutations/__generated__/customerCreate';

/**
 * Hook for checkoutCreate
 * @returns {createCheckout, loadingCheckoutCreate}
 */
export const useCreateCheckout = () => {
  const [createCheckout, {loading: loadingCheckoutCreate}] = useMutation<
    checkoutCreate,
    checkoutCreateVariables
  >(CHECKOUT_CREATE, {
    update: (cache, checkoutData) => {
      const checkoutId = checkoutData.data?.checkoutCreate?.checkout?.id;
      if (checkoutId) {
        cache.writeQuery({
          query: GET_CHECKOUT_ID,
          data: {checkoutId},
        });
      }
    },
    onCompleted: data => {
      const errorMessage =
        data.checkoutCreate?.checkoutUserErrors?.[0]?.message;
      if (errorMessage) toast.error(errorMessage);
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  return {createCheckout, loadingCheckoutCreate};
};

/**
 * Hook for checkoutLineItemsAdd
 * @returns {addCheckoutLineItems, loadingCheckoutAddLineItems}
 */
export const useAddCheckoutLineItems = (args?: {onSuccess?: () => void}) => {
  const [addCheckoutLineItems, {loading: loadingCheckoutAddLineItems}] =
    useMutation<checkoutLineItemsAdd, checkoutLineItemsAddVariables>(
      CHECKOUT_LINE_ITEMS_ADD,
      {
        onCompleted: data => {
          const errorMessage =
            data.checkoutLineItemsAdd?.checkoutUserErrors?.[0]?.message;
          if (errorMessage) {
            toast.error(errorMessage);
          } else {
            toast.success('Added to cart!');
            args?.onSuccess?.();
          }
        },
        onError: e => toast.error(e.message),
      }
    );

  return {addCheckoutLineItems, loadingCheckoutAddLineItems};
};

/**
 * Hook for checkoutLineItemsUpdate
 * @returns {updateCheckoutLineItems, loadingCheckoutUpdateLineItems}
 */
export const useUpdateCheckoutLineItems = () => {
  const [updateCheckoutLineItems, {loading: loadingCheckoutUpdateLineItems}] =
    useMutation<checkoutLineItemsUpdate, checkoutLineItemsUpdateVariables>(
      CHECKOUT_LINE_ITEM_UPDATE,
      {
        onCompleted: data => {
          const errorMessage =
            data.checkoutLineItemsUpdate?.checkoutUserErrors?.[0]?.message;
          if (errorMessage) {
            toast.error(errorMessage);
          } else {
            toast.success('Item has been updated!');
          }
        },
        onError: e => toast.error(e.message),
      }
    );

  return {
    updateCheckoutLineItems,
    loadingCheckoutUpdateLineItems,
  };
};

/**
 * Hook for customerAccessTokenDelete
 * @returns {deleteUserAccessToken, loadingDeleteUserAccessToken}
 */
export const useDeleteUserAccessToken = () => {
  const [deleteUserAccessToken, {loading: loadingDeleteUserAccessToken}] =
    useMutation<customerAccessTokenDelete, customerAccessTokenDeleteVariables>(
      CUSTOMER_ACCESS_TOKEN_DELETE,
      {
        onCompleted: data => {
          const errorMessage =
            data.customerAccessTokenDelete?.userErrors?.[0]?.message;
          if (errorMessage) {
            toast.error(errorMessage);
            return;
          }

          client.writeQuery({
            query: AUTHENTICATION,
            data: {accessToken: null},
          });

          toast.success('Successfully logged out!');
        },
        onError: e => {
          // Means user has the wrong token or token expired
          if (e.message === 'CustomerAccessTokenDelete access denied') {
            client.writeQuery({
              query: AUTHENTICATION,
              data: {accessToken: null},
            });

            toast.success('Successfully logged out!');
          } else {
            toast.error(e.message);
          }
        },
      }
    );

  return {deleteUserAccessToken, loadingDeleteUserAccessToken};
};

/**
 * Hook for checkoutLineItemsRemove
 * @returns {removeCheckoutLineItem, loadingCheckoutRemoveItem}
 */
export const useRemoveCheckoutLineItem = () => {
  const [removeCheckoutLineItem, {loading: loadingCheckoutRemoveItem}] =
    useMutation<checkoutLineItemsRemove, checkoutLineItemsRemoveVariables>(
      CHECKOUT_LINE_ITEMS_REMOVE,
      {
        onCompleted: data => {
          const userErrors = data.checkoutLineItemsRemove?.checkoutUserErrors;
          const message = userErrors?.[0]?.message || 'Removed from cart!';
          toast.error(message);
        },
        onError: e => {
          toast.error(e.message);
        },
      }
    );

  return {removeCheckoutLineItem, loadingCheckoutRemoveItem};
};

/**
 * Hook for associateCustomerWithCheckout
 * @returns {linkAssociateCustomer, loadingLinkAssociateCustomer}
 */
export const useLinkAssociateCustomer = () => {
  const [linkAssociateCustomer, {loading: loadingLinkAssociateCustomer}] =
    useMutation<
      associateCustomerWithCheckout,
      associateCustomerWithCheckoutVariables
    >(CHECKOUT_LINK_CUSTOMER, {
      onCompleted: data => {
        const errorMessage =
          data.checkoutCustomerAssociateV2?.checkoutUserErrors?.[0]?.message;
        if (errorMessage) toast.error(errorMessage);
      },
      onError: e => {
        toast.error(e.message);
      },
    });

  return {linkAssociateCustomer, loadingLinkAssociateCustomer};
};

/**
 * Hook for checkoutShippingAddressUpdateV2
 * @returns {checkoutShippingAddressUpdate, loadingCheckoutShippingAddressUpdate}
 */
export const useCheckoutShippingUpdate = () => {
  const [
    checkoutShippingAddressUpdate,
    {loading: loadingCheckoutShippingAddressUpdate},
  ] = useMutation<
    checkoutShippingAddressUpdateV2,
    checkoutShippingAddressUpdateV2Variables
  >(CHECKOUT_UPDATE_SHIPPING_ADDRESS, {
    onCompleted: data => {
      const errorMessage =
        data.checkoutShippingAddressUpdateV2?.checkoutUserErrors?.[0]?.message;
      if (errorMessage) toast.error(errorMessage);
    },
  });

  return {checkoutShippingAddressUpdate, loadingCheckoutShippingAddressUpdate};
};

/**
 * Hook for customerAccessTokenCreate
 * @param onCompleted
 * @param onError
 * @returns {login, loadingLogin}
 */
export const useCustomerAccessTokenCreate = (
  onCompleted?: (data: customerAccessTokenCreate) => void,
  onError?: (e: ApolloError) => void
) => {
  /** Calls the Shopify server for the access token */
  const [login, {loading: loadingLogin}] = useMutation<
    customerAccessTokenCreate,
    customerAccessTokenCreateVariables
  >(CUSTOMER_ACCESS_TOKEN_CREATE, {
    update(cache, {data}) {
      const customerAccessToken =
        data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;

      if (customerAccessToken) {
        // write the [accessToken] to the persisted cache
        cache.writeQuery({
          query: AUTHENTICATION,
          data: {accessToken: customerAccessToken},
        });
      }
    },
    onCompleted(data) {
      onCompleted?.(data);
    },
    onError(e) {
      if (onError) {
        onError(e);
      } else {
        toast.error(e.message);
      }
    },
  });

  return {login, loadingLogin};
};

/**
 * Hook for customer create
 * @returns {signUp, loadingSignUp}
 */
export const useCustomerCreate = () => {
  const [signUp, {loading: loadingSignUp}] = useMutation<
    customerCreate,
    customerCreateVariables
  >(CUSTOMER_CREATE, {
    onCompleted(data) {
      const errors = data.customerCreate?.customerUserErrors;
      if (errors?.length) {
        // only show one error at a time.
        toast.error(errors?.[0]?.message);
      } else {
        toast.success('You have successfully registered an account!');
      }
    },
    onError(e) {
      toast.error(e.message);
    },
  });

  return {signUp, loadingSignUp};
};
