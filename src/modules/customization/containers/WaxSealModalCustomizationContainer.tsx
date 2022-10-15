import React, {useEffect, useRef, useState} from 'react';
import {
  useCheckoutData,
  useProductByHandleData,
} from '../../../utils/hooks/query-hooks';
import {useForm, UseFormReturn} from 'react-hook-form';
import {TextSettingsFormState} from '../models/TextSettingsFormState';
import {getDefaultTextSettings} from './helpers/get-default-text-settings';
import {getTextSettingsOptions} from './helpers/get-text-settings-options';
import {TextSettingsOptions} from '../models/TextSettingsOptions';
import {MonogramFormState} from '../models/MonogramFormState';
import {extractMetadataField} from '../../../utils/metadata-field-extractor';
import {metadataFields} from '../../../utils/constants/metafields.constants';
import _ from 'lodash';
import {toast} from 'react-toastify';
import {Environment} from '../../../Environment';
import {
  useAddCheckoutLineItems,
  useUpdateCheckoutLineItems,
} from '../../../utils/hooks/mutation-hooks';
import {customAttributeFields} from '../../../utils/constants/custom-attribute.constants';

const {QUANTITY_PRESET} = metadataFields;

export type WaxSealModalCustomizationScreenProps = {
  svgUrl: string;
  title: string;
  subtitle: string;
  totalPrice: number;
  loading: boolean;
  showModal: boolean;
  isLaptopWidth: boolean;
  isEditMode?: boolean;
  monogramForm: UseFormReturn<MonogramFormState>;
  textSettingsOptions: TextSettingsOptions;
  textSettingsForm: UseFormReturn<TextSettingsFormState>;
  userClickedCancel: () => void;
  userClickedAddToCart: () => void;
  onSetSvgBlob: (svg: Blob) => void;
};

type WaxSealModalCustomizationContainerProps = {
  showModal: boolean;
  isLaptop: boolean;
  waxSealId: string;
  userClickedCancel: () => void;
  userClickedAddToCart: (id: string) => void;
};

export const WaxSealModalCustomizationContainer =
  (Screen: React.VFC<WaxSealModalCustomizationScreenProps>) =>
  (props: WaxSealModalCustomizationContainerProps) => {
    const {services} = Environment.current();

    const svgRef = useRef<Blob | null>(null);

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [isUploadingSvg, setIsUploadingSvg] = useState(false);

    const {addCheckoutLineItems, loadingCheckoutAddLineItems} =
      useAddCheckoutLineItems();
    const {updateCheckoutLineItems, loadingCheckoutUpdateLineItems} =
      useUpdateCheckoutLineItems();
    const {productData, loadingProductData} =
      useProductByHandleData('wax-seal');
    const {checkoutData, loadingCheckoutData} = useCheckoutData();

    const textSettingsOptions = getTextSettingsOptions(
      productData?.productByHandle
    );

    const defaultTextSettings = getDefaultTextSettings(
      false,
      textSettingsOptions
    );

    const textSettingsForm = useForm<TextSettingsFormState>({
      defaultValues: defaultTextSettings,
    });

    const monogramForm = useForm<MonogramFormState>({
      defaultValues: {
        text1: 'A',
        text2: '',
        text3: '',
      },
    });

    const isLoading =
      loadingProductData ||
      isUploadingSvg ||
      loadingCheckoutAddLineItems ||
      loadingCheckoutData ||
      loadingCheckoutUpdateLineItems;

    // Reinitializes the form value
    useEffect(() => {
      const waxSeal = productData?.productByHandle;

      if (waxSeal) {
        textSettingsForm.reset(defaultTextSettings);

        const quantity = extractMetadataField(waxSeal, QUANTITY_PRESET);
        const quantityValue = _.head(quantity)?.value;
        const parsedQuantityValue = _.parseInt(quantityValue || '1') || 1;

        setPrice(waxSeal.priceRange.minVariantPrice.amount);
        setQuantity(parsedQuantityValue);
      }
    }, [loadingProductData]);

    return (
      <Screen
        title={productData?.productByHandle.title || ''}
        subtitle={productData?.productByHandle.subtitle?.value || ''}
        svgUrl={productData?.productByHandle.description || ''}
        totalPrice={quantity * price}
        loading={isLoading}
        isLaptopWidth={props.isLaptop}
        showModal={props.showModal}
        isEditMode={!!props.waxSealId}
        monogramForm={monogramForm}
        textSettingsForm={textSettingsForm}
        textSettingsOptions={textSettingsOptions}
        userClickedCancel={props.userClickedCancel}
        userClickedAddToCart={async () => {
          if (isLoading) return;

          const currentMonogramValues = monogramForm.getValues();
          const currentTextValues = textSettingsForm.getValues();

          const productVariantId =
            productData?.productByHandle?.variants.edges[0]?.node.id || '';

          const errMessage =
            'Failed to add to cart. Refresh the page & try again.';

          if (!svgRef.current || !productVariantId || !checkoutData?.node) {
            toast.error(errMessage);
            return;
          }

          try {
            setIsUploadingSvg(true);

            const svgUrl = await services.cloud.uploadSvg(svgRef.current);

            if (!svgUrl) {
              toast.error(errMessage);
              return;
            }

            const customAttributes = [
              {key: customAttributeFields.SVG_FILE, value: svgUrl},
            ];

            if (props.waxSealId) {
              const {data, errors} = await updateCheckoutLineItems({
                variables: {
                  checkoutId: checkoutData!.node.id,
                  lineItems: [
                    {
                      id: props.waxSealId,
                      variantId: productVariantId,
                      quantity: quantity,
                      customAttributes: customAttributes,
                    },
                  ],
                },
              });

              const waxSeal =
                data?.checkoutLineItemsUpdate?.checkout?.lineItems.edges.find(
                  e => e.node.customAttributes.some(a => a.value === svgUrl)
                );
              if (
                errors?.length ||
                !data?.checkoutLineItemsUpdate?.checkout?.id ||
                !waxSeal
              ) {
                toast.error(errors?.[0].message || errMessage);
                return;
              }

              props.userClickedAddToCart(waxSeal.node.id);
            } else {
              const {data, errors} = await addCheckoutLineItems({
                variables: {
                  checkoutId: checkoutData!.node.id,
                  lineItems: [
                    {
                      variantId: productVariantId,
                      quantity: quantity,
                      customAttributes: customAttributes,
                    },
                  ],
                },
              });

              const waxSeal =
                data?.checkoutLineItemsAdd?.checkout?.lineItems.edges.find(e =>
                  e.node.customAttributes.some(a => a.value === svgUrl)
                );
              if (
                errors?.length ||
                !data?.checkoutLineItemsAdd?.checkout?.id ||
                !waxSeal
              ) {
                toast.error(errors?.[0].message || errMessage);
                return;
              }
              props.userClickedAddToCart(waxSeal.node.id);
            }

            setIsUploadingSvg(false);

            props.userClickedCancel();
            // Reset monogram and text setting values since values
            // become undefined after submitting
            monogramForm.reset(currentMonogramValues);
            textSettingsForm.reset(currentTextValues);
          } catch (e) {
            toast.error(e.message);
            setIsUploadingSvg(false);
          }
        }}
        onSetSvgBlob={svg => {
          svgRef.current = svg;
        }}
      />
    );
  };
