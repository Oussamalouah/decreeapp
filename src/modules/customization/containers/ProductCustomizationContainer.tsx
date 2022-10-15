import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {getProduct_node_Product} from '../../../api/operations/queries/__generated__/getProduct';
import {getProductRecommendations_productRecommendations} from '../../../api/operations/queries/__generated__/getProductRecommendations';
import {Environment} from '../../../Environment';
import {routes} from '../../../route-list';
import {weddingCategories} from '../../../utils/constants/store.contants';
import {
  useAddCheckoutLineItems,
  useCreateCheckout,
  useUpdateCheckoutLineItems,
} from '../../../utils/hooks/mutation-hooks';
import {
  useCheckoutData,
  useProductByHandleData,
  useProductData,
  useRelatedProductsData,
} from '../../../utils/hooks/query-hooks';
import {SvgEditorElement} from '../../core/DecreeSvgEditor';
import {NotesCustomizerFormValues} from '../components/shared/sections/NotesCustomizer';
import {PaperSettingsFormState} from '../models/PaperSettingsFormState';
import {PaperSettingsOptions} from '../models/PaperSettingsOptions';
import {TextSettingsFormState} from '../models/TextSettingsFormState';
import {TextSettingsOptions} from '../models/TextSettingsOptions';
import {getDefaultPaperSettings} from './helpers/get-default-paper-settings';
import {getDefaultTextSettings} from './helpers/get-default-text-settings';
import {getLineItem} from './helpers/get-line-item';
import {getPaperSettingsOptions} from './helpers/get-paper-settings-options';
import {getResetPaperSettings} from './helpers/get-reset-paper-settings';
import {getResetTextSettings} from './helpers/get-reset-text-settings';
import {getTextSettingsOptions} from './helpers/get-text-settings-options';
import {getProductTotalPrice} from './helpers/get-total-price';
import {productHandles} from '../../../utils/constants/product-handle.constants';
import {getProductByHandle} from '../../../api/operations/queries/__generated__/getProductByHandle';
import {getEnvelopeOptions} from './helpers/get-envelope-options';
import {SettingOption} from '../models/SettingOption';
import {EnvelopeSettingsFormState} from '../models/EnvelopeSettingsFormState';
import {customAttributeFields} from '../../../utils/constants/custom-attribute.constants';
import {productTypes} from '../../../utils/constants/product-type.constants';
import {tags} from '../models/Tags';
import {
  AttributeInput,
  CheckoutLineItemUpdateInput,
} from '../../../../__generated__/globalTypes';
import {StationeryTypes} from '../../../utils/constants/stationery-type.constants';
import {getProductStationeryType} from '../../../utils/get-product-stationery-type';
import {getGoogleClientId} from '../../../utils/get-google-client-id';

type ProductDataByHandle = getProductByHandle | undefined;

type EnvelopeCustomizerOptions = {
  envelopeColorList: SettingOption[];
  liningColorList: SettingOption[];
  quantityList: SettingOption[];
};

type ProductVariantInfo = {
  [key: string]: string;
};

export type ProductCustomizationProps = {
  loading: boolean;
  productSvgEditorAllowSaveToStorage: boolean;
  isEditMode: boolean;
  productHasLogo: boolean;
  product: getProduct_node_Product | undefined;
  stationeryType: StationeryTypes | undefined;
  /** The fields for business cards */
  uploadedLogo: string;
  userClickedUploadLogo: (uploadedLogo: string) => void;
  userClickedDeleteLogo: () => void;
  /** The fields to be digested by the [DecreeSvgEditor] */
  productStationeryFields: SvgEditorElement[];
  paperSettingsForm: UseFormReturn<PaperSettingsFormState>;
  textSettingsForm: UseFormReturn<TextSettingsFormState>;
  notesCustomizerForm: UseFormReturn<NotesCustomizerFormValues>;
  envelopeCustomizerForm: UseFormReturn<EnvelopeSettingsFormState>;
  totalPrice: number;
  textSettingsOptions: TextSettingsOptions;
  paperSettingsOptions: PaperSettingsOptions;
  productRecommendations: getProductRecommendations_productRecommendations[];
  /** Saves svg changes to the [localStorage] */
  saveSvgChangesToStorage: (
    stringifiedNotes: string,
    stringifiedAttributes: string
  ) => void;
  /** Sets the reference to the new svg blob */
  setSvgBlob: (svgBlob: Blob) => void;
  setDefaultNotesValues: React.Dispatch<
    React.SetStateAction<NotesCustomizerFormValues | undefined>
  >;
  setProductStationeryFields: React.Dispatch<
    React.SetStateAction<SvgEditorElement[]>
  >;
  userAddedProductToCart: () => void;
  userClickedGetASample: () => void;
  userClickedReset: () => void;
  productVariantInfo: ProductVariantInfo;
  userChangedVariant: (
    e: React.ChangeEvent<HTMLSelectElement>,
    productOptionKey: string
  ) => void;
  envelopeData: ProductDataByHandle;
  envelopeCustomizerOptions: EnvelopeCustomizerOptions;
  sampleIsOnLimit: boolean;
  envelopePreviewImageSrc: string;
};

export const ProductCustomizationContainer =
  (Screen: React.VFC<ProductCustomizationProps>) => () => {
    const {services} = Environment.current();

    const {itemId: productId, productId: productTypeId} =
      useParams<{itemId: string; productId: string}>();
    const {search} = useLocation();
    const history = useHistory();
    const stationeryType = getProductStationeryType(productTypeId);

    // Reference to the edited svg
    const svgBlobRef = useRef<Blob | null>(null);

    /**
     * STATES
     */

    // See ProductCustomizationProps: productStationeryFields
    const [productStationeryFields, setProductStationeryFields] = useState<
      SvgEditorElement[]
    >([]);
    // See ProductCustomizationProps: defaultNotesValues
    const [defaultNotesValues, setDefaultNotesValues] =
      useState<NotesCustomizerFormValues>();
    const [isUploadingSvgFile, setIsUploadingSvgFile] = useState(false);
    const [productVariantIndex, setProductVariantIndex] = useState(0);
    const [productVariantInfo, setProductVariantInfo] =
      useState<ProductVariantInfo>({});
    const [envelopeVariantIndex, setEnvelopeVariantIndex] = useState(0);
    const [sampleIsOnLimit, setSampleIsOnLimit] = useState(false);
    const [uploadedLogo, setUploadedLogo] = useState<string>('');
    const [envelopePreviewImage, setEnvelopePreviewImage] =
      useState<string>('');

    /**
     * QUERY OPERATIONS
     */

    const {productData, loadingProductData} = useProductData(productId);
    const {productData: envelopeData, loadingProductData: loadingEnvelopeData} =
      useProductByHandleData(productHandles.envelope);
    const {
      productData: sampleStationeryData,
      loadingProductData: loadingSampleStationeryData,
    } = useProductByHandleData(productHandles.sample_stationery);

    const {checkoutData, loadingCheckoutData} = useCheckoutData();
    const {recommendationsData, loadingRecommendationsData} =
      useRelatedProductsData(productId);
    /**
     * VARIABLES
     */

    const lineItems = getLineItem({search, checkoutData});
    const productLineItem = lineItems?.productLineItem;
    const envelopeLineItem = lineItems?.envelopeLineItem;

    const isEditMode = !!search && !!productLineItem;
    const productStorageId = isEditMode
      ? productLineItem?.node.id
      : productData?.node.id;
    const svgTextValuesStorageKey = `svg_text_${productStorageId}`;
    const svgAttributesStorageKey = `svg_attributes_${productStorageId}`;
    const stringifiedSvgAttributes = isEditMode
      ? productLineItem?.node?.customAttributes?.[2]?.value
      : services.storage.getItem(svgAttributesStorageKey);
    const productSvgEditorAllowSaveToStorage =
      !services.storage.getItem(svgAttributesStorageKey) &&
      !services.storage.getItem(svgTextValuesStorageKey);

    const productHasLogo = !!productData?.node.tags.some(
      tag => tag === tags.LOGO
    );
    const productLineItemCustomAttributes =
      productLineItem?.node?.customAttributes;
    const uploadedLogoAttribute = _.find(
      productLineItemCustomAttributes,
      attribute => attribute.key === customAttributeFields.UPLOADED_LOGO
    );

    /**
     * FORMS
     */

    const paperSettingsOptions = getPaperSettingsOptions(
      productData?.node,
      true,
      productVariantIndex
    );
    const textSettingsOptions = getTextSettingsOptions(productData?.node);
    const envelopeCustomizerOptions = getEnvelopeOptions(
      envelopeData?.productByHandle,
      true,
      envelopeVariantIndex
    );
    const defaultPaperSettings = getDefaultPaperSettings(
      isEditMode,
      paperSettingsOptions,
      stringifiedSvgAttributes
    );
    const defaultTextSettings = getDefaultTextSettings(
      isEditMode,
      textSettingsOptions,
      stringifiedSvgAttributes
    );
    const defaultEnvelopeSettings = {
      envelopeColor:
        envelopeCustomizerOptions.envelopeColorList[0]?.value || '',
      liningColor: envelopeCustomizerOptions.liningColorList[0]?.value || '',
      quantity: envelopeCustomizerOptions.quantityList[0]?.value || '',
    };
    const paperSettingsForm = useForm<PaperSettingsFormState>({
      defaultValues: defaultPaperSettings,
    });
    const textSettingsForm = useForm<TextSettingsFormState>({
      defaultValues: defaultTextSettings,
    });
    const notesCustomizerForm = useForm<NotesCustomizerFormValues>({
      defaultValues: defaultNotesValues,
    });
    const envelopeCustomizerForm = useForm<EnvelopeSettingsFormState>({
      defaultValues: defaultEnvelopeSettings,
    });

    /**
     * MUTATION OPERATIONS
     */

    // Mutation to add a checkout line item
    const {addCheckoutLineItems, loadingCheckoutAddLineItems} =
      useAddCheckoutLineItems();
    // Mutation to update a checkout line item
    const {updateCheckoutLineItems, loadingCheckoutUpdateLineItems} =
      useUpdateCheckoutLineItems();
    // Mutation to create a checkout
    const {createCheckout, loadingCheckoutCreate} = useCreateCheckout();

    /**
     * EFFECTS
     */

    // Initializes an empty checkout if none exists yet
    useEffect(() => {
      if (!checkoutData?.node?.id) {
        createCheckout({
          variables: {input: {lineItems: []}},
        });
      }
    }, [loadingCheckoutData]);

    // [Edit mode]
    // Sets defaultNotesValues to the custom attributes of the product in the cart
    // We want the user when he/she clicks edit to show the SVG that is shown in the cart
    useEffect(() => {
      const stringifiedSvgTextValues =
        productLineItem?.node.customAttributes[1].value;
      if (!stringifiedSvgTextValues || !isEditMode) return;

      const parsedSvgTextValues = JSON.parse(stringifiedSvgTextValues) as {
        id: string;
        text: string;
      }[];

      // Transforms the array into an object that can be accepted by NotesCustomizerFormValues
      const svgValues = _.fromPairs(
        parsedSvgTextValues.map(e => [e.id, e.text])
      );
      setDefaultNotesValues(svgValues);
    }, [search]);

    // Bring to ordinary customization page if there's a search parameter
    // and no matching item can be found in the cart
    useEffect(() => {
      const shouldRedirect =
        search && !loadingCheckoutData && !productLineItem && !envelopeLineItem;

      if (shouldRedirect) {
        const url = routes.STORE__VIEW__PRODUCT_CUSTOMIZATION(
          productTypeId,
          productId
        );
        history.replace(url);
      }
    }, [search, loadingCheckoutData, productLineItem, envelopeLineItem]);

    // Redirects if no product was found
    useEffect(() => {
      if (!loadingProductData && !productData?.node?.id) {
        history.replace(routes.STORE__VIEW(weddingCategories[0].id));
      }
    }, [loadingProductData]);

    // Sets the default texts for the svg
    // If the svg is in the cart, the text will base off the value of the lineItems customized attributes
    useEffect(() => {
      if (isEditMode) {
        if (!defaultNotesValues) return;
        // [defaultNotesValues] will contain the texts from the checkout item
        setProductStationeryFields(
          Object.keys(defaultNotesValues).map(key => ({
            id: key,
            text: defaultNotesValues[key],
          }))
        );
      } else {
        const stationeryFieldValues = localStorage.getItem(
          svgTextValuesStorageKey
        );

        if (svgTextValuesStorageKey && stationeryFieldValues) {
          // Parsed fields will contain the text values saved in the storage
          const parsedStationeryFieldValues = JSON.parse(stationeryFieldValues);
          setProductStationeryFields(parsedStationeryFieldValues);
        }
      }
    }, [svgTextValuesStorageKey, defaultNotesValues]);

    // Reinitialize the default values after apollo is done querying the product
    // Also resets if url was changed meaning user clicked edit on a product in the cart
    // Default values are null since its based off the first element of the arrays
    useEffect(() => {
      paperSettingsForm.reset(defaultPaperSettings);
      textSettingsForm.reset(defaultTextSettings);
    }, [loadingProductData, search]);

    // Reinitializes default values after apollo is done querying the envelope data
    useEffect(() => {
      envelopeCustomizerForm.reset(defaultEnvelopeSettings);
    }, [loadingEnvelopeData, search]);

    // Reinitializes the uploaded logo if theres one saved
    useEffect(() => {
      if (typeof uploadedLogoAttribute?.value === 'string') {
        setUploadedLogo(uploadedLogoAttribute.value);
      }
    }, [search, uploadedLogoAttribute?.value]);

    useEffect(() => {
      let totalSamples = 0;
      checkoutData?.node?.lineItems.edges.forEach(item => {
        if (item.node.variant?.product.productType === productTypes.SAMPLE) {
          totalSamples += 1;
        }
      });

      setSampleIsOnLimit(totalSamples === 5);
    }, [checkoutData]);

    const watchEnvelopeColor = envelopeCustomizerForm.watch('envelopeColor');
    const watchLiningColor = envelopeCustomizerForm.watch('liningColor');

    const watchPaperQuantity = paperSettingsForm.watch('quantity');

    const loading =
      loadingProductData ||
      loadingCheckoutData ||
      loadingCheckoutAddLineItems ||
      loadingCheckoutUpdateLineItems ||
      isUploadingSvgFile ||
      loadingRecommendationsData ||
      loadingCheckoutCreate ||
      loadingEnvelopeData ||
      loadingSampleStationeryData;

    useEffect(() => {
      // handles the change in variant of envelope if the user changes envelope color / lining color
      const envelopeColorTitle =
        envelopeCustomizerOptions.envelopeColorList.find(
          item => item.value === watchEnvelopeColor
        );
      const liningColorTitle = envelopeCustomizerOptions.liningColorList.find(
        item => item.value === watchLiningColor
      );
      const newVariantIndex =
        envelopeData?.productByHandle.variants.edges.findIndex(
          item =>
            item.node.title ===
            `${envelopeColorTitle?.name} / ${liningColorTitle?.name}`
        );

      setEnvelopePreviewImage(
        envelopeData?.productByHandle.variants.edges[newVariantIndex || 0].node
          .image?.originalSrc || ''
      );
      setEnvelopeVariantIndex(newVariantIndex || 0);
    }, [watchEnvelopeColor, watchLiningColor]);

    useEffect(() => {
      // handles the change for the product variant index
      if (Object.keys(productVariantInfo).length && productData?.node) {
        const selectedProductOptions: string[] = [];
        productData?.node.options.forEach(option => {
          selectedProductOptions.push(
            productVariantInfo[option.name] || option.values[0]
          );
        });

        const newVariantIndex = productData?.node.variants.edges.findIndex(
          item => item.node.title === selectedProductOptions.join(' / ')
        );

        setProductVariantIndex(newVariantIndex >= 0 ? newVariantIndex : 0);
      }
    }, [productVariantInfo]);

    useEffect(() => {
      if (watchPaperQuantity) {
        setProductVariantInfo(prev => ({...prev, Tier: watchPaperQuantity}));
      }
    }, [watchPaperQuantity]);

    return (
      <Screen
        loading={loading}
        uploadedLogo={uploadedLogo}
        stationeryType={stationeryType}
        productHasLogo={productHasLogo}
        productSvgEditorAllowSaveToStorage={productSvgEditorAllowSaveToStorage}
        isEditMode={isEditMode}
        product={productData?.node}
        productStationeryFields={productStationeryFields}
        paperSettingsForm={paperSettingsForm}
        textSettingsForm={textSettingsForm}
        notesCustomizerForm={notesCustomizerForm}
        totalPrice={
          getProductTotalPrice({
            product: productData?.node,
            settingsForm: paperSettingsForm,
            variantIndex: productVariantIndex,
          }) +
          getProductTotalPrice({
            product: envelopeData?.productByHandle,
            settingsForm: envelopeCustomizerForm,
            variantIndex: envelopeVariantIndex,
          })
        }
        paperSettingsOptions={paperSettingsOptions}
        textSettingsOptions={textSettingsOptions}
        productRecommendations={
          recommendationsData?.productRecommendations || []
        }
        saveSvgChangesToStorage={(stringifiedNotes, stringifiedAttributes) => {
          services.storage.storeItem(svgTextValuesStorageKey, stringifiedNotes);
          services.storage.storeItem(
            svgAttributesStorageKey,
            stringifiedAttributes
          );
        }}
        setSvgBlob={svgBlob => {
          svgBlobRef.current = svgBlob;
        }}
        userClickedUploadLogo={uploadedLogo => {
          setUploadedLogo(uploadedLogo);
        }}
        userClickedDeleteLogo={() => {
          setUploadedLogo('');
        }}
        setDefaultNotesValues={setDefaultNotesValues}
        setProductStationeryFields={setProductStationeryFields}
        userAddedProductToCart={async () => {
          if (loading) return;
          const productVariantId =
            productData?.node?.variants.edges[productVariantIndex]?.node.id ||
            '';
          const envelopeVariantId =
            envelopeData?.productByHandle.variants.edges[envelopeVariantIndex]
              .node.id || '';
          const errMessage =
            'Failed to add to cart. Refresh the page & try again.';

          if (!svgBlobRef.current) {
            toast.error(errMessage);
            return;
          }

          // 1. Trigger [isUploading] so user cant add to cart again while uploading
          setIsUploadingSvgFile(true);

          try {
            // 2. Upload the svg
            const svgUrl = await services.cloud.uploadSvg(svgBlobRef.current);

            const savedTextValues = services.storage.getItem(
              svgTextValuesStorageKey
            );
            const savedSvgAttributes = services.storage.getItem(
              svgAttributesStorageKey
            );

            // 3. Check if all necessary variables are defined
            if (
              !savedTextValues ||
              !savedSvgAttributes ||
              !defaultNotesValues ||
              !svgUrl ||
              !productVariantId ||
              !checkoutData?.node.id
            ) {
              toast.error(errMessage);
              return;
            }

            const stationeryFields = Object.keys(defaultNotesValues).map(
              key => ({
                id: key,
                text: defaultNotesValues![key],
              })
            );

            const svgTextValues =
              savedTextValues === '[]'
                ? JSON.stringify(stationeryFields)
                : savedTextValues;

            const googleClientId = await getGoogleClientId();

            // Placed this outside since custom attributes or update and add are the same
            const productCustomAttributes: AttributeInput[] = [
              {key: customAttributeFields.SVG_FILE, value: svgUrl},
              {key: customAttributeFields.SVG_TEXT, value: svgTextValues},
              {
                key: customAttributeFields.SVG_ATTRIBUTES,
                value: savedSvgAttributes,
              },
              {
                key: customAttributeFields.GOOGLE_CLIENT_ID,
                value: googleClientId,
              },
            ];

            if (productHasLogo) {
              const bucketUrl = 's3.amazonaws.com';

              // No changes were made if it matches bucket url or if its empty
              if (!uploadedLogo || uploadedLogo.includes(bucketUrl)) {
                productCustomAttributes.push({
                  key: customAttributeFields.UPLOADED_LOGO,
                  value: uploadedLogo,
                });
              } else {
                // Turn file base64 into blob
                const logoData = await fetch(uploadedLogo as RequestInfo);
                const logoBlob = await logoData.blob();

                // Upload blob to cloud
                const logoLink = await services.cloud.uploadIcon(logoBlob);

                productCustomAttributes.push({
                  key: customAttributeFields.UPLOADED_LOGO,
                  value: logoLink,
                });
              }
            }

            setIsUploadingSvgFile(false);

            const envelopeCustomAttributes = [
              {key: customAttributeFields.PARENT_SVG_FILE, value: svgUrl},
              {
                key: customAttributeFields.GOOGLE_CLIENT_ID,
                value: googleClientId,
              },
            ];

            // 4. Add or update the item in the cart
            if (isEditMode) {
              const oldCustomAttributes =
                productLineItemCustomAttributes?.map(({key, value}) => ({
                  key,
                  value,
                })) || [];

              const shipment = checkoutData?.node.lineItems.edges.find(edge =>
                edge.node.customAttributes.some(
                  attr =>
                    attr.key === '_parent' &&
                    attr.value === productLineItem?.node.id
                )
              );

              const lineItems: CheckoutLineItemUpdateInput[] = [
                {
                  id: productLineItem?.node.id,
                  variantId: productVariantId,
                  quantity: parseInt(paperSettingsForm.getValues().quantity),
                  customAttributes: [
                    ...(oldCustomAttributes as AttributeInput[]),
                    ...productCustomAttributes,
                  ],
                },
                // turn off envelope
                ...((stationeryType !== StationeryTypes.BUSINESS && [
                  {
                    id: envelopeLineItem?.node.id,
                    variantId: envelopeVariantId,
                    quantity: parseInt(
                      envelopeCustomizerForm.getValues().quantity
                    ),
                    customAttributes: envelopeCustomAttributes,
                  },
                ]) ||
                  []),
              ];

              if (shipment?.node) {
                lineItems.push({
                  id: shipment.node.id,
                  quantity: parseInt(paperSettingsForm.getValues().quantity),
                });
              }

              const {errors, data} = await updateCheckoutLineItems({
                variables: {
                  checkoutId: checkoutData.node.id,
                  lineItems,
                },
              });

              const hasUpdateErrors =
                errors ||
                !_.isEmpty(data?.checkoutLineItemsUpdate?.checkoutUserErrors);

              // Redirects to new url if no errors since the route is dependent on the svg id
              if (!hasUpdateErrors) {
                const svgFileId = _.last(svgUrl.split('/'));
                history.push({
                  pathname: routes.STORE__VIEW__PRODUCT_CUSTOMIZATION(
                    productTypeId,
                    productId
                  ),
                  search: `id=${svgFileId}`,
                });
              }
            } else {
              await addCheckoutLineItems({
                variables: {
                  checkoutId: checkoutData.node.id,
                  lineItems: [
                    {
                      variantId: productVariantId,
                      quantity: parseInt(
                        paperSettingsForm.getValues().quantity
                      ),
                      customAttributes: productCustomAttributes,
                    },
                    // turn off envelope
                    ...((stationeryType !== StationeryTypes.BUSINESS && [
                      {
                        variantId: envelopeVariantId,
                        quantity: parseInt(
                          envelopeCustomizerForm.getValues().quantity
                        ),
                        customAttributes: envelopeCustomAttributes,
                      },
                    ]) ||
                      []),
                  ],
                },
              });
            }
          } catch (e) {
            toast.error(errMessage);
            setIsUploadingSvgFile(false);
          }
          setUploadedLogo('');
        }}
        userClickedGetASample={async () => {
          if (loading) return;

          const sampleIsOnLimitErrMessage =
            'You have reached your maximum of 5 samples.';

          if (sampleIsOnLimit) return toast.error(sampleIsOnLimitErrMessage);

          const variantId =
            sampleStationeryData?.productByHandle?.variants.edges[0].node.id ||
            '';
          const svgFile = productData?.node?.description;
          const errMessage =
            'Failed to add to cart. Refresh the page & try again.';

          if (
            !checkoutData?.node.id ||
            !variantId ||
            !svgFile ||
            !svgBlobRef.current
          ) {
            toast.error(errMessage);
            return;
          }

          setIsUploadingSvgFile(true);

          try {
            const svgUrl = await services.cloud.uploadSvg(svgBlobRef.current);

            setIsUploadingSvgFile(false);

            const savedTextValues = services.storage.getItem(
              svgTextValuesStorageKey
            );
            const savedSvgAttributes = services.storage.getItem(
              svgAttributesStorageKey
            );

            if (
              !savedTextValues ||
              !savedSvgAttributes ||
              !defaultNotesValues ||
              !svgUrl
            ) {
              toast.error(errMessage);
              return;
            }

            const stationeryFields = Object.keys(defaultNotesValues).map(
              key => ({
                id: key,
                text: defaultNotesValues![key],
              })
            );

            const svgTextValues =
              savedTextValues === '[]'
                ? JSON.stringify(stationeryFields)
                : savedTextValues;

            const googleClientId = await getGoogleClientId();

            const sampleStationeryCustomAttributes = [
              {key: customAttributeFields.SVG_FILE, value: svgUrl},
              {key: customAttributeFields.SVG_TEXT, value: svgTextValues},
              {
                key: customAttributeFields.SVG_ATTRIBUTES,
                value: savedSvgAttributes,
              },
              {key: customAttributeFields.PARENT_PRODUCT_ID, value: productId},
              {
                key: customAttributeFields.GOOGLE_CLIENT_ID,
                value: googleClientId,
              },
            ];

            addCheckoutLineItems({
              variables: {
                checkoutId: checkoutData.node.id,
                lineItems: [
                  {
                    variantId,
                    quantity: 1,
                    customAttributes: sampleStationeryCustomAttributes,
                  },
                ],
              },
            });
          } catch (error) {
            toast.error(errMessage);
            setIsUploadingSvgFile(false);
          }
        }}
        userClickedReset={() => {
          paperSettingsForm.reset(
            getResetPaperSettings(
              isEditMode,
              paperSettingsOptions,
              stringifiedSvgAttributes
            )
          );
          textSettingsForm.reset(
            getResetTextSettings(
              isEditMode,
              textSettingsOptions,
              stringifiedSvgAttributes
            )
          );
          notesCustomizerForm.reset(defaultNotesValues);

          const notesCustomizerFormState = notesCustomizerForm.getValues();
          setProductStationeryFields(
            Object.keys(notesCustomizerFormState).map(key => ({
              id: key,
              text: notesCustomizerFormState[key],
            }))
          );

          if (productHasLogo) {
            setUploadedLogo('');
          }
        }}
        productVariantInfo={productVariantInfo}
        userChangedVariant={(e, productOptionKey) => {
          const productOptionValue = e.target.value;
          setProductVariantInfo((prev: ProductVariantInfo) => ({
            ...prev,
            [productOptionKey]: productOptionValue,
          }));
        }}
        envelopeData={envelopeData}
        envelopeCustomizerOptions={envelopeCustomizerOptions}
        envelopeCustomizerForm={envelopeCustomizerForm}
        sampleIsOnLimit={sampleIsOnLimit}
        envelopePreviewImageSrc={envelopePreviewImage}
      />
    );
  };
