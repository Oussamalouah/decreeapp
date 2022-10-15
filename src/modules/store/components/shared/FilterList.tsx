import React from 'react';
import {DecreeText} from '../../../core/DecreeText';
import clsx from 'clsx';
import {ActiveTickBox, TickBox} from '../../../../assets/svg';

type Props = {
  title: string;
  filters: {id: string; text: string}[];
  selectedFilters: {id: string; text: string}[];
  onClick: (filter: {id: string; text: string}) => void;
};

/**
 * Presentational component of the list of the different filters available
 * @param props
 * @constructor
 */
export const FilterList = (props: Props) => {
  return (
    <div className={clsx(['space-y-4', {hidden: props.filters.length <= 0}])}>
      <DecreeText size={18} className="text-blue-dark uppercase">
        {props.title}
      </DecreeText>
      <div className="space-y-3">
        {props.filters.map(filter => {
          const isSelectedFilter = props.selectedFilters.some(
            selectedFilter => selectedFilter.id === filter.id
          );

          return (
            <div
              className="flex items-center cursor-pointer space-x-2"
              onClick={() => props.onClick(filter)}
            >
              {isSelectedFilter ? <ActiveTickBox /> : <TickBox />}
              <DecreeText size={15} className="text-blue-dark capitalize">
                {filter.text}
              </DecreeText>
            </div>
          );
        })}
      </div>
    </div>
  );
};
