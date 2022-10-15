/* eslint-disable node/no-unsupported-features/es-builtins */
import React, {useEffect, useRef, useState} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {useHistory, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {CheckoutLineItemInput} from '../../../../__generated__/globalTypes';
import {getPackage_node_Collection} from '../../../api/operations/queries/__generated__/getPackage';
import {getProductRecommendations_productRecommendations} from '../../../api/operations/queries/__generated__/getProductRecommendations';
import {Environment} from '../../../Environment';
import {routes} from '../../../route-list';
import {customAttributeFields} from '../../../utils/constants/custom-attribute.constants';
import {weddingProductTypes} from '../../../utils/constants/store.contants';
import {getGoogleClientId} from '../../../utils/get-google-client-id';
import {
  useAddCheckoutLineItems,
  useCreateCheckout,
} from '../../../utils/hooks/mutation-hooks';
import {
  useCheckoutData,
  usePackageData,
  useRelatedProductsData,
} from '../../../utils/hooks/query-hooks';
import {SvgEditorElement} from '../../core/DecreeSvgEditor';
import {NotesCustomizerFormValues} from '../components/shared/sections/NotesCustomizer';
import {MonogramFormState} from '../models/MonogramFormState';
import {PackageProduct} from '../models/PackageProduct';
import {PaperSettingsFormState} from '../models/PaperSettingsFormState';
import {PaperSettingsOptions} from '../models/PaperSettingsOptions';
import {SettingOption} from '../models/SettingOption';
import {TextSettingsFormState} from '../models/TextSettingsFormState';
import {TextSettingsOptions} from '../models/TextSettingsOptions';
import {getDefaultPaperSettings} from './helpers/get-default-paper-settings';
import {getDefaultTextSettings} from './helpers/get-default-text-settings';
import {
  getPackagePaperSettingsOptions,
  getPackageTextSettingsOptions,
  getPackageVariantsIntersection,
} from './helpers/get-package-settings';
import {getPackageTotalPrice} from './helpers/get-total-price';

export type PackageCustomizationProps = {
  package: getPackage_node_Collection | undefined;
  /** The list of products in a package */
  packageProducts: PackageProduct[];
  /** The index of the product that is currently being customized */
  currentProductIndex: number;
  /** Set of product package indices that should show the "Edit" button or allow edit */
  shownPackageProductIndices: Set<number>;
  /** The state of the modal for customizing a single product of a package */
  isPackageProductModalOpen: boolean;
  loading: boolean;
  totalPrice: number;
  /**is the collection a wax seal */
  isWaxSeal?: boolean;
  showWaxSealPersonalization?: boolean;
  paperSettingsForm: UseFormReturn<PaperSettingsFormState>;
  monogramForm: UseFormReturn<MonogramFormState>;
  textSettingsForm: UseFormReturn<TextSettingsFormState>;
  textSettingsOptions: TextSettingsOptions;
  paperSettingsOptions: PaperSettingsOptions;
  /** Reference to the svg blob being edited on the package product customization modal */
  currentPackageProductSvgBlob: Blob | null;
  packageProductNotesCustomizationForm: UseFormReturn<NotesCustomizerFormValues>;
  /** The fields to be digested by the [DecreeSvgEditor] for package products */
  packageProductStationaryFields: SvgEditorElement[];
  productRecommendations: getProductRecommendations_productRecommendations[];
  setCurrentPackageProductSvgBlob: (svgBlob: Blob | null) => void;
  setPackageProductsStationaryFields: React.Dispatch<
    React.SetStateAction<SvgEditorElement[]>
  >;
  /** The handler for when the user clicks on a product thumbnail in [PackageDesigner] or "Edit" button in [PackageSettings] */
  userClickedPackageProductEdit: (productIndex: number) => void;
  userAddedPackageToCart: () => void;
  userClosedPackageProductModal: () => void;
  /**
   * A handler for when the user decides to update the current product
   * on the modal for customizing a single product in a package
   * */
  userUpdatedCurrentPackageProduct: (payload: {
    quantityPreset: SettingOption;
    productVariantIndex: number;
  }) => void;
  userClickedReset: () => void;
  userClickedPersonalizeWaxSeal?: () => void;
  userClickedClearWaxSeal?: () => void;
  variantsIntersection: string[];
  selectedVariantsIntersection: string;
  userSelectedVariantsIntersection: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

export const PackageCustomizationContainer =
  (Screen: React.VFC<PackageCustomizationProps>) => () => {
    const {services} = Environment.current();

    const {packageId} = useParams<{packageId: string}>();
    const history = useHistory();

    // See PackageCustomizationProps: currentPackageProductSvgBlob
    const currentPackageProductSvgBlob = useRef<Blob | null>(null);

    /**
     * STATES
     */

    // See PackageCustomizationProps: packageProducts
    const [packageProducts, setPackageProducts] = useState<PackageProduct[]>(
      []
    );
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    // See PackageCustomizationProps: shownPackageProductIndices
    const [shownPackageProductIndices, setShownPackageProductIndices] =
      useState<Set<number>>(new Set([0]));
    // See PackageCustomizationProps: isPackageProductModalOpen
    const [isPackageProductModalOpen, setIsPackageProductModalOpen] =
      useState(false);
    const [isUploadingSvgFiles, setIsUploadingSvgFiles] = useState(false);
    // See PackageCustomizationProps: packageProductStationaryFields
    const [packageProductStationaryFields, setPackageProductsStationaryFields] =
      useState<SvgEditorElement[]>([]);
    const [showWaxSealPersonalization, setShowWaxSealPersonalization] =
      useState<boolean>(false);
    const [selectedVariantsIntersection, setSelectedVariantsIntersection] =
      useState<string>('');

    /**
     * QUERY OPERATIONS
     */

    const {packageData, loadingPackageData} = usePackageData(packageId, {
      skip: false,
      // Populates [packageProducts] after it completes fetching
      onCompleted: data => {
        const products = data?.node.products?.edges;
        setPackageProducts(
          products?.map(product => ({node: product.node})) || []
        );
      },
    });
    const {checkoutData, loadingCheckoutData} = useCheckoutData();
    const {recommendationsData, loadingRecommendationsData} =
      useRelatedProductsData(packageId);

    /**
     * FORMS
     */
    const variantsIntersection = getPackageVariantsIntersection(
      packageData?.node.products
    );
    const paperSettingsOptions = getPackagePaperSettingsOptions(
      packageData?.node.products
    );
    const textSettingsOptions = getPackageTextSettingsOptions(
      packageData?.node.products
    );

    const defaultPaperSettings = getDefaultPaperSettings(
      false,
      paperSettingsOptions
    );
    const defaultTextSettings = getDefaultTextSettings(
      false,
      textSettingsOptions
    );
    const defaultMonogramForm = {
      text1: 'A',
      text2: '',
      text3: '',
    };

    const paperSettingsForm = useForm<PaperSettingsFormState>({
      defaultValues: defaultPaperSettings,
    });
    const textSettingsForm = useForm<TextSettingsFormState>({
      defaultValues: defaultTextSettings,
    });
    const monogramForm = useForm<MonogramFormState>({
      defaultValues: defaultMonogramForm,
    });
    const packageProductNotesCustomizationForm =
      useForm<NotesCustomizerFormValues>();

    /**
     * MUTATION OPERATIONS
     */

    // Mutation to add a checkout line item
    const {addCheckoutLineItems, loadingCheckoutAddLineItems} =
      useAddCheckoutLineItems({
        onSuccess: () => {
          // After a successful add to cart operation,
          // reset the package products to default
          resetPackageEdit();
        },
      });
    // Mutation to create a checkout
    const {createCheckout, loadingCheckoutCreate} = useCreateCheckout();

    /**
     * EFFECTS
     */

    // Initializes an empty checkout if none exists yet
    useEffect(() => {
      if (!checkoutData?.node.id) {
        createCheckout({
          variables: {input: {lineItems: []}},
        });
      }
    }, [loadingCheckoutData]);

    // Redirects if no package was found
    useEffect(() => {
      if (!loadingPackageData && !packageData?.node?.id) {
        history.replace(routes.STORE__VIEW(weddingProductTypes.PACKAGE));
      }
    }, [loadingPackageData]);

    // Reinitializes form values
    useEffect(() => {
      if (!loadingPackageData) {
        paperSettingsForm.reset(defaultPaperSettings);
        textSettingsForm.reset(defaultTextSettings);
      }
    }, [loadingPackageData]);

    const resetPackageEdit = () => {
      // 1. Reset reference to svg blob
      currentPackageProductSvgBlob.current = null;
      // 2. Reset form with stationary fields for [NotesCustomizer]
      packageProductNotesCustomizationForm.reset();
      // 3. Reset form with stationary fields for [DecreeSvgEditor]
      setPackageProductsStationaryFields([]);
      // 4. Reset shown product indices
      setShownPackageProductIndices(new Set([0]));
      // 5. Reset current product index
      setCurrentProductIndex(0);
      // 6. Reset package products
      const products = packageData?.node.products?.edges || [];
      setPackageProducts(products?.map(product => ({node: product.node})));
      // 7. for wax seals
      if (packageData?.node?.collection_type?.value === 'WAX_SEAL') {
        setShowWaxSealPersonalization(false);
        paperSettingsForm.reset(defaultPaperSettings);
        textSettingsForm.reset(defaultTextSettings);
        monogramForm.reset(defaultMonogramForm);
      }
    };

    return (
      <Screen
        package={packageData?.node}
        packageProducts={packageProducts}
        currentProductIndex={currentProductIndex}
        shownPackageProductIndices={shownPackageProductIndices}
        isPackageProductModalOpen={isPackageProductModalOpen}
        loading={
          loadingPackageData ||
          loadingCheckoutData ||
          loadingCheckoutAddLineItems ||
          isUploadingSvgFiles ||
          loadingRecommendationsData ||
          loadingCheckoutCreate
        }
        totalPrice={getPackageTotalPrice({
          packageProducts,
          fallbackQuantity: parseInt(
            paperSettingsOptions.quantityList[0]?.value || '0'
          ),
        })}
        isWaxSeal={packageData?.node?.collection_type?.value === 'WAX_SEAL'}
        showWaxSealPersonalization={showWaxSealPersonalization}
        paperSettingsForm={paperSettingsForm}
        monogramForm={monogramForm}
        textSettingsForm={textSettingsForm}
        paperSettingsOptions={paperSettingsOptions}
        textSettingsOptions={textSettingsOptions}
        currentPackageProductSvgBlob={currentPackageProductSvgBlob.current}
        packageProductNotesCustomizationForm={
          packageProductNotesCustomizationForm
        }
        packageProductStationaryFields={packageProductStationaryFields}
        productRecommendations={
          recommendationsData?.productRecommendations || []
        }
        setCurrentPackageProductSvgBlob={svgBlob => {
          currentPackageProductSvgBlob.current = svgBlob;
        }}
        setPackageProductsStationaryFields={setPackageProductsStationaryFields}
        userClickedPackageProductEdit={(productIndex: number) => {
          setIsPackageProductModalOpen(true);
          // Prefill package product modal with existing [NotesCustomizer] values for the selected product
          packageProductNotesCustomizationForm.reset(
            packageProducts[productIndex].modifiedSvgCustomizationValues
          );
          setCurrentProductIndex(productIndex);
        }}
        userAddedPackageToCart={async () => {
          if (!checkoutData) {
            toast.error(
              'Failed to add package to cart. Please refresh the page & try again!'
            );
            return;
          }

          const validProducts = packageProducts.filter(
            product => product.modifiedSvg && product.quantityPreset
          );

          if (validProducts.length < packageProducts.length) {
            if (packageData?.node?.collection_type?.value === 'WAX_SEAL') {
              return toast.error(
                'You must save the designed wax seal before adding to cart'
              );
            }
            toast.error('You must edit all products before adding to cart');
            return;
          }

          setIsUploadingSvgFiles(true);

          const svgUploadRequests = validProducts.map(product => {
            if (product.modifiedSvg) {
              return services.cloud.uploadSvg(product.modifiedSvg);
            }
          });

          // 1. Upload all svgs
          const uploadResults = await Promise.allSettled(svgUploadRequests);

          // 2. Associate upload results with its product
          const uploadsAssociatedWithProducts = uploadResults.map(
            (result, i) => ({...result, packageProduct: packageProducts[i]})
          );

          // 3. Get rejected uploads
          const productsWithRejectedUploads = uploadsAssociatedWithProducts
            .map(item => {
              if (item.status === 'rejected') {
                return {
                  ...item.packageProduct,
                  rejectReason: item.reason,
                };
              }
            })
            .filter(item => item);

          // 4.a Unhappy path
          // If there are rejected uploads, cancel the whole transaction
          if (productsWithRejectedUploads.length) {
            toast.error(
              'Failed to add package to cart: Some SVG files failed to upload. Please try again!'
            );
            // TODO: Also delete file uploads in this case
            return;
          }

          // 4.b Happy path
          // Get successful uploads
          const productsWithSuccessfulUploads = uploadsAssociatedWithProducts
            .map(item => {
              if (item.status === 'fulfilled') {
                return {
                  ...item.packageProduct,
                  uploadedSvg: item.value as unknown as string,
                };
              }
            })
            .filter(item => item);

          const googleClientId = await getGoogleClientId();

          // 5. Generate line items for the checkout
          const packageTitle = packageData?.node.title || '';
          const lineItems: CheckoutLineItemInput[] =
            productsWithSuccessfulUploads.map(item => {
              // We know for sure that [item] exists since we're filtering [productsWithSuccessfulUploads] above
              const product = item!;
              return {
                // We know for sure that [item] exists since we're filtering [validProducts] above
                quantity: parseInt(product.quantityPreset!.value),
                variantId:
                  product.node.variants.edges[item?.productVariantIndex || 0]
                    .node.id,
                customAttributes: [
                  {
                    key: customAttributeFields.SVG_FILE,
                    value: product.uploadedSvg,
                  },
                  {
                    key: customAttributeFields.IS_PART_OF_BUNDLE,
                    value: packageTitle,
                  },
                  {
                    key: customAttributeFields.SELECTED_VARIANTS_UNION,
                    value:
                      selectedVariantsIntersection ||
                      variantsIntersection?.[0] ||
                      '',
                  },
                  {
                    key: customAttributeFields.GOOGLE_CLIENT_ID,
                    value: googleClientId,
                  },
                ],
              };
            });

          setIsUploadingSvgFiles(false);

          // 6. Create a checkout for all line items in the package
          addCheckoutLineItems({
            variables: {
              checkoutId: checkoutData?.node.id,
              lineItems,
            },
          });
        }}
        userClosedPackageProductModal={() =>
          setIsPackageProductModalOpen(false)
        }
        userUpdatedCurrentPackageProduct={payload => {
          // Saving an edited product flow:
          // 1. Update quantity of product in the array
          setPackageProducts(list =>
            list.map((product, i) => {
              return currentProductIndex === i
                ? {
                    ...product,
                    ...payload,
                    modifiedSvg: currentPackageProductSvgBlob.current,
                    modifiedSvgCustomizationValues:
                      packageProductNotesCustomizationForm.getValues(),
                  }
                : product;
            })
          );
          // 1.1 Reset reference to svg blob
          currentPackageProductSvgBlob.current = null;
          // 1.2 Reset form with stationary fields for [NotesCustomizer]
          packageProductNotesCustomizationForm.reset();
          // 1.3 Reset form with stationary fields for [DecreeSvgEditor]
          setPackageProductsStationaryFields([]);
          // 2. Show the edit button in the next product
          setShownPackageProductIndices(prevSet =>
            prevSet.add(currentProductIndex + 1)
          );
          // 2.1. Proceed to next product in line
          setCurrentProductIndex(prevIndex => {
            const nextIndex = prevIndex + 1;
            if (nextIndex < packageProducts.length) {
              return nextIndex;
            }
            return 0;
          });
          // 3. Close modal
          setIsPackageProductModalOpen(false);
        }}
        userClickedReset={resetPackageEdit}
        userClickedPersonalizeWaxSeal={() => {
          setShowWaxSealPersonalization(true);
        }}
        userClickedClearWaxSeal={() => {
          monogramForm.setValue('text1', '');
          monogramForm.setValue('text2', '');
          monogramForm.setValue('text3', '');
        }}
        variantsIntersection={variantsIntersection}
        selectedVariantsIntersection={selectedVariantsIntersection}
        userSelectedVariantsIntersection={e => {
          setSelectedVariantsIntersection(e.target.value);
        }}
      />
    );
  };
