import clsx from 'clsx';
import _ from 'lodash';
import React, {useEffect} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useSvgFields} from '../../../../../utils/hooks/use-svg-fields';
import {DecreeButton} from '../../../../core/DecreeButton';
import {DecreeFormItem} from '../../../../core/DecreeFormItem';
import {DecreeText} from '../../../../core/DecreeText';
import {SvgEditorElement} from '../../../../core/DecreeSvgEditor';
import {UploadSection} from './UploadSection';

type Props = {
  svgUrl: string;
  title?: string;
  submitText?: string;
  cancelText?: string;
  containerClassName?: string;
  formInnerDivClassName?: string;
  formFieldClassName?: string;
  formInnerDivContainerClassName?: string;
  cancelButtonClassName?: string;
  submitButtonClassName?: string;
  productHasLogo?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isBusinessCard?: boolean;
  allowDefaultValuesCapture?: boolean;
  hasLogoUploaded?: boolean;
  elements?: SvgEditorElement[];
  notesCustomizerForm: UseFormReturn<NotesCustomizerFormValues>;
  onNotesUpdate: (data: NotesCustomizerFormValues) => void;
  /** Sets the default values of customize your notes once the svg has been scanned */
  onCaptureNotesDefaultValues?: (data: NotesCustomizerFormValues) => void;
  userClickedCancel?: () => void;
  userClickedUpload?: (uploadedLogo: string) => void;
  userClickedDeleteLogo?: () => void;
};

export type NotesCustomizerFormValues = {
  [key: string]: string;
};

/**
 * A [uncontrolled] dynamically generated form based on a mark[ed] up SVG.
 * Fields are generated based on the markup:
 * - id is existent
 * - there is no "contenteditable" tag.
 *  - if there is a "contenteditable" tag, it's value is not equal to "false"
 * @constructor
 * @param props
 */
export const NotesCustomizer = (props: Props) => {
  const {data: svgFields} = useSvgFields(props.svgUrl);

  const {register, handleSubmit} = props.notesCustomizerForm;

  // Captures the default values of the svg
  useEffect(() => {
    if (!props.allowDefaultValuesCapture) return;

    // Transforms the array into an object that can be accepted by NotesCustomizerFormValues
    const svgValues = _.fromPairs(svgFields.map(e => [e.id, e.text]));
    props.onCaptureNotesDefaultValues?.(svgValues);
  }, [svgFields]);

  return (
    <form
      onSubmit={handleSubmit(props.onNotesUpdate)}
      className={clsx([
        'space-y-6',
        // Hide if no editable fields found
        {hidden: svgFields.length < 1},
      ])}
    >
      <div
        className={clsx(['space-y-4 bg-offwhite', props.containerClassName])}
      >
        <DecreeText
          className="font-serif font-bold text-blue-dark text-center laptop:text-left"
          size={23}
        >
          {props.title || 'Customize your notes:'}
        </DecreeText>
        <div className="flex">
          <div
            className={clsx([
              'flex-1 space-y-4',
              props.formInnerDivContainerClassName,
            ])}
          >
            {svgFields.map(({id, text, label, ariaLabel}) => {
              const {name, ...rest} = register(id);

              return (
                <div className={props.formInnerDivClassName} key={id}>
                  <div className={props.formFieldClassName}>
                    <DecreeFormItem
                      label={ariaLabel}
                      labelClassName="text-gray-medium block"
                      textSize={16}
                      placeholder={text || 'Write your message here'}
                      disabled={props.isDisabled}
                      className={clsx({'cursor-not-allowed': props.isDisabled})}
                      name={name}
                      {...rest}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Products with logos only */}
          <div
            className={clsx([
              'flex-1',
              {hidden: !props.productHasLogo},
              {'hidden laptop:block': props.productHasLogo},
            ])}
          >
            <div>
              <UploadSection
                isLoading={props.isLoading}
                hasLogoUploaded={props.hasLogoUploaded}
                onFileUpload={file => props.userClickedUpload?.(file)}
                userClickedDeleteLogo={() => props.userClickedDeleteLogo?.()}
                {...(props.isBusinessCard && {title: 'Upload your logo'})}
              />
            </div>
          </div>
        </div>
        {/* Products with logos only */}
        <div
          className={clsx([
            {hidden: !props.productHasLogo},
            {'laptop:hidden': props.productHasLogo},
          ])}
        >
          <UploadSection
            isLoading={props.isLoading}
            hasLogoUploaded={props.hasLogoUploaded}
            onFileUpload={file => props.userClickedUpload?.(file)}
            userClickedDeleteLogo={() => props.userClickedDeleteLogo?.()}
            {...(props.isBusinessCard && {title: 'Upload your logo'})}
          />
        </div>
        <div className="flex justify-between">
          {!!props.userClickedCancel && (
            <DecreeButton
              type="button"
              mode="secondary"
              onClick={props.userClickedCancel}
              className={props.cancelButtonClassName}
            >
              {props.cancelText || 'Cancel'}
            </DecreeButton>
          )}
          <DecreeButton
            type="submit"
            className={clsx([
              props.submitButtonClassName,
              {'cursor-not-allowed': props.isDisabled},
            ])}
            disabled={props.isDisabled}
          >
            {props.submitText || 'Update Notes'}
          </DecreeButton>
        </div>
      </div>
    </form>
  );
};
