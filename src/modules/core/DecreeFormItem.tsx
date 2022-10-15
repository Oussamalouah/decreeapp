import clsx from 'clsx';
import React from 'react';
import {DecreeText, DecreeTextSize} from './DecreeText';

/**
 * @typedef FormItemProps
 */
type DecreeFormItemProps = {
  label?: string;
  errorText?: string;
  labelClassName?: string;
  textSize?: DecreeTextSize;
  required?: boolean;
  inputSuffix?: React.ReactNode;
  containerClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * A form input item component with styling shared by the auth components
 *
 * @component
 * @example
 * <DecreeFormItem label="Email" placeholder="Your Email Address" />
 *
 * @param {DecreeFormItemProps} props HTMLInputElement props
 * @returns JSX.Element
 */
export const DecreeFormItem = React.forwardRef<
  HTMLInputElement,
  DecreeFormItemProps
>((props, ref) => {
  const {
    label,
    errorText,
    required,
    labelClassName,
    textSize,
    inputSuffix,
    className,
    containerClassName,
    ...inputProps
  } = props;
  return (
    <div className={clsx(['space-y-[6px]', containerClassName])}>
      {label && (
        <DecreeText size={textSize || 18} className={labelClassName}>
          {label}
          {required && '*'}
        </DecreeText>
      )}
      <div className="flex">
        <DecreeText size={textSize || 18} className="flex-1">
          <input
            ref={ref}
            className={clsx([
              'w-full p-3 bg-white border rounded outline-none border-gray-dark',
              className,
            ])}
            {...inputProps}
          />
        </DecreeText>
        {inputSuffix}
      </div>
      {errorText && (
        <>
          <div className="h-[2px]" />
          <small className="text-red-500">{errorText}</small>
        </>
      )}
    </div>
  );
});
