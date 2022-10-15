import _ from 'lodash';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {CheckoutLineItemUpdateInput} from '../../../../__generated__/globalTypes';
import {
  getCheckout_node_Checkout,
  getCheckout_node_Checkout_lineItems_edges_node,
} from '../../../api/operations/queries/__generated__/getCheckout';
import {images} from '../../../assets/images';
import {CloseIcon} from '../../../assets/svg';
import {routes} from '../../../route-list';
import {metadataFields} from '../../../utils/constants/metafields.constants';
import {formatPrice} from '../../../utils/format-price';
import {extractMetadataField} from '../../../utils/metadata-field-extractor';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeSpinner} from '../../core/DecreeSpinner';
import {DecreeText} from '../../core/DecreeText';
import {CartItem} from './shared/CartItem';
import {quantityPresetFormatter} from '../../../utils/quantity-preset-formatter';
import {customAttributeFields} from '../../../utils/constants/custom-attribute.constants';
import {productTypes} from '../../../utils/constants/product-type.constants';
import {getProductByHandle_productByHandle} from '../../../api/operations/queries/__generated__/getProductByHandle';
import {getProductStationeryType} from '../../../utils/get-product-stationery-type';
import {StationeryTypes} from '../../../utils/constants/stationery-type.constants';
import {
  AddressGroup,
  CreateCustomerAddressBookEntryResponse,
} from '../../../services/customer-service';

type Props = {
  checkout: getCheckout_node_Checkout | undefined | null;
  shipmentData:
    | {
        productByHandle: getProductByHandle_productByHandle;
      }
    | undefined;
  loading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  userClickedRemove: (id: string, svgUrl: string) => void;
  userClickedCheckout: () => void;
  userSelectedQuantity: (lineItem: CheckoutLineItemUpdateInput) => void;
  userClickedEdit: (
    lineItemNode:
      | getCheckout_node_Checkout_lineItems_edges_node
      | undefined
      | null
  ) => void;

  sampleIsOnLimit?: boolean;
  isAuthenticated: boolean;
  addressGroups: AddressGroup[];
  userContacts: CreateCustomerAddressBookEntryResponse[];
  userConfiguredShipment: (
    shipment: CheckoutLineItemUpdateInput,
    lineItem: getCheckout_node_Checkout_lineItems_edges_node,
    contactIds: string[]
  ) => void;
};

export const CartModal = (props: Props) => {
  const history = useHistory();

  const checkout =
    props.checkout?.__typename === 'Checkout' ? props.checkout : null;

  if (!props.isOpen) return null;

  const totalPrice = _.isEmpty(checkout?.lineItems.edges)
    ? checkout?.subtotalPriceV2.amount
    : checkout?.totalPriceV2.amount;

  const itemsLength =
    checkout?.lineItems.edges.filter(
      edge => edge.node.variant?.product.productType !== productTypes.SHIPMENT
    ).length || 0;

  return (
    <div className="absolute left-0 w-full h-full">
      <div className="absolute z-10 w-[540px] pt-6 bg-white shadow-xl top-1 right-6 px-9 pb-9">
        <div className="w-full mb-3 text-right">
          <button onClick={props.onClose}>
            <CloseIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <DecreeText size={23} className="font-serif font-bold text-blue-dark">
            Review Your Cart
          </DecreeText>
          <DecreeText size={16} className="text-blue-dark">
            {itemsLength} item
            {(itemsLength || 0) > 1 && 's'}
          </DecreeText>
        </div>
        {props.sampleIsOnLimit && (
          <div>
            <DecreeText size={12} className="text-red-600 mb-6">
              You have reached your maximum of 5 samples
            </DecreeText>
          </div>
        )}
        <div className="border-b-[1px] border-gray max-h-[40vh] overflow-y-auto pr-8 space-y-6 pb-6">
          {props.loading ? (
            <DecreeSpinner type="primary" />
          ) : (
            checkout?.lineItems.edges.map(item => {
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
              const sampleQuantityPresets = [
                {name: `1 at ${cost}`, value: '1'},
              ];
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
                <div key={item.node.id}>
                  <CartItem
                    mode="modal"
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
                      isEnvelope ||
                      isWaxSeal ||
                      isSample ||
                      !props.isAuthenticated
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
                      props?.userConfiguredShipment?.(
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
            })
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <DecreeText size={23} className="font-serif font-bold text-blue-dark">
            Total:
          </DecreeText>
          <DecreeText size={23} className="font-serif font-bold text-blue-dark">
            {formatPrice(totalPrice)}
          </DecreeText>
        </div>
        <div className="flex items-center justify-between mt-8">
          <DecreeButton
            mode="secondary"
            onClick={() => history.push(routes.CART)}
          >
            View Cart
          </DecreeButton>
          <DecreeButton
            onClick={props.userClickedCheckout}
            disabled={
              _.isEmpty(props.checkout?.lineItems.edges) ||
              !props.checkout?.webUrl ||
              props.loading
            }
          >
            Checkout
          </DecreeButton>
        </div>
      </div>
    </div>
  );
};
