/* eslint-disable node/no-unsupported-features/node-builtins */
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import {useWatch} from 'react-hook-form';
import {CloseIcon} from '../../../assets/svg';
import {formatPrice} from '../../../utils/format-price';
import {quantityPresetFormatter} from '../../../utils/quantity-preset-formatter';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeDropdown} from '../../core/DecreeDropdown';
import {DecreeSvgEditor} from '../../core/DecreeSvgEditor';
import {DecreeText} from '../../core/DecreeText';
import {getParsedProductDescription} from '../containers/helpers/get-product-description';
import {PackageCustomizationProps} from '../containers/PackageCustomizationContainer';
import {PackageProduct} from '../models/PackageProduct';
import {SettingOption} from '../models/SettingOption';
import {
  NotesCustomizer,
  NotesCustomizerFormValues,
} from './shared/sections/NotesCustomizer';

type Props = {
  productPrice: number;
  quantityOptions: SettingOption[];
  userClickedClose: () => void;
} & PackageCustomizationProps;

const initialQuantityOption: SettingOption = {name: '', value: ''};

/**
 * A screen for personalizing packages that's only intended for mobile
 * Desktop does not have a separate screen for editing a package.
 * @component
 * @param {Props} props
 * @returns JSX.Element
 */
export const PackagePersonalizationMobileScreen = (props: Props) => {
  // Ephemeral states
  const [productQuantity, setProductQuantity] = useState<SettingOption>(
    initialQuantityOption
  );

  const [productVariantIndex, setProductVariantIndex] = useState(0);

  // Watchers
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

  // Listens to changes in [props.quantityOptions]
  // and [props.currentPackageProduct] to update the [productQuantity] state
  useEffect(() => {
    const currentPackageProduct = props.packageProducts[
      props.currentProductIndex
    ] as PackageProduct | undefined;

    const defaultQuantityOption =
      currentPackageProduct?.quantityPreset ||
      props.quantityOptions[0] ||
      initialQuantityOption;
    setProductQuantity(defaultQuantityOption);
  }, [JSON.stringify(props.quantityOptions), props.currentProductIndex]);

  const svgEditorAttributes = {
    fontColor: watchedFontColor,
    fontSize: watchedFontSize,
    fontWeight: watchedFontWeight,
    paperColor: watchedPaperColor,
    fontFamily: watchedFontFamily,
  };

  return (
    <div className="flex flex-col justify-center py-8 -mx-4 -mb-10 bg-offwhite">
      <div className="relative mx-3">
        <button
          className="absolute top-0 right-0 focus:outline-none"
          onClick={props.userClickedClose}
        >
          <CloseIcon className="w-8 h-8" />
        </button>
        <DecreeText
          size={23}
          className="font-serif font-bold text-center text-blue-dark"
        >
          Design your package:
        </DecreeText>
      </div>
      <div className="space-y-10 mt-7 px-7">
        {props.packageProducts.map((product, i) => {
          const isTouched = !!product.modifiedSvg;
          const isCurrentlyCustomizing = props.currentProductIndex === i;
          const svgUrl =
            (isTouched
              ? URL.createObjectURL(product.modifiedSvg)
              : getParsedProductDescription(product.node.description)
                  .imageLinks[0]) || ''; // The `description` field serves as svg source for now
          const totalPrice = getTotalPrice(
            isCurrentlyCustomizing
              ? product.node.variants.edges[productVariantIndex].node.priceV2
                  .amount
              : product.node.variants.edges[product.productVariantIndex || 0]
                  .node.priceV2.amount,
            isCurrentlyCustomizing
              ? parseInt(productQuantity.value || '1')
              : parseInt(product.quantityPreset?.value || '1')
          );

          return (
            <div key={i} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div
                  className={clsx(
                    'flex items-center justify-center w-8 h-8  border rounded z-10',
                    {
                      'bg-offwhite border-gray-suva': !isTouched,
                      'bg-blue-dark border-blue-dark': isTouched,
                    }
                  )}
                  style={{aspectRatio: '1/1'}}
                >
                  <DecreeText
                    size={16}
                    className={clsx({
                      'text-gray-suva': !isTouched,
                      'text-white font-bold': isTouched,
                    })}
                  >
                    {i + 1}
                  </DecreeText>
                </div>
                <button
                  className="w-full focus:outline-none"
                  onClick={() => props.userClickedPackageProductEdit(i)}
                >
                  {isCurrentlyCustomizing ? (
                    <DecreeSvgEditor
                      svgUrl={svgUrl}
                      elements={props.packageProductStationaryFields}
                      attributes={svgEditorAttributes}
                      onSetSvgBlob={svgBlob => {
                        props.setCurrentPackageProductSvgBlob(svgBlob);
                      }}
                    />
                  ) : (
                    <img src={svgUrl} className="w-full" />
                  )}
                </button>
                <DecreeText size={16} className="text-blue-dark">
                  {product.node.title}
                </DecreeText>
              </div>
              {isCurrentlyCustomizing && (
                <div className="-my-6">
                  <NotesCustomizer
                    title="Customize your text:"
                    submitText="Update"
                    formInnerDivClassName="gap-6 space-y-4"
                    svgUrl={svgUrl}
                    notesCustomizerForm={
                      props.packageProductNotesCustomizationForm
                    }
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
              )}
              {isCurrentlyCustomizing ? (
                <div className="space-y-6">
                  <DecreeText
                    size={23}
                    className="font-serif font-bold text-blue-dark"
                  >
                    Choose quantity:
                  </DecreeText>
                  <div className="space-y-4">
                    <DecreeDropdown
                      value={productQuantity.value}
                      items={quantityPresetFormatter(
                        props.packageProducts[props.currentProductIndex]?.node
                          .variants.edges[productVariantIndex].node.priceV2
                          .amount,
                        props.quantityOptions
                      )}
                      onChange={e => {
                        const {selectedIndex} = e.target;
                        setProductQuantity(
                          props.quantityOptions[selectedIndex]
                        );
                      }}
                    />
                    <DecreeText
                      size={23}
                      className="font-serif font-bold text-blue-dark"
                    >
                      {formatPrice(totalPrice)}
                    </DecreeText>
                  </div>
                </div>
              ) : (
                isTouched && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3">
                      <DecreeText size={16} className="text-blue-dark">
                        Quantity:
                      </DecreeText>
                      <DecreeText size={16} className="col-span-2">
                        {product.quantityPreset?.name}
                      </DecreeText>
                    </div>
                    <div className="grid grid-cols-3">
                      <DecreeText size={16} className="text-blue-dark">
                        Total:
                      </DecreeText>
                      <DecreeText size={16} className="col-span-2">
                        {formatPrice(totalPrice)}
                      </DecreeText>
                    </div>
                  </div>
                )
              )}
              {isCurrentlyCustomizing && (
                <div className="flex justify-between">
                  <DecreeButton
                    mode="secondary"
                    className="w-1/3"
                    onClick={props.userClickedClose}
                  >
                    Cancel
                  </DecreeButton>
                  <DecreeButton
                    className="w-1/3"
                    onClick={() => {
                      props.userUpdatedCurrentPackageProduct({
                        quantityPreset: productQuantity,
                        productVariantIndex,
                      });
                      setProductVariantIndex(0);
                    }}
                  >
                    Save
                  </DecreeButton>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const getTotalPrice = (price: number, qty: number) => {
  return price * qty;
};
