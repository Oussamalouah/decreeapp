import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {AUTHENTICATION} from '../../../api/operations/queries/authentication';
import {GET_CUSTOMER_PROFILE} from '../../../api/operations/queries/customer';
import {GET_CUSTOMER_ORDERS} from '../../../api/operations/queries/order';
import {authentication} from '../../../api/operations/queries/__generated__/authentication';
import {
  getCustomerOrders,
  getCustomerOrders_customer_orders_edges,
  getCustomerOrders_customer_orders_edges_node_lineItems_edges,
  getCustomerOrders_customer_orders_edges_node_lineItems_edges_node_customAttributes,
} from '../../../api/operations/queries/__generated__/getCustomerOrders';
import {getCustomerProfile} from '../../../api/operations/queries/__generated__/getCustomerProfile';
import {routes} from '../../../route-list';
import {
  useAddCheckoutLineItems,
  useCreateCheckout,
} from '../../../utils/hooks/mutation-hooks';
import {AttributeInput} from '../../../../__generated__/globalTypes';
import {useCheckoutData} from '../../../utils/hooks/query-hooks';
import _ from 'lodash';
import {customAttributeFields} from '../../../utils/constants/custom-attribute.constants';

export type OrdersProps = {
  title: string;
  loading: boolean;
  orders: getCustomerOrders_customer_orders_edges[];
  userClickedClose: () => void;
  userClickedReorder: (
    orderSvgFile: string,
    orderProduct: getCustomerOrders_customer_orders_edges_node_lineItems_edges,
    orderLineItemEdges: getCustomerOrders_customer_orders_edges_node_lineItems_edges[]
  ) => void;
};

export const OrdersContainer =
  (Screen: React.ComponentType<OrdersProps>) => () => {
    const history = useHistory();
    const [isReordering, setIsReordering] = useState(false);

    // Get access token from the cache
    const {data: authData} = useQuery<authentication>(AUTHENTICATION);

    // Get customer profile from Shopify
    const {loading: loadingProfile, data: profileData} =
      useQuery<getCustomerProfile>(GET_CUSTOMER_PROFILE, {
        variables: {
          customerAccessToken: authData?.accessToken,
        },
        onError(error) {
          toast.error(error.message);
        },
      });

    // Get customer orders from Shopify
    const {loading: loadingOrders, data: orderData} =
      useQuery<getCustomerOrders>(GET_CUSTOMER_ORDERS, {
        variables: {
          customerAccessToken: authData?.accessToken,
        },
        onError(error) {
          toast.error(error.message);
        },
      });

    const {addCheckoutLineItems, loadingCheckoutAddLineItems} =
      useAddCheckoutLineItems();

    const {createCheckout, loadingCheckoutCreate} = useCreateCheckout();

    const {loadingCheckoutData, checkoutData} = useCheckoutData();

    // Initializes checkout if empty
    useEffect(() => {
      if (!checkoutData?.node.id) {
        createCheckout({
          variables: {input: {lineItems: []}},
        });
      }
    }, [loadingCheckoutData]);

    return (
      <Screen
        title={`${profileData?.customer?.firstName || ''} ${
          profileData?.customer?.lastName || ''
        }`}
        loading={
          loadingOrders ||
          loadingProfile ||
          loadingCheckoutAddLineItems ||
          loadingCheckoutData ||
          loadingCheckoutCreate ||
          isReordering
        }
        orders={orderData?.customer?.orders.edges || []}
        userClickedClose={() => history.push(routes.HOME)}
        userClickedReorder={async (
          orderSvgFile,
          orderProduct,
          orderLineItemEdges
        ) => {
          if (!orderProduct.node.variant?.id || !checkoutData?.node) {
            toast.error('Failed to add to cart. Refresh the page & try again.');
            return;
          }

          try {
            setIsReordering(true);

            // Find the envelope that was ordered with the invitation
            const associatedEnvelope = _.find(
              orderLineItemEdges,
              lineItemEdge => {
                const lineItemEdgeNode = lineItemEdge.node;

                return lineItemEdgeNode.customAttributes.some(
                  attribute =>
                    attribute.value === orderSvgFile &&
                    attribute.key === customAttributeFields.PARENT_SVG_FILE
                );
              }
            );

            // Removes and adds a _reorder_key in the custom attributes
            // Also filters out _typename else it will make it an invalid lineitem
            const getCustomAttributes = (
              customAttributes: getCustomerOrders_customer_orders_edges_node_lineItems_edges_node_customAttributes[]
            ) => {
              // To prevent _reorder_key from stacking if customer reordered a reorder
              const filteredAttributes = customAttributes.filter(attribute => {
                return (
                  attribute.key !== customAttributeFields.REORDER_KEY &&
                  attribute.key !== customAttributeFields.SHIPMENT &&
                  attribute.key !== customAttributeFields.SHIPMENT_TYPE &&
                  attribute.key !== customAttributeFields.CSV_LINK
                );
              });

              return [
                ...filteredAttributes.map(attribute => {
                  return {
                    key: attribute.key,
                    value: attribute.value,
                  } as AttributeInput;
                }),
                // To prevent the orders from stacking in the cart
                {
                  key: customAttributeFields.REORDER_KEY,
                  value: `${Math.random()}`,
                },
              ];
            };

            const lineItems = [
              {
                variantId: orderProduct.node.variant.id,
                quantity: orderProduct.node.quantity,
                customAttributes: getCustomAttributes(
                  orderProduct.node.customAttributes
                ),
              },
            ];

            // Adds the envelope to the lineitem if it exists
            if (associatedEnvelope?.node.variant) {
              lineItems.push({
                variantId: associatedEnvelope.node.variant.id,
                quantity: associatedEnvelope.node.currentQuantity,
                customAttributes: getCustomAttributes(
                  associatedEnvelope.node.customAttributes
                ),
              });
            }

            await addCheckoutLineItems({
              variables: {
                checkoutId: checkoutData.node.id,
                lineItems,
              },
            });

            setIsReordering(false);
          } catch (e) {
            toast.error(e.message);
            setIsReordering(false);
          }
        }}
      />
    );
  };
