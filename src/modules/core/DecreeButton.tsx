import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';
import {DecreeSpinner} from './DecreeSpinner';
import {DecreeText} from './DecreeText';

/**
 * @typedef DecreeButtonProps
 */
type DecreeButtonProps = {
  mode?: 'primary' | 'secondary' | 'text';
  /** if you want to override the existing DecreeText of the component */
  textClassName?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A button component with preset styles.
 *
 * @component
 * @example
 * // primary
 * <DecreeButton>Add to Cart</DecreeButton>
 * // secondary
 * <DecreeButton mode="secondary">Get Sample</DecreeButton>
 * // text
 * <DecreeButton mode="text">Reset</DecreeButton>
 *
 * @param {DecreeButtonProps} props
 * @returns JSX.Element
 */
export const DecreeButton: React.FC<DecreeButtonProps> = props => {
  const {mode = 'primary', textClassName, loading, ...buttonProps} = props;
  const Component = buttons[mode];

  return (
    <Component {...buttonProps}>
      {loading ? (
        <DecreeSpinner
          type={mode === 'primary' ? 'secondary' : 'primary'}
          size={16}
        />
      ) : typeof props.children === 'string' ? (
        <DecreeText className={textClassName} size={12}>
          {props.children}
        </DecreeText>
      ) : (
        props.children
      )}
    </Component>
  );
};

const Primary = tw.button`
  outline-none focus:outline-none
  px-3 py-2 font-sans text-white rounded-md bg-blue-dark
  disabled:opacity-50
`;

const Secondary = tw.button`
  outline-none focus:outline-none
  px-3 py-2 font-sans text-blue-dark rounded-md bg-blue-light border border-blue-dark
  disabled:opacity-50
`;

const Text = tw.button`
  outline-none focus:outline-none
  px-3 py-2 font-sans text-blue-dark rounded-md
  disabled:opacity-50
`;

const buttons: {[key: string]: React.ComponentType} = {
  primary: Primary,
  secondary: Secondary,
  text: Text,
};
