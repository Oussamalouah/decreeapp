/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef, useState} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {laptopWidth} from '../../../../../utils/constants/screen-width.constants';
import {DecreeButton} from '../../../../core/DecreeButton';
import {DecreeText} from '../../../../core/DecreeText';
import {HandleWindowResize} from '../../../../core/HandleWindowResize';
import {EnvelopeSettingsFormState} from '../../../models/EnvelopeSettingsFormState';
import {SettingOption} from '../../../models/SettingOption';
import {ColorPicker} from '../ColorPicker';
import {LabelledDropdown} from '../LabelledDropdown';
import {EnvelopePreview} from './EnvelopePreview';

type Props = {
  envelopeColors: SettingOption[];
  liningColors: SettingOption[];
  quantityList: SettingOption[];
  form: UseFormReturn<EnvelopeSettingsFormState>;
  disabled?: boolean;
  previewImageSrc: string;
  userClickedPreview: () => void;
  isEnvelopeOpen: boolean;
  userClosedPreview: () => void;
};

export const EnvelopeCustomizer = (props: Props) => {
  const [isLaptopWidth, setIsLaptopWidth] = useState(
    window.innerWidth >= laptopWidth
  );
  const previousDataRef = useRef<EnvelopeSettingsFormState>({
    liningColor: '',
    envelopeColor: '',
    quantity: '',
  });

  return (
    <>
      <HandleWindowResize
        onResize={() => setIsLaptopWidth(window.innerWidth >= laptopWidth)}
      />
      {(!props.isEnvelopeOpen || isLaptopWidth) && (
        <>
          <DecreeText
            size={23}
            className="font-serif font-bold text-blue-dark text-center laptop:text-left"
          >
            Customize your envelope:
          </DecreeText>
          {/* <DecreeText size={16} className="text-blue-dark">
            Envelope Size: 5 inch x 6 inch
          </DecreeText> */}
          <Controller
            control={props.form.control}
            name="envelopeColor"
            render={({field}) => {
              // to omit the ref
              const {ref, ...fieldProperties} = field;
              return (
                <ColorPicker
                  label="Envelope Color"
                  activeColor={field.value}
                  colors={props.envelopeColors}
                  onClick={field.onChange}
                  disabled={props.disabled}
                  {...fieldProperties}
                />
              );
            }}
          />
          <Controller
            control={props.form.control}
            name="liningColor"
            render={({field}) => {
              const {ref, ...fieldProperties} = field;
              return (
                <ColorPicker
                  label="Lining Color"
                  activeColor={field.value}
                  colors={props.liningColors}
                  onClick={field.onChange}
                  disabled={props.disabled}
                  {...fieldProperties}
                />
              );
            }}
          />
          <Controller
            control={props.form.control}
            name="quantity"
            render={({field}) => (
              <LabelledDropdown
                label="Quantity"
                items={props.quantityList}
                onSelect={field.onChange}
                {...field}
              />
            )}
          />
          <div className="flex justify-center laptop:justify-start">
            <DecreeButton
              type="button"
              mode="secondary"
              onClick={() => {
                const {liningColor, envelopeColor} = props.form.getValues();

                previousDataRef.current = {
                  liningColor,
                  envelopeColor,
                  quantity: '',
                };

                props.userClickedPreview();
              }}
            >
              Preview
            </DecreeButton>
          </div>
        </>
      )}
      <EnvelopePreview
        form={props.form}
        isOpen={props.isEnvelopeOpen}
        onClose={() => {
          const previousData = previousDataRef.current;

          props.form.setValue('liningColor', previousData.liningColor);
          props.form.setValue('envelopeColor', previousData.envelopeColor);

          props.userClosedPreview();
        }}
        envelopeColors={props.envelopeColors}
        liningColors={props.liningColors}
        previewImageSrc={props.previewImageSrc}
        disabled={props.disabled}
        userClickedSave={() => {
          const {liningColor, envelopeColor} = props.form.getValues();

          props.form.setValue('liningColor', liningColor);
          props.form.setValue('envelopeColor', envelopeColor);

          props.userClosedPreview();
        }}
        isLaptopWidth={isLaptopWidth}
      />
    </>
  );
};
