import clsx from 'clsx';
import React, {useState} from 'react';
import {isDesktop} from 'react-device-detect';
import tw from 'tailwind-styled-components/dist/tailwind';

import {FilterList} from './shared/FilterList';
import {MenuArrow} from '../../../assets/svg';
import {FilterMenuProps} from '../containers/FilterMenuContainer';
import {DecreeText} from '../../core/DecreeText';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeSpinner} from '../../core/DecreeSpinner';

/**
 * Filter Menu for Desktop
 * @param props
 * @constructor
 */
export const FilterMenu = (props: FilterMenuProps) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <div
      className="w-full flex items-center justify-center bg-white absolute left-0 z-10"
      onMouseLeave={() => setIsFilterVisible(false)}
    >
      <div className="max-w-screen-figma w-full py-11 px-[72px] border-l border-r border-b">
        <div className="relative">
          <div className="flex space-x-14">
            <div className="min-w-[150px] hd:min-w-[231px] space-y-8">
              {/* Uncomment when filter other than letterpress or engraved is enabled */}
              {/* <div
                className="pr-2 relative cursor-pointer"
                onMouseEnter={() => setIsFilterVisible(true)}
                onClick={() => {
                  if (isDesktop) {
                    props.userClickedMenuItem(props.selectedProductType);
                  }
                }}
              >
                <MenuArrow className="absolute right-0" />
                <FilterTitle
                  size={18}
                  className={clsx([
                    'border-b',
                    {'border-blue-dark': isFilterVisible},
                    {'border-white': !isFilterVisible},
                  ])}
                >
                  {props.selectedProductTypeText}
                </FilterTitle>
              </div> */}
              <FilterTitle
                size={18}
                className="cursor-pointer border-b border-white hover:border-blue-dark"
                onMouseEnter={() => setIsFilterVisible(false)}
                onClick={props.userClickedLetterPress}
              >
                Letterpress
              </FilterTitle>
              <FilterTitle
                size={18}
                className="cursor-pointer border-b border-white hover:border-blue-dark"
                onMouseEnter={() => setIsFilterVisible(false)}
                onClick={props.userClickedEngraved}
              >
                Engraved
              </FilterTitle>
            </div>
            <div
              className={clsx([
                'flex w-full items-center justify-center',
                {hidden: !isFilterVisible || !props.loading},
              ])}
            >
              <DecreeSpinner type="primary" />
            </div>
            <div
              className={clsx([
                'flex space-x-14',
                {hidden: !isFilterVisible || props.loading},
              ])}
            >
              <FilterList
                title="style"
                filters={props.tags}
                onClick={props.userClickedStyleFilter}
                selectedFilters={props.selectedStyles}
              />
              <FilterList
                title="paper color"
                filters={props.colors}
                onClick={props.userClickedPaperColorFilter}
                selectedFilters={props.selectedPaperColors}
              />
            </div>
          </div>
          <div
            className={clsx([
              'absolute top-0 right-0',
              {hidden: !isFilterVisible || props.loading},
            ])}
          >
            <DecreeButton
              className={clsx([
                'px-7 disabled:opacity-100',
                {'bg-gray cursor-not-allowed': props.isSaveDisabled},
              ])}
              disabled={props.isSaveDisabled}
              onClick={props.userClickedSave}
            >
              Save
            </DecreeButton>
            <DecreeButton
              className="px-7"
              mode="text"
              onClick={props.userClickedCancel}
            >
              Cancel
            </DecreeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterTitle = tw(DecreeText)`
  max-w-max text-blue-dark uppercase
`;
