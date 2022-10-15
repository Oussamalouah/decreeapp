import React from 'react';
import {CircleSpinner} from 'react-spinners-kit';

/**
 * @typedef DecreeSpinnerProps
 */
type DecreeSpinnerProps = {
  type: 'primary' | 'secondary';
  size?: number;
};

/**
 * A spinner component specific to Decree
 * @component
 * @example
 * @param {DecreeSpinnerProps} props
 * @returns
 */
export const DecreeSpinner = (props: DecreeSpinnerProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <CircleSpinner color={colors[props.type]} size={props.size} />
    </div>
  );
};

const colors = {
  primary: '#324B6F',
  secondary: '#F2F2F0',
};
