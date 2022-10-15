import React from 'react';
import {CircleSpinner} from 'react-spinners-kit';
import tw from 'tailwind-styled-components/dist/tailwind';

/**
 * @typedef AuthButtonProps
 */
type AuthButtonProps = {
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button component with styling shared by the auth components
 *
 * @component
 * @example
 * <AuthButton>RESET PASSWORD</AuthButton>
 *
 * @param {AuthButtonProps} props HTMLButtonElement props
 * @returns JSX.Element
 */
export const AuthButton: React.FC<AuthButtonProps> = props => {
  const {loading, ...buttonProps} = props;
  return (
    <Button {...buttonProps}>
      {loading ? (
        <div className="flex flex-col items-center">
          <CircleSpinner size={21} />
        </div>
      ) : (
        props.children
      )}
    </Button>
  );
};

const Button = tw.button<{disabled?: boolean}>`
  w-full min-h-[44px] text-white rounded outline-none bg-blue-dark text-sm focus:outline-none
  ${p => (p.disabled ? 'cursor-default opacity-75' : '')}
`;
