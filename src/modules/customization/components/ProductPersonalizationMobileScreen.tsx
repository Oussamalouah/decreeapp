import React from 'react';
import {DecreeSvgEditor, SvgEditorAttributes} from '../../core/DecreeSvgEditor';
import {ProductCustomizationProps} from '../containers/ProductCustomizationContainer';
import {NotesCustomizer} from './shared/sections/NotesCustomizer';
import {DecreeButton} from '../../core/DecreeButton';
import clsx from 'clsx';
import {DecreeSpinner} from '../../core/DecreeSpinner';
import {StationeryPreview} from './shared/sections/StationeryPreview';
import {StationeryTypes} from '../../../utils/constants/stationery-type.constants';

type Props = {
  svgUrl: string;
  svgEditorAttributes: SvgEditorAttributes;
  isEditMode?: boolean;
  isMobilePersonalizationShown?: boolean;
  userClickedCancel: () => void;
  userClickedPersonalize: () => void;
  hideMobilePersonalization: () => void;
} & ProductCustomizationProps;

/**
 * A screen for personalizing products that's only intended for mobile.
 * Desktop does not have a separate screen for editing a product.
 * @param {Props} props
 * @returns JSX.Element
 */
export const ProductPersonalizationMobileScreen = (props: Props) => {
  return (
    <div
      className={clsx({
        'px-4 py-10 -mx-4 -mb-10 bg-offwhite':
          props.isMobilePersonalizationShown,
      })}
    >
      <div className="space-y-6">
        <StationeryPreview containerClassName="bg-offwhite px-8">
          {props.loading ? (
            // To prevent the svg from flashing every rerender while loading
            <DecreeSpinner type="primary" />
          ) : (
            <DecreeSvgEditor
              allowSaveToStorage={props.productSvgEditorAllowSaveToStorage}
              isEditMode={props.isEditMode}
              productHasLogo={props.productHasLogo}
              svgUrl={props.svgUrl}
              shouldCenterText={
                props.stationeryType === StationeryTypes.GREETING
              }
              elements={props.productStationeryFields}
              attributes={props.svgEditorAttributes}
              onSaveSvgChangesToStorage={props.saveSvgChangesToStorage}
              onSetSvgBlob={props.setSvgBlob}
              uploadedLogo={props.uploadedLogo}
            />
          )}
        </StationeryPreview>
        <div
          className={clsx([
            'flex flex-col items-center',
            {hidden: props.isMobilePersonalizationShown},
          ])}
        >
          <DecreeButton type="button" onClick={props.userClickedPersonalize}>
            Customize
          </DecreeButton>
        </div>
        <div className={clsx({hidden: !props.isMobilePersonalizationShown})}>
          <NotesCustomizer
            productHasLogo={props.productHasLogo}
            isLoading={props.loading}
            isDisabled={false}
            isBusinessCard={props.stationeryType === StationeryTypes.BUSINESS}
            hasLogoUploaded={!!props.uploadedLogo}
            formInnerDivClassName="gap-6 space-y-4"
            notesCustomizerForm={props.notesCustomizerForm}
            svgUrl={props.svgUrl}
            // Allow capture of svg default values if we're not in edit mode.
            allowDefaultValuesCapture={!props.isEditMode}
            onCaptureNotesDefaultValues={props.setDefaultNotesValues}
            elements={props.productStationeryFields}
            submitText="Save"
            cancelButtonClassName="w-1/3"
            submitButtonClassName="w-1/3"
            onNotesUpdate={formState => {
              props.setProductStationeryFields(
                Object.keys(formState).map(key => ({
                  id: key,
                  text: formState[key],
                }))
              );
              props.hideMobilePersonalization();
            }}
            userClickedCancel={props.userClickedCancel}
            userClickedUpload={props.userClickedUploadLogo}
            userClickedDeleteLogo={props.userClickedDeleteLogo}
          />
        </div>
      </div>
    </div>
  );
};
