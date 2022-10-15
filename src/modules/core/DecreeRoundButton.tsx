import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';

/**
 * @typedef DecreeRoundButtonProps
 */
type DecreeRoundButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A rounded button component with change on hover
 *
 * @component
 * @example
 * // none
 * <DecreeRoundButton>Title</DecreeRoundButton>
 * // left
 * <DecreeRoundButton position="float-left">Title</DecreeRoundButton>
 * // right
 * <DecreeRoundButton position="float-right">Title</DecreeRoundButton>
 *
 * @param {DecreeRoundButtonProps} props
 * @return JSX.Element
 */
export const DecreeRoundButton: React.FC<DecreeRoundButtonProps> = props => {
  const {children, ...buttonProps} = props;

  return <Component {...buttonProps}>{children}</Component>;
};

export const Component = tw.button`
  rounded-full border border-white font-sans py-3
  text-sm fhd:text-lg
  bg-transparent hover:bg-white text-white hover:text-black
`;
