import clsx from 'clsx';
import _ from 'lodash';
import React, {useState} from 'react';
import Modal from 'react-modal';
import {CloseIcon, MenuArrow} from '../../../../assets/svg';
import {DecreeText} from '../../../core/DecreeText';
import {Category} from '../../containers/StoreScreenContainer';
import {FilterMenuContainer} from '../../containers/FilterMenuContainer';
import {MobileFilterMenu} from '../MobileFilterMenu';
import {StationeryTypes} from '../../../../utils/constants/stationery-type.constants';
import {printedTypes} from '../../../../utils/constants/store.contants';

type MobileModalProductMenuProps = {
  isOpen: boolean;
  currentProductType: string;
  products: Category[];
  currentStationeryType: StationeryTypes | undefined;
  onClose: () => void;
  userClickedMenuItem: (
    productId: string,
    filters?: {tagIds?: string; paperColors?: string; sortType?: string}
  ) => void;
};

const MobileFilter = FilterMenuContainer(MobileFilterMenu);

export const MobileProductMenuModal: React.FC<MobileModalProductMenuProps> =
  props => {
    const [selectedProductType, setSelectedProductType] = useState<string>('');

    const selectedProductTypeText =
      _.find(props.products, type => type.id === selectedProductType)?.text ||
      '';

    return (
      <Modal
        className="absolute bottom-0 w-screen overflow-auto bg-offwhite h-[90%]"
        isOpen={props.isOpen}
        ariaHideApp={false}
      >
        <div className="py-8 space-y-7 mx-5">
          <div className="relative">
            <div
              className="h-10"
              onClick={() => {
                props.onClose();
                setSelectedProductType('');
              }}
            >
              <CloseIcon className="h-full" />
            </div>
            <div className="flex flex-col justify-center pt-7">
              <div className="w-full border-b border-gray">
                <DecreeText
                  size={24}
                  className="text-center text-blue-dark font-serif font-bold"
                >
                  Products Filter
                </DecreeText>
              </div>
            </div>
            <div className="px-9">
              <div
                className={clsx([
                  'pt-9 space-y-6',
                  {hidden: selectedProductType},
                ])}
              >
                {props.products.map(product => (
                  <div className="relative" key={product.text}>
                    <DecreeText
                      size={18}
                      className="text-left text-blue-dark uppercase"
                      onClick={() => props.userClickedMenuItem(product.id)}
                    >
                      {product.text}
                    </DecreeText>
                    <MenuArrow
                      className="absolute top-0 right-0"
                      onClick={() => setSelectedProductType(product.id)}
                    />
                  </div>
                ))}
                <div className="space-y-6">
                  <DecreeText
                    size={18}
                    className="text-left text-blue-dark uppercase"
                    onClick={() => {
                      props.userClickedMenuItem(props.currentProductType, {
                        tagIds: printedTypes.letterPress,
                      });
                    }}
                  >
                    Letterpress
                  </DecreeText>
                  <DecreeText
                    size={18}
                    className="text-left text-blue-dark uppercase"
                    onClick={() => {
                      props.userClickedMenuItem(props.currentProductType, {
                        tagIds: printedTypes.engraved,
                      });
                    }}
                  >
                    Engraved
                  </DecreeText>
                </div>
              </div>
              {/* Remove from dom entirely */}
              {selectedProductType && (
                <MobileFilter
                  closeMenu={props.onClose}
                  currentStationeryType={props.currentStationeryType}
                  selectedProductType={selectedProductType}
                  selectedProductTypeText={selectedProductTypeText}
                  userClickedMenuItem={props.userClickedMenuItem}
                  userClickedBack={() => setSelectedProductType('')}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  };
