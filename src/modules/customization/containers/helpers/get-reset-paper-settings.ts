import {PaperSettingsFormState} from '../../models/PaperSettingsFormState';
import {PaperSettingsOptions} from '../../models/PaperSettingsOptions';

/**
 * Gets the reset values for the paper settings
 *
 * @param isEditMode
 * @param stringifiedSvgAttributes
 * @param paperSettingsOptions
 *
 * @returns PaperSettingsFormState
 */
export const getResetPaperSettings = (
  /** Checks if user is in edit mode */
  isEditMode: boolean,
  /** Options for the paper settings */
  paperSettingsOptions: PaperSettingsOptions,
  /** Attributes from the custom attributes of the lineItem */
  stringifiedSvgAttributes: string | null | undefined
) => {
  const parsedDefaultAttributes = stringifiedSvgAttributes
    ? JSON.parse(stringifiedSvgAttributes)
    : {};

  const resetPaperSettings: PaperSettingsFormState = {
    paperColor: isEditMode
      ? parsedDefaultAttributes?.paperColor
      : paperSettingsOptions?.paperColorList[0]?.value,
    quantity: paperSettingsOptions.quantityList[0]?.value,
  };

  return resetPaperSettings;
};
