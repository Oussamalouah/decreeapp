import clsx from 'clsx';
import React, {useState} from 'react';
import {useWatch} from 'react-hook-form';
import {toast} from 'react-toastify';
import {images} from '../../../assets/images';
import {laptopWidth} from '../../../utils/constants/screen-width.constants';
import {formatPrice} from '../../../utils/format-price';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeDropdown} from '../../core/DecreeDropdown';
import {DecreeSvgEditor} from '../../core/DecreeSvgEditor';
import {DecreeText} from '../../core/DecreeText';
import {HandleWindowResize} from '../../core/HandleWindowResize';
import {getParsedProductDescription} from '../containers/helpers/get-product-description';
import {PackageCustomizationProps} from '../containers/PackageCustomizationContainer';
import {PackageProduct} from '../models/PackageProduct';
import {PackagePersonalizationMobileScreen} from './PackagePersonalizationMobileScreen';
import {
  CustomizationLayout,
  CustomizationLayoutGrid,
} from './shared/customization-layout.components';
import {GridFieldItem} from './shared/GridFieldItem';
import {
  NotesCustomizer,
  NotesCustomizerFormValues,
} from './shared/sections/NotesCustomizer';
import {PackageCustomizerModal} from './shared/sections/PackageCustomizerModal';
import {PackageDesigner} from './shared/sections/PackageDesigner';
import {PackageSettings} from './shared/sections/PackageSettings';
import {PaperCustomizer} from './shared/sections/PaperCustomizer';
import {Recommendations} from './shared/sections/Recommendations';
import {TextSettings} from './shared/sections/TextSettings';
import {WaxSealCustomizer} from './shared/sections/WaxSealCustomizer';
import {WaxSealsDesigner} from './shared/sections/WaxSealsDesigner';
import {productTypes} from '../../../utils/constants/product-type.constants';

export const PackageCustomizationScreen = (
  props: PackageCustomizationProps
) => {
  // Ephemeral state
  const [isMobilePersonalizationShown, setIsMobilePersonalizationShown] =
    useState(false);
  const [isLaptopWidth, setIsLaptopWidth] = useState(
    window.innerWidth >= laptopWidth
  );

  const [productVariantIndex, setProductVariantIndex] = useState(0);
  const [isWaxSealVisible, setIsWaxSealVisible] = useState(false);
  const [waxSealId, setWaxSealId] = useState('');

  const currentPackageProduct = props.packageProducts[
    props.currentProductIndex
  ] as PackageProduct | undefined;

  const currentPackageProductSvgUrl =
    (currentPackageProduct?.modifiedSvg
      ? // eslint-disable-next-line node/no-unsupported-features/node-builtins
        URL.createObjectURL(currentPackageProduct?.modifiedSvg)
      : // The `description` field serves as svg source for now
        getParsedProductDescription(currentPackageProduct?.node.description)
          .imageLinks[0]) || images.decree_blue_logo;

  const watchedFontColor = useWatch({
    name: 'fontColor',
    control: props.textSettingsForm.control,
  });
  const watchedFontSize = useWatch({
    name: 'fontSize',
    control: props.textSettingsForm.control,
  });
  const watchedPaperColor = useWatch({
    name: 'paperColor',
    control: props.paperSettingsForm.control,
  });
  const watchedFontFamily = useWatch({
    name: 'font',
    control: props.textSettingsForm.control,
  });

  const watchedMonogramText1 = useWatch({
    name: 'text1',
    control: props.monogramForm.control,
  });
  const watchedMonogramText2 = useWatch({
    name: 'text2',
    control: props.monogramForm.control,
  });
  const watchedMonogramText3 = useWatch({
    name: 'text3',
    control: props.monogramForm.control,
  });

  const svgEditorAttributes = props.isWaxSeal
    ? {
        fontSize: watchedFontSize,
        fontFamily: watchedFontFamily,
        paperColor: watchedFontColor, // Used font color so I can just use text settings without editing it
        waxSealMonogram:
          watchedMonogramText1 + watchedMonogramText2 + watchedMonogramText3,
      }
    : {
        fontColor: watchedFontColor,
        paperColor: watchedPaperColor,
      };

  const filteredRecommendations = props.productRecommendations.filter(
    product =>
      !Object.values(productTypes)
        .filter(value => value !== productTypes.BE_SPOKE)
        .includes(product?.productType as productTypes)
  );

  return (
    <>
      <HandleWindowResize
        onResize={() => setIsLaptopWidth(window.innerWidth >= laptopWidth)}
      />
      <CustomizationLayout breadcrumbTag="Bundles" productType="Packages">
        {isMobilePersonalizationShown && !isLaptopWidth ? (
          <PackagePersonalizationMobileScreen
            {...props}
            productPrice={
              currentPackageProduct?.node.variants.edges[productVariantIndex]
                .node.priceV2.amount
            }
            quantityOptions={props.paperSettingsOptions.quantityList}
            userClickedClose={() => setIsMobilePersonalizationShown(false)}
          />
        ) : (
          <CustomizationLayoutGrid
            leftColumn={
              <>
                {/* Package thumbnail */}
                <div
                  className={clsx([
                    'flex flex-col -mx-4 space-y-7 laptop:mx-0',
                    {hidden: isWaxSealVisible && !isLaptopWidth},
                  ])}
                >
                  <div
                    className="relative flex items-center justify-center w-full px-6 bg-offwhite py-7"
                    style={{aspectRatio: '712/537'}}
                  >
                    {!props.showWaxSealPersonalization ? (
                      <img
                        className="object-contain"
                        src={
                          props.package?.image?.originalSrc ||
                          images.decree_blue_logo
                        }
                      />
                    ) : (
                      <DecreeSvgEditor
                        isWaxSeal={true}
                        svgUrl={currentPackageProductSvgUrl}
                        elements={props.packageProductStationaryFields}
                        attributes={{
                          ...svgEditorAttributes,
                          waxSealMonogram:
                            watchedMonogramText1 +
                            watchedMonogramText2 +
                            watchedMonogramText3,
                        }}
                        onSetSvgBlob={data => {
                          props.setCurrentPackageProductSvgBlob(data);
                        }}
                      />
                    )}
                  </div>
                  {!props.isWaxSeal && (
                    <DecreeButton
                      className="self-center laptop:hidden"
                      type="button"
                      onClick={() => setIsMobilePersonalizationShown(true)}
                    >
                      Customize
                    </DecreeButton>
                  )}
                </div>

                {/* Package designer only shown in desktop */}
                <div className="hidden laptop:block">
                  {(!props.isWaxSeal && (
                    <PackageDesigner
                      items={props.packageProducts}
                      currentProductIndex={props.currentProductIndex}
                      shownProductEditButtonIndices={
                        props.shownPackageProductIndices
                      }
                      onProductClick={props.userClickedPackageProductEdit}
                    />
                  )) || (
                    <WaxSealsDesigner
                      containerClassName="px-8 py-5 space-y-6"
                      titleClassName="space-y-6"
                      innerFormClassName="space-y-10"
                      form={props.monogramForm}
                      userClickedPreviewMonogram={() => {
                        props.userUpdatedCurrentPackageProduct({
                          quantityPreset:
                            currentPackageProduct?.quantityPreset ||
                            props.paperSettingsOptions.quantityList[0],
                          productVariantIndex,
                        });
                        toast.success('Wax Seal Design Saved!');
                      }}
                      userClickedClearWaxSeal={props.userClickedClearWaxSeal}
                      savingDisabled={!props.showWaxSealPersonalization}
                    />
                  )}
                </div>
              </>
            }
            rightColumn={
              <>
                {/* Title + Subtitle */}
                <div
                  className={clsx([
                    'text-center laptop:text-left',
                    {hidden: isWaxSealVisible && !isLaptopWidth},
                  ])}
                >
                  <DecreeText
                    size={23}
                    className="font-serif font-bold text-blue-dark"
                  >
                    {props.package?.title || '-'}
                  </DecreeText>
                  <DecreeText
                    size={14}
                    className="font-serif text-gold font-bold tracking-[0.075em] uppercase"
                  >
                    {props.isWaxSeal
                      ? 'Personal Wax Seal'
                      : 'Stationary Bundle'}
                  </DecreeText>
                </div>
                <div className="flex flex-col-reverse laptop:flex-col">
                  <div
                    className={clsx({
                      hidden: isWaxSealVisible && !isLaptopWidth,
                    })}
                  >
                    <div className="flex justify-between my-8 space-x-4 laptop:my-4 laptop:justify-start">
                      <DecreeButton
                        className={clsx({
                          'cursor-not-allowed': props.loading,
                        })}
                        disabled={
                          props.loading ||
                          (props.isWaxSeal && !props.showWaxSealPersonalization)
                        }
                        loading={props.loading}
                        onClick={() => {
                          if (props.loading) return;
                          props.userAddedPackageToCart();
                        }}
                      >
                        Add to Cart
                      </DecreeButton>
                      {/* Reset hidden on mobile */}
                      {/* Show personalize if package is wax seal */}
                      {props.isWaxSeal && (
                        <DecreeButton
                          className="bg-gold"
                          onClick={props.userClickedPersonalizeWaxSeal}
                        >
                          Customize
                        </DecreeButton>
                      )}
                      <DecreeButton
                        mode="text"
                        className={clsx('hidden laptop:block', {
                          'cursor-not-allowed': props.loading,
                        })}
                        disabled={props.loading}
                        onClick={props.userClickedReset}
                      >
                        Reset
                      </DecreeButton>
                    </div>
                    <div className="flex justify-between">
                      {/* Reset visible on mobile */}
                      <DecreeButton
                        mode="text"
                        className={clsx('laptop:hidden', {
                          'cursor-not-allowed': props.loading,
                        })}
                        disabled={props.loading}
                        onClick={props.userClickedReset}
                      >
                        Reset
                      </DecreeButton>
                      <DecreeText
                        size={23}
                        className="font-serif font-bold text-blue-dark"
                      >
                        <span>Total:</span>
                        <span className="ml-2">
                          {formatPrice(props.totalPrice)}
                        </span>
                      </DecreeText>
                    </div>
                  </div>
                  {/* Customization settings */}
                  <div className="laptop:space-y-6">
                    <div
                      className={clsx([
                        'space-y-6',
                        {hidden: isWaxSealVisible && !isLaptopWidth},
                      ])}
                    >
                      {/* TODO: Will be for later */}
                      {/* <PaperSettings /> */}
                      <div className="w-full h-[1px] bg-gray my-3" />
                      {props.isWaxSeal && (
                        <>
                          <DecreeText size={16} className="text-blue-dark">
                            Finish Size: around 1.25 inch
                          </DecreeText>
                        </>
                      )}
                      {props.variantsIntersection?.length > 0 && (
                        <GridFieldItem
                          label="Paper Type"
                          content={
                            <DecreeDropdown
                              value={props.selectedVariantsIntersection}
                              items={props.variantsIntersection.map(
                                variant => ({
                                  name: variant,
                                  value: variant,
                                })
                              )}
                              onChange={props.userSelectedVariantsIntersection}
                            />
                          }
                        />
                      )}
                      {!props.isWaxSeal && (
                        <PaperCustomizer
                          form={props.paperSettingsForm}
                          options={props.paperSettingsOptions}
                          hiddenFields={['quantity']}
                          isWaxSeal={props.isWaxSeal}
                          disabled={
                            props.isWaxSeal && !props.showWaxSealPersonalization
                          }
                        />
                      )}
                      <TextSettings
                        form={props.textSettingsForm}
                        options={props.textSettingsOptions}
                        disabled={
                          props.isWaxSeal && !props.showWaxSealPersonalization
                        }
                        hiddenFields={
                          props.isWaxSeal
                            ? ['fontWeight']
                            : ['fontWeight', 'font', 'fontSize']
                        }
                        isWaxSeal={props.isWaxSeal}
                      />
                      {!props.isWaxSeal && (
                        <>
                          <div className="w-full h-[1px] bg-gray hidden laptop:block" />

                          <PackageSettings
                            className="hidden laptop:block"
                            items={props.packageProducts}
                            currentProductIndex={props.currentProductIndex}
                            shownProductEditButtonIndices={
                              props.shownPackageProductIndices
                            }
                            onProductEditClick={
                              props.userClickedPackageProductEdit
                            }
                          />
                        </>
                      )}
                      {/* wax seal designer shown in mobile cannot use classnames as it will affect useWatch*/}
                      {!isLaptopWidth && (
                        <>
                          {props.isWaxSeal && (
                            <WaxSealsDesigner
                              form={props.monogramForm}
                              userClickedPreviewMonogram={() => {
                                props.userUpdatedCurrentPackageProduct({
                                  quantityPreset:
                                    currentPackageProduct?.quantityPreset || {
                                      name: '25 at $5.99/ea',
                                      value: '25',
                                    },
                                  productVariantIndex,
                                });
                                toast.success('Wax Seal Design Saved!');
                              }}
                              userClickedClearWaxSeal={
                                props.userClickedClearWaxSeal
                              }
                              savingDisabled={!props.showWaxSealPersonalization}
                              containerClassName="px-8 py-5 space-y-6"
                              titleClassName="space-y-6"
                              innerFormClassName="space-y-10"
                            />
                          )}
                        </>
                      )}
                      {!props.isWaxSeal && (
                        <div className="w-full h-[1px] bg-gray" />
                      )}
                    </div>
                    {!props.isWaxSeal && (
                      <WaxSealCustomizer
                        waxSealId={waxSealId}
                        isWaxSealVisible={isWaxSealVisible}
                        userClickedCustomize={() => setIsWaxSealVisible(true)}
                        userClickedCancel={() => setIsWaxSealVisible(false)}
                        userClickedAddToCart={id => setWaxSealId(id)}
                      />
                    )}
                  </div>
                </div>
              </>
            }
          />
        )}

        {/* Recommendations */}
        {!!filteredRecommendations.length && (
          <div className="w-full mt-14">
            <Recommendations productRecommendations={filteredRecommendations} />
          </div>
        )}

        {/* Modals */}
        {/* Modal for customizing a product in a package */}
        {isLaptopWidth && (
          <PackageCustomizerModal
            isOpen={props.isPackageProductModalOpen}
            onRequestClose={props.userClosedPackageProductModal}
            defaultQuantity={currentPackageProduct?.quantityPreset}
            quantityOptions={props.paperSettingsOptions.quantityList}
            productPrice={
              currentPackageProduct?.node.variants.edges[productVariantIndex]
                .node.priceV2.amount
            }
            onSaveClick={payload => {
              props.userUpdatedCurrentPackageProduct({
                quantityPreset: payload.quantity,
                productVariantIndex,
              });
              setProductVariantIndex(0);
            }}
          >
            <div className="w-[60%] mx-auto" style={{aspectRatio: '5/7'}}>
              <DecreeSvgEditor
                svgUrl={currentPackageProductSvgUrl}
                elements={props.packageProductStationaryFields}
                attributes={svgEditorAttributes}
                onSetSvgBlob={props.setCurrentPackageProductSvgBlob}
              />
            </div>
            <div>
              <NotesCustomizer
                title="Customize your text:"
                submitText="Update"
                formInnerDivContainerClassName="grid grid-cols-2 gap-6 space-y-0"
                svgUrl={currentPackageProductSvgUrl}
                notesCustomizerForm={props.packageProductNotesCustomizationForm}
                onNotesUpdate={(values: NotesCustomizerFormValues) => {
                  props.setPackageProductsStationaryFields(
                    Object.keys(values).map(key => ({
                      id: key,
                      text: values[key],
                    }))
                  );
                }}
              />
            </div>
          </PackageCustomizerModal>
        )}
      </CustomizationLayout>
    </>
  );
};
