import React from 'react';
import Modal from 'react-modal';
import {CircleSpinner} from 'react-spinners-kit';

/**
 * @typedef DecreeHeaderProps
 */
type DecreeModalSpinnerProps = {
  loading: boolean;
  size: number;
  color: string;
};

/**
 * A modal with a customizable spinner component inside
 *
 * @component
 * @example
 * <DecreeModalSpinner loading={true} size={50} color={'#686769'}/>
 *
 * @param {DecreeModalSpinnerProps} props
 * @return JSX.Element
 */
export const DecreeModalSpinner: React.FC<DecreeModalSpinnerProps> = props => {
  return (
    <Modal
      className={
        'inset-y-2/4 inset-x-auto ml-[50%] mt-[50vh] bg-transparent border-0 outline-none'
      }
      isOpen={props.loading}
      ariaHideApp={false}
    >
      <CircleSpinner
        loading={props.loading}
        size={props.size}
        color={props.color}
      />
    </Modal>
  );
};
