import React from 'react';
import {MinusIcon, PlusIcon} from '../../../../assets/svg';
import {GridFieldItem} from './GridFieldItem';
import {DecreeText} from '../../../core/DecreeText';

type Props = {
  fontSize: number;
  sizeType?: string;
  label: string;
  size?: 'long' | 'short';
  onClick: (size: number) => void;
};

/**
 * A field for incrementing and decrementing the font size
 *
 * @param props
 * @constructor
 *
 * @return React.Component
 */
export const FontInput = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const {fontSize, label, size, sizeType, onClick, ...inputProps} = props;

    return (
      <GridFieldItem
        label={label}
        size={size}
        content={
          <div className="flex items-center justify-start space-x-2">
            <button
              className="flex-shrink-0 focus:outline-none"
              type="button"
              onClick={() => {
                if (fontSize - 1 >= 5) {
                  onClick(fontSize - 1);
                }
              }}
            >
              <MinusIcon className="h-[32px] laptop:h-4 w-[32px] laptop:w-4" />
            </button>
            <div className="flex-grow-0">
              <div className="border-[0.5px] rounded-[9px] bg-white h-9 min-w-[56px] p-2">
                <DecreeText size={14}>
                  {fontSize} {sizeType}
                </DecreeText>
              </div>
              <input
                value={fontSize}
                ref={ref}
                className="hidden"
                {...inputProps}
              />
            </div>
            <button
              className="flex-shrink-0 focus:outline-none"
              type="button"
              onClick={() => onClick(fontSize + 1)}
            >
              <PlusIcon className="h-[32px] laptop:h-4 w-[32px] laptop:w-4" />
            </button>
          </div>
        }
      />
    );
  }
);

FontInput.defaultProps = {
  size: 'long' as const,
};
