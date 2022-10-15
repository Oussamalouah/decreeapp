import {$Keys} from 'utility-types';
import {UseFormReturn} from 'react-hook-form';
import React from 'react';
import {DecreeDropdown} from '../../../core/DecreeDropdown';
import clsx from 'clsx';
import {AddressBookFormState} from '../AddressBookFormScreen';

type Props = {
  label?: string;
  defaultValue?: string;
  required?: boolean;
  type?: 'short' | 'long';
  formTitle: $Keys<AddressBookFormState>;
  form: UseFormReturn<AddressBookFormState>;
  items: {name: string; value: string}[];
};

export const AddressBookDropdown: React.VFC<Props> = props => {
  const {type = 'short'} = props;

  return (
    <DecreeDropdown
      textSize={16}
      items={props.items}
      label={props.label}
      required={props.required}
      defaultValue={props.defaultValue}
      displayLabel={!!props.label}
      labelClassName="text-gray-medium"
      className={clsx([
        'text-base rounded border-[1px] border-gray-dark h-[50px] px-3 justify-center',
        {'w-[80px]': type === 'short'},
        {'tablet:min-w-[158px]': type === 'long'},
      ])}
      containerClassName="space-y-[6px]"
      {...props.form.register(props.formTitle)}
    />
  );
};
