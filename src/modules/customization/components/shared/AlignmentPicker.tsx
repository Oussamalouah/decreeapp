import clsx from 'clsx';
import React from 'react';
import {CenterAlign, LeftAlign, RightAlign} from '../../../../assets/svg';
import {GridFieldItem} from './GridFieldItem';

export enum Alignment {
  LEFT_ALIGN = 'left',
  CENTER_ALIGN = 'center',
  RIGHT_ALIGN = 'right',
}

type Props = {
  label: string;
  activeAlignment: Alignment;
  onClick: (value: Alignment) => void;
};

const alignmentList = [
  {svg: LeftAlign, value: Alignment.LEFT_ALIGN},
  {svg: CenterAlign, value: Alignment.CENTER_ALIGN},
  {svg: RightAlign, value: Alignment.RIGHT_ALIGN},
] as {svg: React.ComponentType; value: Alignment}[];

/**
 * A picker for the text-align field
 *
 * @param props
 * @constructor
 *
 * @return React.Component
 */
export const AlignmentPicker = (props: Props) => {
  const {activeAlignment, onClick} = props;

  return (
    <GridFieldItem
      label={props.label}
      content={
        <div className="flex items-center space-x-3">
          {alignmentList.map(item => {
            const AlignmentSVG = item.svg as React.ComponentType<{
              className: string;
            }>;
            return (
              <button
                key={item.value}
                className={clsx(
                  'flex-shrink-0 p-2 rounded-lg focus:outline-none',
                  {'bg-gray': activeAlignment === item.value}
                )}
                onClick={() => onClick(item.value)}
              >
                <AlignmentSVG className="h-[19px] w-[19px] laptop:h-4 laptop:w-4" />
              </button>
            );
          })}
        </div>
      }
    />
  );
};
