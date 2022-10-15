import React from 'react';
import ReactModal from 'react-modal';

type Props = {
  isOpen: boolean;
  onRequestClose?: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  contentStyle?: React.CSSProperties;
};

/**
 * A modal without any styling
 */
export const DecreeModal: React.FC<Props> = ({
  children,
  contentStyle = {},
  ...rest
}) => {
  return (
    <ReactModal
      style={{
        ...styles.modal,
        content: {
          ...styles.modal.content,
          ...contentStyle,
        },
      }}
      ariaHideApp={false}
      {...rest}
    >
      {children}
    </ReactModal>
  );
};

const styles = {
  modal: {
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.67)',
      zIndex: 20,
    },
    content: {
      border: 'none',
      borderRadius: 'unset',
      top: '50%',
      left: '50%',
      bottom: 'unset',
      right: 'unset',
      transform: 'translate(-50%, -50%)',
      padding: 'unset',
    },
  },
};
