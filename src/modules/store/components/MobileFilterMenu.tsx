import React from 'react';
import {FilterMenuProps} from '../containers/FilterMenuContainer';
import {DecreeText} from '../../core/DecreeText';
import {DecreeButton} from '../../core/DecreeButton';
import {MenuArrow} from '../../../assets/svg';
import {FilterList} from './shared/FilterList';
import clsx from 'clsx';
import {DecreeSpinner} from '../../core/DecreeSpinner';

export const MobileFilterMenu = (props: FilterMenuProps) => {
  return (
    <>
      <div className={clsx(['pt-9', {hidden: !props.loading}])}>
        <DecreeSpinner type="primary" />
      </div>
      <div className={clsx(['pt-9', {hidden: props.loading}])}>
        <div className="absolute top-1 right-0">
          <DecreeButton
            className={clsx(['px-7', {hidden: props.isSaveDisabled}])}
            mode="text"
            onClick={props.userClickedClear}
          >
            Clear All
          </DecreeButton>
          <DecreeButton
            className={clsx([
              'px-7 disabled:opacity-100',
              {'bg-gray': props.isSaveDisabled},
            ])}
            disabled={props.isSaveDisabled}
            onClick={() => {
              props.userClickedSave();
              props.userClickedBack();
            }}
          >
            Save
          </DecreeButton>
        </div>
        <div className="flex space-x-4">
          <MenuArrow
            className="transform rotate-180"
            onClick={props.userClickedBack}
          />
          <div className="space-y-6">
            <DecreeText size={18} className="text-blue-dark uppercase">
              {props.selectedProductTypeText}
            </DecreeText>
            <FilterList
              title="style"
              filters={props.tags}
              selectedFilters={props.selectedStyles}
              onClick={props.userClickedStyleFilter}
            />
            <FilterList
              title="paper color"
              filters={props.colors}
              selectedFilters={props.selectedPaperColors}
              onClick={props.userClickedPaperColorFilter}
            />
          </div>
        </div>
      </div>
    </>
  );
};
