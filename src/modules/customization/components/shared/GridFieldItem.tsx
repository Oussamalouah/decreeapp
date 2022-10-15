import clsx from 'clsx';
import React from 'react';
import {DecreeText} from '../../../core/DecreeText';

type Props = {
  size?: 'long' | 'short';
  label: string;
  content: React.ReactNode;
};

export const GridFieldItem = (props: Props) => {
  return (
    <div
      className={clsx('grid', {
        'grid-cols-12': props.size === 'long',
        'grid-cols-12 laptop:grid-cols-2 place-items-stretch laptop:place-items-start':
          props.size === 'short',
      })}
    >
      <DecreeText
        size={16}
        className={clsx('self-center text-blue-dark whitespace-nowrap', {
          'col-span-4 laptop:col-span-3': props.size === 'long',
          'col-span-4 laptop:col-span-1': props.size === 'short',
        })}
      >
        {props.label}
      </DecreeText>
      <div
        className={clsx('self-center', {
          'col-span-8 laptop:col-span-6': props.size === 'long',
          'col-span-8 laptop:col-span-1': props.size === 'short',
        })}
      >
        {props.content}
      </div>
    </div>
  );
};

GridFieldItem.defaultProps = {
  size: 'long' as const,
};
