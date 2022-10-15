/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactModal from 'react-modal';
import {UseFormReturn, Controller} from 'react-hook-form';
import {DecreeButton} from '../../../../core/DecreeButton';
import {EnvelopeSettingsFormState} from '../../../models/EnvelopeSettingsFormState';
import {SettingOption} from '../../../models/SettingOption';
import {ColorPicker} from '../ColorPicker';
import clsx from 'clsx';
import {DecreeText} from '../../../../core/DecreeText';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  envelopeColors: SettingOption[];
  liningColors: SettingOption[];
  previewImageSrc: string;
  form: UseFormReturn<EnvelopeSettingsFormState>;
  disabled?: boolean;
  userClickedSave: () => void;
  isLaptopWidth: boolean;
};

export const EnvelopePreview = (props: Props) => {
  if (props.isLaptopWidth) {
    return (
      <ReactModal
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        className="h-full flex justify-center items-center"
        style={{overlay: {zIndex: 20}}}
      >
        <PreviewComponent {...props} />
      </ReactModal>
    );
  }

  if (props.isOpen) return <PreviewComponent {...props} />;

  return null;
};

const PreviewComponent = (props: Props) => {
  return (
    <div className="w-full max-w-screen-tablet laptop:max-h-screen m-auto overflow-auto">
      <div className="space-y-6 laptop:px-10 laptop:py-6 laptop:bg-offwhite laptop:border">
        <div className="space-y-6">
          <div
            className={clsx('flex justify-between', {
              hidden: !props.isLaptopWidth,
            })}
          >
            <DecreeButton
              mode="secondary"
              className="bg-transparent"
              onClick={props.onClose}
            >
              Cancel
            </DecreeButton>
            <DecreeButton type="button" onClick={props.userClickedSave}>
              Save
            </DecreeButton>
          </div>
          <img src={props.previewImageSrc} alt="Envelope Preview" />
          <DecreeText
            size={24}
            className="text-center text-blue-dark font-serif font-bold laptop:hidden"
          >
            Envelope Preview
          </DecreeText>
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
          <div
            className={clsx('flex justify-between', {
              hidden: props.isLaptopWidth,
            })}
          >
            <DecreeButton
              mode="secondary"
              className="bg-transparent"
              onClick={props.onClose}
            >
              Cancel
            </DecreeButton>
            <DecreeButton type="button" onClick={props.userClickedSave}>
              Save
            </DecreeButton>
          </div>
        </div>
      </div>
    </div>
  );
};
