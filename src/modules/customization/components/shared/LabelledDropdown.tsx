import React from 'react';
import {DecreeDropdown} from '../../../core/DecreeDropdown';
import {GridFieldItem} from './GridFieldItem';

type Props = {
  name?: string;
  items: {value: string; name: string}[];
  label: string;
  fontStyle?: string;
  value?: string;
  size?: 'long' | 'short';
  onSelect?: (value: string) => void;
  disabled?: boolean;
};

export const LabelledDropdown = React.forwardRef<HTMLSelectElement, Props>(
  (props, ref) => {
    return (
      <GridFieldItem
        label={props.label}
        size={props.size}
        content={
          <DecreeDropdown
            ref={ref}
            name={props.name}
            label={props.label}
            items={props.items}
            value={props.value}
            disabled={props.disabled}
            fontStyle={props.fontStyle}
            onChange={value => {
              props.onSelect?.(value.currentTarget.value);
            }}
          />
        }
      />
    );
  }
);

LabelledDropdown.defaultProps = {
  size: 'long' as const,
};
