import _ from 'lodash';
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';

import {FilterMenu} from '../FilterMenu';
import {Category} from '../../containers/StoreScreenContainer';
import {StationeryTypes} from '../../../../utils/constants/stationery-type.constants';
import {FilterMenuContainer} from '../../containers/FilterMenuContainer';

type Props = {
  currentProductType: string;
  currentStationeryType: StationeryTypes | undefined;
  userClickedMenuItem: (
    productId: string,
    filters?: {tagIds?: string; paperColors?: string; sortType?: string}
  ) => void;
  products: Category[];
};

const Filter = FilterMenuContainer(FilterMenu);

/**
 * Menu bar for desktop
 * @param props
 * @constructor
 */
export const Menu: React.FC<Props> = props => {
  const [hoveredProductType, setHoveredProductType] = useState(
    props.currentProductType
  );
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);

  const isWeddingStationery =
    props.currentStationeryType === StationeryTypes.WEDDING;

  const hoveredProductTypeText =
    _.find(props.products, type => type.id === hoveredProductType)?.text || '';

  useEffect(() => {
    setHoveredProductType(props.currentProductType);
  }, [props.currentProductType]);

  return (
    <MenuWrapper
      $isBackgroundWhite={isWeddingStationery}
      onMouseLeave={() => {
        setHoveredProductType(props.currentProductType);
        setIsFilterMenuVisible(false);
      }}
    >
      <MenuItems className="pt-4">
        <div className="mx-auto max-w-screen-figma">
          <div className="flex">
            {props.products.map(product => (
              <div className="flex-grow">
                <button
                  className="outline-none focus:outline-none"
                  onClick={() => props.userClickedMenuItem(product.id)}
                  onMouseEnter={() => {
                    // So it wont call if its the same product type
                    if (hoveredProductType !== product.id) {
                      setHoveredProductType(product.id);
                    }
                    setIsFilterMenuVisible(true);
                  }}
                >
                  <CategoryText
                    $isActive={product.id === hoveredProductType}
                    key={product.text}
                  >
                    {product.text}
                  </CategoryText>
                </button>
              </div>
            ))}
          </div>
          <div
            className={clsx({
              hidden: !isFilterMenuVisible,
            })}
          >
            <Filter
              selectedProductType={hoveredProductType}
              selectedProductTypeText={hoveredProductTypeText}
              currentStationeryType={props.currentStationeryType}
              closeMenu={() => setIsFilterMenuVisible(false)}
              userClickedMenuItem={(productId, filters) => {
                props.userClickedMenuItem(productId, filters);
                setIsFilterMenuVisible(false);
              }}
            />
          </div>
        </div>
      </MenuItems>
    </MenuWrapper>
  );
};

const MenuWrapper = tw.div<{$isBackgroundWhite?: boolean}>`
  hidden laptop:block
  ${p => (p.$isBackgroundWhite ? 'bg-white' : 'bg-blue-dark')}
`;

const MenuItems = tw.div<{$isBackgroundWhite?: boolean}>`
  px-16
  ${p => (p.$isBackgroundWhite ? 'bg-white' : 'bg-blue-dark')}
`;

const CategoryText = tw.div<{
  $isActive: boolean;
}>`
  text-size-23 hd:text-2xl
  flex-shrink w-min px-2
  font-serif font-light 
  text-center text-white
  whitespace-nowrap
  ${p => (p.$isActive ? 'border-b-4 border-gold' : '')}
`;
