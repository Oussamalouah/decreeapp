import clsx from 'clsx';
import React from 'react';
import {DecreeText} from '../../../core/DecreeText';

export const OrderTableRow: React.FC<
  {isHeader?: boolean} & React.HTMLAttributes<HTMLDivElement>
> = props => {
  return (
    <div
      className={clsx(['grid grid-cols-4 px-6', props.className], {
        'bg-offwhite py-3 rounded-t-md': props.isHeader,
        'py-5': !props.isHeader,
      })}
    >
      {props.children}
    </div>
  );
};

export const OrderTableHeaderItem = (
  props: {title: string} & React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <DecreeText
      size={14}
      className={clsx([
        'font-serif uppercase tracking-[0.075em] text-black-light font-bold',
        props.className,
      ])}
    >
      {props.title}
    </DecreeText>
  );
};

export const OrderTableBodyText: React.FC<
  {size?: number} & React.HTMLAttributes<HTMLDivElement>
> = props => {
  return (
    <DecreeText
      size={props.size || 14}
      className={clsx(['tracking-[0.03em]', props.className])}
    >
      {props.children}
    </DecreeText>
  );
};
