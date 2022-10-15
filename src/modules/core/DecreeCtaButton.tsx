import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';

/**
 * @typedef DecreeCtaButtonProps
 */
type DecreeCtaButtonProps = {
  mode?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A button component with preset styles.
 *
 * @component
 * @example
 * // primary
 * <DecreeCtaButton>Subscribe</DecreeCtaButton>
 * // secondary
 * <DecreeCtaButton mode="secondary">Shop</DecreeCtaButton>
 *
 * @param {DecreeCtaButtonProps} props
 * @returns JSX.Element
 */
export const DecreeCtaButton: React.FC<DecreeCtaButtonProps> = props => {
  const {mode = 'primary', ...buttonProps} = props;
  const Component = buttons[mode];

  return <Component {...buttonProps}>{props.children}</Component>;
};

const Primary = tw.button`
  bg-blue-dark 
  text-white 
  px-4 
  py-2
`;

const Secondary = tw.button`
  bg-white 
  text-black
  px-4 
  py-2
`;

const buttons: {[key: string]: React.ComponentType} = {
  primary: Primary,
  secondary: Secondary,
};
