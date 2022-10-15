/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {PaperSettingsFormState} from '../../../models/PaperSettingsFormState';
import {PaperSettingsOptions} from '../../../models/PaperSettingsOptions';
import {ColorPicker} from '../ColorPicker';
import {LabelledDropdown} from '../LabelledDropdown';

type PaperCustomizerField = 'paperColor' | 'quantity';

/**
 * @typedef PaperCustomizerProps
 */
type PaperCustomizerProps = {
  form: UseFormReturn<PaperSettingsFormState>;
  options: PaperSettingsOptions;
  hiddenFields?: Array<PaperCustomizerField>;
  isWaxSeal?: boolean;
  disabled?: boolean;
};

const isFieldHidden = (
  field: PaperCustomizerField,
  hiddenFields: Array<PaperCustomizerField> = []
) => {
  return hiddenFields.findIndex(hiddenField => hiddenField === field) !== -1;
};

/**
 * A section in view package/product displays all fields for paper customization
 * @component
 * @param {PaperCustomizerProps} props
 * @returns JSX.Element
 */
export const PaperCustomizer = (props: PaperCustomizerProps) => {
  return (
    <>
      {!isFieldHidden('quantity', props.hiddenFields) && (
        <Controller
          control={props.form.control}
          name="quantity"
          render={({field}) => (
            <LabelledDropdown
              label={'Quantity'}
              items={props.options.quantityList}
              onSelect={field.onChange}
              {...field}
            />
          )}
        />
      )}
      {!isFieldHidden('paperColor', props.hiddenFields) && (
        <Controller
          control={props.form.control}
          name="paperColor"
          render={({field}) => {
            // to omit the ref
            const {ref, ...fieldProperties} = field;
            return (
              <ColorPicker
                label={!props.isWaxSeal ? 'Paper Color' : 'Wax Seal Color'}
                activeColor={field.value}
                colors={props.options.paperColorList}
                onClick={field.onChange}
                disabled={props.disabled}
                {...fieldProperties}
              />
            );
          }}
        />
      )}
    </>
  );
};
