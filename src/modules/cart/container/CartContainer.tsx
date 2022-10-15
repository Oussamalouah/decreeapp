import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {
  getCheckout_node_Checkout,
  getCheckout_node_Checkout_lineItems_edges_node,
} from '../../../api/operations/queries/__generated__/getCheckout';
import {
  CHECKOUT_LINE_ITEM_UPDATE,
  CHECKOUT_LINE_ITEMS_REMOVE,
} from '../../../api/operations/mutations/checkout';
import {useMutation, useQuery} from '@apollo/client';
import {toast} from 'react-toastify';
import {
  checkoutLineItemsRemove,
  checkoutLineItemsRemoveVariables,
} from '../../../api/operations/mutations/__generated__/checkoutLineItemsRemove';
import {
  checkoutLineItemsUpdate,
  checkoutLineItemsUpdateVariables,
} from '../../../api/operations/mutations/__generated__/checkoutLineItemsUpdate';
import {
  AttributeInput,
  CheckoutLineItemUpdateInput,
} from '../../../../__generated__/globalTypes';
import {routes} from '../../../route-list';
import {
  useCheckoutData,
  useProductByHandleData,
} from '../../../utils/hooks/query-hooks';
import _ from 'lodash';
import {customAttributeFields} from '../../../utils/constants/custom-attribute.constants';
import {productHandles} from '../../../utils/constants/product-handle.constants';
import {getProductByHandle_productByHandle} from '../../../api/operations/queries/__generated__/getProductByHandle';
import {useAddCheckoutLineItems} from '../../../utils/hooks/mutation-hooks';
import {Environment} from '../../../Environment';
import {ConvertAddressesToCsvBlob} from '../../../utils/convert-addresses-to-csv-blob';
import {AUTHENTICATION} from '../../../api/operations/queries/authentication';
import {authentication} from '../../../api/operations/queries/__generated__/authentication';
import {getCustomerProfile} from '../../../api/operations/queries/__generated__/getCustomerProfile';
import {GET_CUSTOMER_PROFILE} from '../../../api/operations/queries/customer';
import {
  AddressGroup,
  CreateCustomerAddressBookEntryResponse,
} from '../../../services/customer-service';
import {getGoogleClientId} from '../../../utils/get-google-client-id';

export type CartProps = {
  loading: boolean;
  checkout: getCheckout_node_Checkout | undefined | null;
  shipmentData:
    | {
        productByHandle: getProductByHandle_productByHandle;
      }
    | undefined;
  userClosedCart: () => void;
  userClickedRemove: (id: string, svgUrl: string) => void;
  userClickedCheckout: () => void;
  userSelectedQuantity: (lineItem: CheckoutLineItemUpdateInput) => void;
  userClickedEdit: (
    lineItemNode:
      | getCheckout_node_Checkout_lineItems_edges_node
      | undefined
      | null
  ) => void;
  isAuthenticated: boolean;
  addressGroups: AddressGroup[];
  userContacts: CreateCustomerAddressBookEntryResponse[];
  userConfiguredShipment: (
    shipment: CheckoutLineItemUpdateInput,
    lineItem: getCheckout_node_Checkout_lineItems_edges_node,
    contactIds: string[]
  ) => void;
};

export const CartContainer = (Screen: React.FC<CartProps>) => () => {
  const history = useHistory();

  const {services} = Environment.current();

  const {data: authData} = useQuery<authentication>(AUTHENTICATION);

  const isAuthenticated = Boolean(authData?.accessToken);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [addressGroups, setAddressGroups] = React.useState<AddressGroup[]>([]);
  const [userContacts, setUserContacts] = React.useState<
    CreateCustomerAddressBookEntryResponse[]
  >([]);
  const [searchContactsTerm, setSearchContactsTerm] =
    React.useState<string>('');
  const [contactSearchResults, setContactSearchResults] = React.useState<
    CreateCustomerAddressBookEntryResponse[]
  >([]);

  const {loading: loadingProfile, data: profileData} =
    useQuery<getCustomerProfile>(GET_CUSTOMER_PROFILE, {
      variables: {
        customerAccessToken: authData?.accessToken || '',
      },
      onError(error) {
        toast.error(error.message);
      },
    });

  // Get shipment options
  const {productData: shipmentData, loadingProductData: loadingShipmentData} =
    useProductByHandleData(productHandles.shipment);

  // Mutation to add shipment option product to cart
  const {addCheckoutLineItems, loadingCheckoutAddLineItems} =
    useAddCheckoutLineItems();

  // Gets checkout data for the cart
  const {loadingCheckoutData, checkoutData} = useCheckoutData();

  // mutation to remove a checkout line item
  const [removeCheckoutLineItem, {loading: loadingCheckoutRemoveItem}] =
    useMutation<checkoutLineItemsRemove, checkoutLineItemsRemoveVariables>(
      CHECKOUT_LINE_ITEMS_REMOVE,
      {
        onCompleted: data => {
          const userErrors = data.checkoutLineItemsRemove?.checkoutUserErrors;
          const errorMessage = userErrors?.[0]?.message || 'Removed from cart!';
          toast.error(errorMessage);
        },
        onError: e => {
          toast.error(e.message);
        },
      }
    );

  // mutation to update a checkout line item
  const [updateCheckoutLineItem, {loading: loadingCheckoutUpdateItem}] =
    useMutation<checkoutLineItemsUpdate, checkoutLineItemsUpdateVariables>(
      CHECKOUT_LINE_ITEM_UPDATE,
      {
        onCompleted: data => {
          const errorMessage =
            data.checkoutLineItemsUpdate?.checkoutUserErrors?.[0]?.message;
          if (errorMessage) toast.error(errorMessage);
        },
        onError: e => {
          toast.error(e.message);
        },
      }
    );

  const handleGetAddressGroups = React.useCallback(async () => {
    if (profileData?.customer?.email) {
      try {
        setIsLoading(true);
        const groups = await services.customer.getAddressesGroups(
          profileData.customer.email
        );
        setIsLoading(false);
        setAddressGroups(groups);
      } catch (error) {
        toast.error(error?.message || 'Error getting address groups');
      }
    }
  }, [profileData?.customer]);

  const handleGetAllUserContacts = React.useCallback(async () => {
    if (profileData?.customer?.email) {
      try {
        setIsLoading(true);
        const addresses = await services.customer.getCustomerAddresses(
          profileData?.customer?.email || ''
        );
        setIsLoading(false);
        setUserContacts(addresses);
      } catch (error) {
        toast.error(error?.message || 'Error getting user contacts');
      }
    }
  }, [profileData?.customer]);

  const handleGetShipmentRecipients = React.useCallback(
    (contactIds: string[]) => {
      const selectedContacts: CreateCustomerAddressBookEntryResponse[] = [];

      _.uniq(contactIds).forEach(id => {
        const userDetails = userContacts.find(contact => contact.id === id);
        if (userDetails) {
          selectedContacts.push(userDetails);
        }
      });
      return selectedContacts;
    },
    [userContacts]
  );

  useEffect(() => {
    handleGetAddressGroups();
  }, [handleGetAddressGroups]);

  useEffect(() => {
    handleGetAllUserContacts();
  }, [handleGetAllUserContacts]);

  return (
    <Screen
      loading={
        loadingCheckoutData ||
        loadingCheckoutRemoveItem ||
        loadingCheckoutUpdateItem ||
        loadingShipmentData ||
        loadingCheckoutAddLineItems ||
        loadingProfile ||
        isLoading
      }
      shipmentData={shipmentData}
      checkout={checkoutData?.node}
      userClosedCart={() => history.goBack()}
      userClickedRemove={(id, svgUrl) => {
        const lineItemIds = [id];

        const shipment = checkoutData?.node.lineItems.edges.find(edge =>
          edge.node.customAttributes.some(
            attr => attr.key === '_parent' && attr.value === id
          )
        );

        const envelope = _.find(
          checkoutData?.node.lineItems.edges,
          e =>
            e.node.customAttributes.some(
              i =>
                i.value === svgUrl &&
                i.key === customAttributeFields.PARENT_SVG_FILE
            ) && e.node.id !== id
        );

        if (envelope?.node) {
          lineItemIds.push(envelope.node.id);
        }

        if (shipment?.node) {
          lineItemIds.push(shipment.node.id);
        }

        removeCheckoutLineItem({
          variables: {
            checkoutId: checkoutData?.node.id || '',
            lineItemIds,
          },
        });
      }}
      userClickedCheckout={async () => {
        const gaClientId = await getGoogleClientId('linkerParam');
        if (checkoutData?.node.webUrl && gaClientId) {
          window.location.replace(`${checkoutData?.node.webUrl}&${gaClientId}`);
        } else {
          toast.error('Error checking out');
        }
      }}
      userSelectedQuantity={lineItem => {
        const lineItems = [lineItem];

        updateCheckoutLineItem({
          variables: {
            checkoutId: checkoutData?.node.id || '',
            lineItems,
          },
        });
      }}
      userConfiguredShipment={async (shipment, lineItem, contactIds) => {
        if (!contactIds.length)
          return toast.error('Please select recipients for the shipment.');

        // get stationery attributes

        let stationeryAttributes =
          lineItem.customAttributes.map(({key, value}) => ({key, value})) || [];
        // check if stationery has shipment attribute to determine if it should edit
        const hasProductShipment = stationeryAttributes.find(
          attr => attr.key === customAttributeFields.SHIPMENT
        );

        // get the lineitem of the "shipping" product associated with the stationery
        const shippingLineItem = checkoutData?.node.lineItems.edges.find(
          edge => edge.node.variant?.id === hasProductShipment?.value
        );

        const shipmentVariantData =
          shipmentData?.productByHandle.variants.edges.find(
            edge => edge.node.id === shipment.variantId
          );

        const isRemovingShipment = hasProductShipment && !shipment.variantId;
        const isAddingShipment = !hasProductShipment && shipment.variantId;
        const isEditingShipment = hasProductShipment && shipment.variantId;

        try {
          if (isAddingShipment) {
            setIsLoading(true);

            const selectedContacts = handleGetShipmentRecipients(contactIds);

            const blob = ConvertAddressesToCsvBlob(selectedContacts);
            const csvUrl = await services.cloud.uploadIcon(blob, 'address.csv');
            setIsLoading(false);

            stationeryAttributes = [
              ...stationeryAttributes,
              {
                key: customAttributeFields.SHIPMENT,
                value: shipment.variantId || '',
              },
              {
                key: customAttributeFields.SHIPMENT_TYPE,
                value: shipmentVariantData?.node.title || '',
              },
              {
                key: customAttributeFields.CSV_LINK,
                value: csvUrl,
              },
            ];

            await addCheckoutLineItems({
              variables: {
                checkoutId: checkoutData?.node.id || '',
                lineItems: [
                  {
                    quantity: contactIds.length,
                    variantId: shipment.variantId || '',
                    customAttributes: [{key: '_parent', value: lineItem.id}],
                  },
                ],
              },
            });
          } else if (isRemovingShipment) {
            stationeryAttributes = stationeryAttributes.filter(
              attr =>
                attr.key !== customAttributeFields.SHIPMENT &&
                attr.key !== customAttributeFields.SHIPMENT_TYPE &&
                attr.key !== customAttributeFields.CSV_LINK
            );

            await removeCheckoutLineItem({
              variables: {
                checkoutId: checkoutData?.node.id || '',
                lineItemIds: [shippingLineItem?.node.id || ''],
              },
            });
          } else if (isEditingShipment) {
            setIsLoading(true);
            const selectedContacts = handleGetShipmentRecipients(contactIds);
            const blob = ConvertAddressesToCsvBlob(selectedContacts);
            const csvUrl = await services.cloud.uploadIcon(blob, 'address.csv');
            setIsLoading(false);

            stationeryAttributes = stationeryAttributes.map(attr => {
              if (attr.key === customAttributeFields.SHIPMENT) {
                return {...attr, value: shipment.variantId || ''};
              }
              if (attr.key === customAttributeFields.SHIPMENT_TYPE) {
                return {
                  ...attr,
                  value: shipmentVariantData?.node.title || '',
                };
              }
              if (attr.key === customAttributeFields.CSV_LINK) {
                return {
                  ...attr,
                  value: csvUrl,
                };
              }
              return attr;
            });
          }

          const lineItemsUpdate: CheckoutLineItemUpdateInput[] = [
            {
              id: lineItem?.id || '',
              customAttributes: stationeryAttributes as AttributeInput[],
            },
          ];

          // should update always the custom attributes of the stationery
          await updateCheckoutLineItem({
            variables: {
              checkoutId: checkoutData?.node.id || '',
              lineItems: isEditingShipment
                ? [
                    ...lineItemsUpdate,
                    {
                      id: shippingLineItem?.node.id || '',
                      variantId: shipment.variantId,
                    },
                  ]
                : lineItemsUpdate,
            },
          });
        } catch (error) {
          toast.error(error?.message || 'Error saving shipment');
        }
      }}
      userClickedEdit={lineItemNode => {
        if (!lineItemNode?.variant?.product) {
          toast.error('Invalid Product');
          return;
        }

        const productType =
          lineItemNode.variant.product.productType || 'invitation';
        const id = lineItemNode.variant.product.id;

        // ID is now based on the svg file id
        // Doing this since if its the same variant even with custom attributes the ID is the same
        const svgFileId = _.last(
          lineItemNode.customAttributes?.[0]?.value?.split('/')
        );

        history.push({
          pathname: routes.STORE__VIEW__PRODUCT_CUSTOMIZATION(productType, id),
          search: `id=${svgFileId}`,
        });
      }}
      isAuthenticated={isAuthenticated}
      addressGroups={addressGroups}
      userContacts={userContacts}
    />
  );
};
