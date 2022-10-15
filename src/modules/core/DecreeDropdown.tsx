import React from 'react';
import styled from 'styled-components';
import downIcon from '../../assets/svg/down_icon.svg';
import clsx from 'clsx';
import {DecreeText} from './DecreeText';

/**
 * @typedef DecreeDropdownProps
 */
export type DecreeDropdownProps = {
  items: {value: string; name: string}[];
  name?: string;
  label?: string;
  fontStyle?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  displayLabel?: boolean;
  required?: boolean;
  labelClassName?: string;
  containerClassName?: string;
  textSize?: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

/**
 * Different types of dropdown
 *
 * @component
 * @example
 * <DecreeDropdown items={['Example']} />
 *
 * @param {DecreeDropdownProps} props
 * @return JSX.Element
 */
export const DecreeDropdown = React.forwardRef<
  HTMLSelectElement,
  DecreeDropdownProps
>((props, ref) => {
  const {
    fontStyle,
    label,
    items,
    required,
    className,
    labelClassName,
    containerClassName,
    textSize,
    displayLabel,
    ...rest
  } = props;

  return (
    <div className={containerClassName}>
      {label && displayLabel && (
        <DecreeText size={textSize || 18} className={labelClassName}>
          {label}
          {required && '*'}
        </DecreeText>
      )}
      <Component
        className={clsx([
          'w-full rounded-lg h-9 text-sm focus:outline-none',
          {
            'bg-gray-light cursor-not-allowed': props.disabled,
            'bg-white border-[0.5px]': !props.disabled,
          },
          className,
        ])}
        style={{fontFamily: label === 'Font' ? fontStyle : ''}}
        ref={ref}
        {...rest}
      >
        {items?.map(item => {
          return (
            <option
              key={item.name}
              value={item.value}
              style={{fontFamily: label === 'Font' ? item.value : ''}}
            >
              {item.name}
            </option>
          );
        })}
      </Component>
    </div>
  );
});

const Component = styled.select`
  ${p => (p.disabled ? '' : `background: url(${downIcon}) no-repeat right;`)}
  -webkit-appearance: none;
  background-position-x: 95%;
  padding: 8px 20px 8px 8px;
`;
