import React from 'react';
import {DecreeText} from '../../../../core/DecreeText';

/**
 * A section in view package/product that displays the current paper settings.
 * @returns JSX.Element
 */
export const PaperSettings = () => {
  return (
    <div className="space-y-2">
      {[
        {label: 'Paper Size: ', value: '5 inch x 6 inch'},
        {label: 'Paper Type: ', value: '100% Cotton'},
        {label: 'Paper Weight: ', value: '600 lb'},
      ].map(item => {
        return (
          <DecreeText size={16} className="text-blue-dark" key={item.label}>
            {item.label}
            {item.value}
          </DecreeText>
        );
      })}
    </div>
  );
};
