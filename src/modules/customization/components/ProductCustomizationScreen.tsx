import clsx from 'clsx';
import _ from 'lodash';
import React, {useState} from 'react';
import {useWatch} from 'react-hook-form';
import {formatPrice} from '../../../utils/format-price';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeSpinner} from '../../core/DecreeSpinner';
import {DecreeSvgEditor} from '../../core/DecreeSvgEditor';
import {DecreeText} from '../../core/DecreeText';
import {DecreeDropdown} from '../../core/DecreeDropdown';
import {ProductCustomizationProps} from '../containers/ProductCustomizationContainer';
import {ProductPersonalizationMobileScreen} from './ProductPersonalizationMobileScreen';
import {
  CustomizationLayout,
  CustomizationLayoutGrid,
} from './shared/customization-layout.components';
import {NotesCustomizer} from './shared/sections/NotesCustomizer';
import {PaperCustomizer} from './shared/sections/PaperCustomizer';
import {Recommendations} from './shared/sections/Recommendations';
import {StationeryPreview} from './shared/sections/StationeryPreview';
import {
  TextCustomizerField,
  TextSettings,
} from './shared/sections/TextSettings';
import {GridFieldItem} from './shared/GridFieldItem';
import {getParsedProductDescription} from '../containers/helpers/get-product-description';
import {EnvelopeCustomizer} from './shared/sections/EnvelopeCustomizer';
import {WaxSealCustomizer} from './shared/sections/WaxSealCustomizer';
import {laptopWidth} from '../../../utils/constants/screen-width.constants';
import {DangerCircle} from '../../../assets/svg';
import {HandleWindowResize} from '../../core/HandleWindowResize';
import {productTypes} from '../../../utils/constants/product-type.constants';
import {StationeryTypes} from '../../../utils/constants/stationery-type.constants';

export const ProductCustomizationScreen = (
  props: ProductCustomizationProps
) => {
  const isBusinessStationery =
    props.stationeryType === StationeryTypes.BUSINESS;
  const isWeddingStationery = props.stationeryType === StationeryTypes.WEDDING;
  // Holiday is also a greeting card but just separated
  const isGreetingStationery =
    props.stationeryType === StationeryTypes.GREETING ||
    props.stationeryType === StationeryTypes.HOLIDAY;

  // Ephemeral state
  const [isMobilePersonalizationShown, setIsMobilePersonalizationShown] =
    useState(false);
  const [isWaxSealVisible, setIsWaxSealVisible] = useState(false);
  const [isLaptopWidth, setIsLaptopWidth] = useState(
    window.innerWidth >= laptopWidth
  );
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [waxSealId, setWaxSealId] = useState('');

  const productDescription = getParsedProductDescription(
    props.product?.description
  ).description;
  const svgUrl = getParsedProductDescription(props.product?.description)
    .imageLinks?.[0];

  const watchedFontColor = useWatch({
    name: 'fontColor',
    control: props.textSettingsForm.control,
  });
  const watchedFontSize = useWatch({
    name: 'fontSize',
    control: props.textSettingsForm.control,
  });
  const watchedFontWeight = useWatch({
    name: 'fontWeight',
    control: props.textSettingsForm.control,
  });
  const watchedFontFamily = useWatch({
    name: 'font',
    control: props.textSettingsForm.control,
  });
  const watchedPaperColor = useWatch({
    name: 'paperColor',
    control: props.paperSettingsForm.control,
  });
  const watchedPaperQuantity = useWatch({
    name: 'quantity',
    control: props.paperSettingsForm.control,
  });
  const watchedEnvelopeQuantity = useWatch({
    name: 'quantity',
    control: props.paperSettingsForm.control,
  });

  const svgFontValues = {
    fontSize: watchedFontSize,
    fontWeight: watchedFontWeight,
    fontFamily: watchedFontFamily,
  };

  const svgEditorAttributes = {
    paperColor: watchedPaperColor,
    fontColor: watchedFontColor,
    // So the default values wont be modified if its a wedding invitation
    ...(!isWeddingStationery && svgFontValues),
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
        onResize={() => {
          const isLaptopWidth = window.innerWidth >= laptopWidth;

          setIsLaptopWidth(isLaptopWidth);

          if (isLaptopWidth) {
            setIsMobilePersonalizationShown(false);
          }
        }}
      />
      <CustomizationLayout
        breadcrumbTag={
          _.startCase(_.lowerCase(props.product?.title)) || 'Stationery'
        }
        sampleIsOnLimit={props.sampleIsOnLimit}
      >
        {!isLaptopWidth && (
          <div className={clsx({hidden: isWaxSealVisible || isEnvelopeOpen})}>
            <ProductPersonalizationMobileScreen
              {...props}
              svgUrl={svgUrl}
              isMobilePersonalizationShown={isMobilePersonalizationShown}
              svgEditorAttributes={svgEditorAttributes}
              userClickedCancel={() => setIsMobilePersonalizationShown(false)}
              userClickedPersonalize={() =>
                setIsMobilePersonalizationShown(true)
              }
              hideMobilePersonalization={() => {
                setIsMobilePersonalizationShown(false);
              }}
            />
          </div>
        )}
        <div
          className={clsx({
            hidden: isMobilePersonalizationShown && !isLaptopWidth,
          })}
        >
          <CustomizationLayoutGrid
            leftColumn={
              <>
                {isLaptopWidth && (
                  <StationeryPreview>
                    {props.loading ? (
                      // To prevent the svg from flashing every rerender while loading
                      <DecreeSpinner type="primary" />
                    ) : (
                      <DecreeSvgEditor
                        allowSaveToStorage={
                          props.productSvgEditorAllowSaveToStorage
                        }
                        svgUrl={svgUrl}
                        isEditMode={props.isEditMode}
                        shouldCenterText={isGreetingStationery}
                        productHasLogo={props.productHasLogo}
                        elements={props.productStationeryFields}
                        attributes={svgEditorAttributes}
                        onSaveSvgChangesToStorage={
                          props.saveSvgChangesToStorage
                        }
                        onSetSvgBlob={props.setSvgBlob}
                        uploadedLogo={props.uploadedLogo}
                      />
                    )}
                  </StationeryPreview>
                )}

                {/* Customize your notes */}
                {isLaptopWidth && (
                  <NotesCustomizer
                    productHasLogo={props.productHasLogo}
                    isLoading={props.loading}
                    hasLogoUploaded={!!props.uploadedLogo}
                    containerClassName="px-8 py-6"
                    formInnerDivClassName={clsx([
                      'space-y-6',
                      {'grid grid-cols-2': !props.productHasLogo},
                    ])}
                    formFieldClassName={clsx({
                      'col-span-2 hd:col-span-1': !props.productHasLogo,
                    })}
                    isBusinessCard={isBusinessStationery}
                    notesCustomizerForm={props.notesCustomizerForm}
                    svgUrl={svgUrl}
                    // Allow capture of svg default values if we're not in edit mode
                    allowDefaultValuesCapture={!props.isEditMode}
                    onCaptureNotesDefaultValues={props.setDefaultNotesValues}
                    onNotesUpdate={formState => {
                      props.setProductStationeryFields(
                        Object.keys(formState).map(key => ({
                          id: key,
                          text: formState[key],
                        }))
                      );
                    }}
                    elements={props.productStationeryFields}
                    userClickedUpload={props.userClickedUploadLogo}
                    userClickedDeleteLogo={props.userClickedDeleteLogo}
                  />
                )}
              </>
            }
            rightColumn={
              <>
                <div
                  className={clsx([
                    'text-center laptop:text-left',
                    {
                      hidden:
                        (isWaxSealVisible || isEnvelopeOpen) && !isLaptopWidth,
                    },
                  ])}
                >
                  <DecreeText
                    size={23}
                    className="font-serif font-bold text-blue-dark"
                  >
                    {props.product?.title || '-'}
                  </DecreeText>
                  <DecreeText
                    size={14}
                    className="font-serif text-gold font-bold tracking-[0.075em] uppercase"
                  >
                    {props.product?.subtitle?.value ||
                      `${_.startCase(props.product?.productType)} Stationery`}
                  </DecreeText>
                </div>
                {/* description on mobile */}
                <div
                  className={clsx([
                    'laptop:hidden',
                    {'my-2': productDescription},
                    {hidden: isWaxSealVisible || isEnvelopeOpen},
                  ])}
                >
                  <DecreeText
                    size={14}
                    className="font-serif text-blue-dark text-justify"
                  >
                    {productDescription}
                  </DecreeText>
                </div>
                <div className="flex flex-col-reverse laptop:flex-col">
                  <div
                    className={clsx({
                      hidden:
                        (isWaxSealVisible || isEnvelopeOpen) && !isLaptopWidth,
                    })}
                  >
                    <div className="laptop:hidden group relative">
                      <div className="flex justify-center">
                        <div className="hidden bottom-2 group-hover:block absolute bg-white w-[263px] tablet:w-[333px] p-4 border border-blue-light mt-4 rounded-md z-20">
                          <DecreeText size={12} className="font-sans leading-7">
                            We are happy to provide a proof of the actual card
                            you designed. This ensures you are completely
                            satisfied with your design. There is a nominal
                            charge for this service and if you purchase
                            stationery from us, the price of the proof is
                            removed from the cost of the stationery.
                          </DecreeText>
                        </div>
                      </div>
                      <div className="flex justify-end my-4">
                        <button
                          className={clsx([{hidden: isBusinessStationery}])}
                        >
                          <DangerCircle />
                        </button>
                      </div>
                    </div>
                    <div
                      className={clsx(
                        'flex mb-8  space-x-4 laptop:my-4',
                        {
                          'items-center justify-center':
                            !isLaptopWidth && isBusinessStationery,
                        },
                        {
                          'justify-between laptop:justify-start':
                            (!isLaptopWidth && !isBusinessStationery) ||
                            isLaptopWidth,
                        }
                      )}
                    >
                      <DecreeButton
                        className={clsx([
                          'flex items-center justify-center',
                          {'px-6 py-2': !isLaptopWidth},
                          {'cursor-not-allowed': props.loading},
                          {'w-[130px]': !isLaptopWidth},
                        ])}
                        disabled={props.loading || !props.product?.description}
                        onClick={props.userAddedProductToCart}
                      >
                        {props.isEditMode ? 'Update Item' : 'Add to Cart'}
                      </DecreeButton>
                      <div
                        className={clsx([
                          'group',
                          {hidden: isBusinessStationery},
                        ])}
                      >
                        <DecreeButton
                          mode="secondary"
                          type="button"
                          className={clsx([
                            {'cursor-not-allowed': props.loading},
                            {'w-[130px]': !isLaptopWidth},
                          ])}
                          disabled={
                            props.loading || !props.product?.description
                          }
                          onClick={props.userClickedGetASample}
                        >
                          Get a Proof
                        </DecreeButton>
                        <div className="hidden laptop:block">
                          <div className="hidden group-hover:block absolute bg-blue-light w-[333px] p-4 border border-blue-dark mt-4 rounded-md z-20">
                            <DecreeText
                              size={12}
                              className="font-sans leading-7"
                            >
                              We are happy to provide a proof of the actual card
                              you designed. This ensures you are completely
                              satisfied with your design. There is a nominal
                              charge for this service and if you purchase
                              stationery from us, the price of the proof is
                              removed from the cost of the stationery.
                            </DecreeText>
                          </div>
                        </div>
                      </div>
                      {/* Reset hidden on mobile */}
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
                          {watchedPaperQuantity &&
                            watchedEnvelopeQuantity &&
                            formatPrice(props.totalPrice)}
                        </span>
                      </DecreeText>
                    </div>
                    <div className="hidden laptop:block">
                      <DecreeText
                        size={14}
                        className="font-serif text-blue-dark text-justify"
                      >
                        {productDescription}
                      </DecreeText>
                    </div>
                  </div>
                  <div className="laptop:space-y-6">
                    {/* space-y-4 also applies to children */}
                    <div
                      className={clsx([
                        'space-y-6',
                        {
                          hidden:
                            (isWaxSealVisible || isEnvelopeOpen) &&
                            !isLaptopWidth,
                        },
                      ])}
                    >
                      {/* TODO: Will be for later */}
                      {/* <PaperSettings /> */}
                      <div className="w-full h-[1px] bg-gray my-3" />
                      {props.product &&
                        props.product?.variants?.edges.length > 1 &&
                        props.product.options.map(option => {
                          const optionsDropdownLength = option.values.length;

                          if (optionsDropdownLength <= 1) {
                            return null;
                          }

                          if (option.name === 'Tier') {
                            return null;
                          }

                          return (
                            <GridFieldItem
                              key={option.id}
                              label={option.name}
                              content={
                                <DecreeDropdown
                                  disabled={
                                    props.loading || !props.product?.description
                                  }
                                  value={
                                    props.productVariantInfo?.[option.name] ||
                                    ''
                                  }
                                  items={option.values.map(value => ({
                                    name: value,
                                    value,
                                  }))}
                                  onChange={e =>
                                    props.userChangedVariant(e, option.name)
                                  }
                                />
                              }
                            />
                          );
                        })}
                      <PaperCustomizer
                        form={props.paperSettingsForm}
                        options={props.paperSettingsOptions}
                        disabled={props.loading || !props.product?.description}
                      />
                      {!isWeddingStationery && (
                        <div className="w-full h-[1px] bg-gray" />
                      )}
                      <TextSettings
                        disabled={props.loading || !props.product?.description}
                        form={props.textSettingsForm}
                        options={props.textSettingsOptions}
                        hiddenFields={((): TextCustomizerField[] => {
                          if (isWeddingStationery) {
                            return ['fontSize', 'fontWeight', 'font'];
                          } else if (isGreetingStationery) {
                            return ['font'];
                          } else {
                            return [];
                          }
                        })()}
                      />
                    </div>
                    {/* turn off envelope and wax seal */}
                    <div
                      className={clsx({
                        hidden:
                          (isWaxSealVisible && !isLaptopWidth) ||
                          props.stationeryType === StationeryTypes.BUSINESS,
                      })}
                    >
                      <div
                        className={clsx('w-full h-[1px] bg-gray', {
                          hidden: isEnvelopeOpen,
                        })}
                      />
                      <div className="space-y-6 my-4">
                        <EnvelopeCustomizer
                          envelopeColors={
                            props.envelopeCustomizerOptions.envelopeColorList
                          }
                          liningColors={
                            props.envelopeCustomizerOptions.liningColorList
                          }
                          quantityList={
                            props.envelopeCustomizerOptions.quantityList
                          }
                          form={props.envelopeCustomizerForm}
                          disabled={
                            props.loading || !props.product?.description
                          }
                          previewImageSrc={props.envelopePreviewImageSrc}
                          userClickedPreview={() => setIsEnvelopeOpen(true)}
                          userClosedPreview={() => {
                            setIsEnvelopeOpen(false);
                            window.scrollTo(0, 0);
                          }}
                          isEnvelopeOpen={isEnvelopeOpen}
                        />
                      </div>
                      {/* <div
                        className={clsx('w-full h-[1px] bg-gray', {
                          hidden: isEnvelopeOpen,
                        })}
                      /> */}
                    </div>
                    {/* <div
                      className={clsx({
                        hidden: isEnvelopeOpen && !isLaptopWidth,
                      })}
                    >
                      <WaxSealCustomizer
                        waxSealId={waxSealId}
                        isWaxSealVisible={isWaxSealVisible}
                        userClickedCustomize={() => setIsWaxSealVisible(true)}
                        userClickedCancel={() => setIsWaxSealVisible(false)}
                        userClickedAddToCart={id => setWaxSealId(id)}
                      />
                    </div> */}
                  </div>
                </div>
              </>
            }
          />
        </div>
        {/* Recommendations */}
        {!!filteredRecommendations.length && (
          <div className="w-full mt-14">
            <Recommendations productRecommendations={filteredRecommendations} />
          </div>
        )}
      </CustomizationLayout>
    </>
  );
};
