import _ from 'lodash';
import React from 'react';
import {CheckoutLineItemUpdateInput} from '../../../../../__generated__/globalTypes';
import {
  getCheckout_node_Checkout,
  getCheckout_node_Checkout_lineItems_edges_node,
} from '../../../../api/operations/queries/__generated__/getCheckout';
import {images} from '../../../../assets/images';
import {metadataFields} from '../../../../utils/constants/metafields.constants';
import {formatPrice} from '../../../../utils/format-price';
import {extractMetadataField} from '../../../../utils/metadata-field-extractor';
import {DecreeButton} from '../../../core/DecreeButton';
import {DecreeText} from '../../../core/DecreeText';
import {CartItem} from './CartItem';
import {quantityPresetFormatter} from '../../../../utils/quantity-preset-formatter';
import {customAttributeFields} from '../../../../utils/constants/custom-attribute.constants';
import {productTypes} from '../../../../utils/constants/product-type.constants';
import {getProductByHandle_productByHandle} from '../../../../api/operations/queries/__generated__/getProductByHandle';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../../route-list';
import {getProductStationeryType} from '../../../../utils/get-product-stationery-type';
import {StationeryTypes} from '../../../../utils/constants/stationery-type.constants';
import {
  AddressGroup,
  CreateCustomerAddressBookEntryResponse,
} from '../../../../services/customer-service';

type Props = {
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

export const CartForm = (props: Props) => {
  const history = useHistory();
  const checkout =
    props.checkout?.__typename === 'Checkout' ? props.checkout : null;

  const totalPrice = _.isEmpty(checkout?.lineItems.edges)
    ? checkout?.subtotalPriceV2.amount
    : checkout?.totalPriceV2.amount;

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-3 mt-6 space-y-6 laptop:col-span-2">
        {checkout?.lineItems.edges.map(item => {
          const itemProduct = item.node.variant?.product;
          const itemId = itemProduct?.id;
          const itemProductType = itemProduct?.productType;
          const itemCustomAttributes = item.node.customAttributes || [];

          const stationeryType = getProductStationeryType(itemProductType);
          const isSample = itemProductType === productTypes.SAMPLE;
          const isPartOfBundle = itemCustomAttributes.some(
            attr => attr.key === customAttributeFields.IS_PART_OF_BUNDLE
          );
          const isShipment = itemProductType === productTypes.SHIPMENT;
          const isBusinessStationery =
            stationeryType === StationeryTypes.BUSINESS;
          const isEnvelope = itemProductType === productTypes.ENVELOPE;
          const isWaxSeal = itemProductType === productTypes.WAX_SEALS;
          const packageTitle = itemCustomAttributes.find(
            attr => attr.key === customAttributeFields.IS_PART_OF_BUNDLE
          )?.value;
          const productPrice = item.node.variant?.priceV2.amount;
          const cost = formatPrice(
            isSample ? productPrice : productPrice * item.node.quantity
          );
          const sampleQuantityPresets = [{name: `1 at ${cost}`, value: '1'}];
          const regularQuantityPresets = extractMetadataField(
            itemProduct,
            metadataFields.QUANTITY_PRESET
          );
          const formattedRegularQuantityPresets = quantityPresetFormatter(
            productPrice,
            regularQuantityPresets
          );
          const quantityPresets = isSample
            ? sampleQuantityPresets
            : formattedRegularQuantityPresets;
          const isEditDisabled =
            isSample || isPartOfBundle || isEnvelope || isWaxSeal;

          if (isShipment) return null;

          return (
            <div
              key={item.node.id}
              className="border-b-[1px] border-gray pb-4 laptop:pb-6"
            >
              <CartItem
                // Default Title comes directly from shopify if there's no other variant for the product
                title={`${item.node.title}  ${
                  item.node?.variant?.title !== 'Default Title'
                    ? `(${item.node?.variant?.title})`
                    : ''
                }`}
                subtitle={`${itemProductType || ''} ${
                  isPartOfBundle ? `(${packageTitle})` : ''
                }`}
                addressGroups={props.addressGroups}
                costText={cost}
                quantity={item.node.quantity}
                quantityPresets={quantityPresets}
                isEmailTextVisible={isBusinessStationery}
                isEditDisabled={isEditDisabled}
                isShippingHidden={
                  isEnvelope || isWaxSeal || isSample || !props.isAuthenticated
                }
                isEditHidden={isEditDisabled}
                isQuantityDisabled={isSample}
                imageSrc={
                  isEnvelope
                    ? item.node.variant?.image?.originalSrc ||
                      images.decree_no_image
                    : item.node.customAttributes?.[0]?.value ||
                      images.decree_no_image
                }
                isTitleAndImageDisabled={isEnvelope || isWaxSeal}
                shipmentOptions={
                  props.shipmentData?.productByHandle.variants.edges.map(
                    variant => ({
                      name: `${variant.node.title} ($${variant.node.priceV2.amount}/ea)`,
                      value: variant.node.id,
                    })
                  ) || []
                }
                userConfiguredShipment={(variantId, contactIds) => {
                  props.userConfiguredShipment(
                    {
                      variantId,
                      quantity: contactIds.length,
                    },
                    item.node,
                    contactIds
                  );
                }}
                shipmentValue={(() => {
                  const customAttributes = item.node.customAttributes;

                  const shipmentData = customAttributes.find(
                    attr => attr.key === customAttributeFields.SHIPMENT
                  );
                  return shipmentData?.value || '';
                })()}
                persistedCsvLink={(() => {
                  const customAttributes = item.node.customAttributes;
                  const findCsvLink = customAttributes.find(
                    attr => attr.key === customAttributeFields.CSV_LINK
                  );

                  return findCsvLink ? findCsvLink.value : null;
                })()}
                onRemove={() => {
                  const customAttributes = item.node.customAttributes;
                  const attributeIndex = customAttributes.findIndex(
                    attribute =>
                      attribute.value &&
                      attribute.key === customAttributeFields.SVG_FILE
                  );

                  props.userClickedRemove(
                    item.node.id,
                    customAttributes[attributeIndex]?.value || ''
                  );
                }}
                onQuantitySelect={quantity =>
                  props.userSelectedQuantity({
                    id: item.node.id,
                    quantity,
                  })
                }
                onEdit={() => {
                  if (!isSample) {
                    props.userClickedEdit(item.node);
                  }
                }}
                onImageOrTitleClicked={() => {
                  if (!isEnvelope && !isWaxSeal) {
                    const productId = isSample
                      ? _.find(
                          itemCustomAttributes,
                          attribute =>
                            attribute.key ===
                            customAttributeFields.PARENT_PRODUCT_ID
                        )?.value
                      : itemId;

                    if (!productId) return;

                    history.push(
                      routes.STORE__VIEW__PRODUCT_CUSTOMIZATION(
                        itemProductType,
                        productId
                      )
                    );
                  }
                }}
                userContacts={props.userContacts}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col-reverse col-span-3 mt-6 laptop:space-y-6 laptop:flex-col laptop:col-span-1 laptop:mx-4">
        <div className="grid grid-cols-2 mt-4 space-y-3 laptop:space-y-0 laptop:space-x-4 laptop:mt-0">
          <DecreeButton
            className="col-span-2 laptop:col-span-1"
            onClick={props.userClickedCheckout}
            disabled={
              _.isEmpty(props.checkout?.lineItems.edges) ||
              !props.checkout?.webUrl
            }
          >
            <DecreeText size={18}>Checkout</DecreeText>
          </DecreeButton>
          <DecreeButton
            mode="secondary"
            className="col-span-2 overflow-hidden laptop:col-span-1 whitespace-nowrap overflow-ellipsis"
          >
            <DecreeText
              className="overflow-hidden whitespace-nowrap overflow-ellipsis"
              size={18}
              onClick={props.userClosedCart}
            >
              Continue Shopping
            </DecreeText>
          </DecreeButton>
        </div>
        <div className="rounded-md bg-offwhite">
          <div className="p-5">
            <div className="flex space-x-8">
              <DecreeText
                size={16}
                className="flex-1 text-right uppercase text-blue-dark"
              >
                Number of Items
              </DecreeText>
              <DecreeText
                size={16}
                className="flex-1 text-left uppercase text-blue-dark"
              >
                {
                  checkout?.lineItems.edges.filter(
                    edge =>
                      edge.node.variant?.product.productType !==
                      productTypes.SHIPMENT
                  ).length
                }
              </DecreeText>
            </div>
            <div className="w-full h-[1px] bg-blue-dark my-4" />
            <div className="flex space-x-8">
              <DecreeText
                size={16}
                className="flex-1 text-right uppercase text-blue-dark"
              >
                Subtotal
              </DecreeText>
              <DecreeText
                size={16}
                className="flex-1 text-left uppercase text-blue-dark"
              >
                {formatPrice(checkout?.subtotalPriceV2.amount)}
              </DecreeText>
            </div>
          </div>
          <div className="flex py-4 space-x-8 bg-blue-dark rounded-b-md">
            <DecreeText
              size={16}
              className="flex-1 font-bold text-right text-white uppercase"
            >
              Total
            </DecreeText>
            <DecreeText
              size={16}
              className="flex-1 font-bold text-left text-white uppercase"
            >
              {formatPrice(totalPrice)}
            </DecreeText>
          </div>
        </div>
      </div>
    </div>
  );
};
