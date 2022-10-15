import clsx from 'clsx';
import _ from 'lodash';
import React from 'react';
import {DecreeText} from '../../../core/DecreeText';
import {GridFieldItem} from './GridFieldItem';

type Props = {
  colors: {name: string; value: string}[];
  label: string;
  activeColor: string;
  onClick: (value: string) => void;
  disabled?: boolean;
};

export const ColorPicker = (props: Props) => {
  const {colors, label, activeColor, onClick} = props;

  return (
    <GridFieldItem
      label={label}
      content={
        <div className="flex flex-wrap">
          {colors.map(color => {
            const regex = /(https?:\/\/.*\.(?:png|jpg|gif|webp|svg))/i;
            const isPattern = color.value.match(regex);
            return (
              <button
                key={color.value}
                className={clsx(
                  'relative flex-none w-6 h-6 focus:outline-none m-2',
                  {'cursor-not-allowed': props.disabled}
                )}
                onClick={() => onClick(color.value)}
                disabled={props.disabled}
              >
                {activeColor === color.value && (
                  <DecreeText
                    size={10}
                    className="absolute top-0 transform -translate-x-1/2 -translate-y-full left-1/2 whitespace-nowrap"
                  >
                    {_.startCase(color.name)}
                  </DecreeText>
                )}
                <div
                  className={clsx(
                    `rounded-full border-[0.5px] border-black h-full w-full relative ${
                      activeColor === color.value
                        ? 'ring-1 ring-offset-1 ring-black'
                        : ''
                    }`,
                    {'bg-center': isPattern, 'bg-cover': isPattern}
                  )}
                  style={{
                    backgroundColor: (!isPattern && color.value) || '',
                    backgroundImage: (isPattern && `url(${color.value})`) || '',
                  }}
                />
              </button>
            );
          })}
        </div>
      }
    />
  );
};
