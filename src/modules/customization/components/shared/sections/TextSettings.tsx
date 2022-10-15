/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {ColorPicker} from '../ColorPicker';
import {LabelledDropdown} from '../LabelledDropdown';
import {productFontSizes} from '../../../../../utils/constants/product-font-sizes.constants';
import {TextSettingsFormState} from '../../../models/TextSettingsFormState';
import {TextSettingsOptions} from '../../../models/TextSettingsOptions';
import clsx from 'clsx';

export type TextCustomizerField =
  | 'fontColor'
  | 'font'
  | 'fontSize'
  | 'fontWeight';

type Props = {
  options: TextSettingsOptions;
  disabled?: boolean;
  isWaxSeal?: boolean;
  form: UseFormReturn<TextSettingsFormState>;
  hiddenFields?: Array<TextCustomizerField>;
};

const isFieldHidden = (
  field: TextCustomizerField,
  hiddenFields: Array<TextCustomizerField> = []
) => {
  return hiddenFields.findIndex(hiddenField => hiddenField === field) !== -1;
};

export const TextSettings = (props: Props) => {
  const isDivEmpty =
    isFieldHidden('fontSize', props.hiddenFields) &&
    isFieldHidden('fontWeight', props.hiddenFields);

  return (
    <>
      {!isFieldHidden('fontColor', props.hiddenFields) && (
        <Controller
          control={props.form.control}
          name="fontColor"
          render={({field}) => {
            // to omit the ref
            const {ref, ...fieldProperties} = field;
            return (
              <ColorPicker
                label={props.isWaxSeal ? 'Wax Seal Color' : 'Font Color'}
                activeColor={field.value}
                colors={props.options.fontColorList}
                onClick={field.onChange}
                disabled={props.disabled}
                {...fieldProperties}
              />
            );
          }}
        />
      )}
      {!isFieldHidden('font', props.hiddenFields) && (
        <Controller
          control={props.form.control}
          name="font"
          render={({field}) => (
            <LabelledDropdown
              label="Font"
              items={props.options.fontList}
              fontStyle={field.value}
              onSelect={field.onChange}
              disabled={props.disabled}
              {...field}
            />
          )}
        />
      )}
      {/* Remove completely to avoid unnecessary extra space */}
      {!isDivEmpty && (
        <div
          className={clsx([
            'gap-6 space-y-4 laptop:grid laptop:space-y-0',
            {'grid-cols-2': !props.isWaxSeal},
          ])}
        >
          {!isFieldHidden('fontSize', props.hiddenFields) && (
            <Controller
              control={props.form.control}
              name="fontSize"
              render={({field}) => (
                <LabelledDropdown
                  label="Font Size"
                  items={productFontSizes}
                  size={props.isWaxSeal ? 'long' : 'short'}
                  onSelect={field.onChange}
                  disabled={props.disabled}
                  {...field}
                />
              )}
            />
          )}
          {!isFieldHidden('fontWeight', props.hiddenFields) && (
            <Controller
              control={props.form.control}
              name="fontWeight"
              render={({field}) => (
                <LabelledDropdown
                  label="Font Weight"
                  items={props.options.fontWeightList}
                  size="short"
                  onSelect={field.onChange}
                  disabled={props.disabled}
                  {...field}
                />
              )}
            />
          )}
        </div>
      )}
    </>
  );
};
