import React, {useEffect, useState} from 'react';
import {formatPrice} from '../../../../../utils/format-price';
import {quantityPresetFormatter} from '../../../../../utils/quantity-preset-formatter';
import {DecreeButton} from '../../../../core/DecreeButton';
import {DecreeDropdown} from '../../../../core/DecreeDropdown';
import {DecreeModal} from '../../../../core/DecreeModal';
import {DecreeText} from '../../../../core/DecreeText';

const getTotalPrice = (price: number, qty: number) => {
  return price * qty;
};

type QuantityOption = {
  name: string;
  value: string;
};

/**
 * @typedef PackageCustomizerProps
 */
type PackageCustomizerProps = {
  isOpen: boolean;
  defaultQuantity?: QuantityOption;
  quantityOptions: QuantityOption[];
  productPrice: number;
  onRequestClose: () => void;
  onSaveClick?: (payload: {quantity: QuantityOption}) => void;
};

const initialQuantityOption: QuantityOption = {name: '', value: ''};

/**
 * An uncontrolled modal for customizing a product in a package.
 * [children] is intended to be the `DecreeSvgEditor` & `NotesCuztomizer`
 * @component
 * @param {PackageCustomizerProps} props
 * @returns JSX.Element
 */
export const PackageCustomizerModal: React.FC<PackageCustomizerProps> =
  props => {
    const [quantity, setQuantity] = useState<QuantityOption>(
      initialQuantityOption
    );

    // Listens to changes in [props.quantityOptions]
    // and [props.defaultQuantity] to update the [quantity] state
    useEffect(() => {
      const defaultQuantityOption =
        props.defaultQuantity ||
        props.quantityOptions[0] ||
        initialQuantityOption;
      setQuantity(defaultQuantityOption);
    }, [JSON.stringify(props.quantityOptions), props.defaultQuantity]);

    return (
      <DecreeModal isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
        <div className="w-[712px] space-y-6 py-9 px-11 bg-offwhite overflow-y-auto max-h-[90vh] border">
          {/* Header buttons */}
          <div className="flex justify-between">
            <DecreeButton mode="secondary" onClick={props.onRequestClose}>
              Cancel
            </DecreeButton>
            <DecreeButton onClick={() => props.onSaveClick?.({quantity})}>
              Save
            </DecreeButton>
          </div>
          {/* Preview image + Customize your text*/}
          {props.children}
          <div>
            <DecreeText
              size={23}
              className="font-serif font-bold text-blue-dark"
            >
              Choose quantity:
            </DecreeText>
            <div className="flex items-center w-[60%] space-x-8 mt-6">
              <DecreeText size={16} className="text-blue-dark">
                Quantity
              </DecreeText>
              <DecreeDropdown
                value={quantity.value}
                items={quantityPresetFormatter(
                  props.productPrice,
                  props.quantityOptions
                )}
                onChange={e => {
                  const {selectedIndex} = e.target;
                  setQuantity(props.quantityOptions[selectedIndex]);
                }}
              />
              <DecreeText
                size={23}
                className="font-serif font-bold text-blue-dark"
              >
                {formatPrice(
                  getTotalPrice(props.productPrice, parseInt(quantity.value))
                )}
              </DecreeText>
            </div>
          </div>
        </div>
      </DecreeModal>
    );
  };
