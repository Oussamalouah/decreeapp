import {productFontSizes} from '../../../../utils/constants/product-font-sizes.constants';
import {TextSettingsFormState} from '../../models/TextSettingsFormState';
import {TextSettingsOptions} from '../../models/TextSettingsOptions';

/**
 * Gets the default values for the text settings
 *
 * @param isEditMode
 * @param textSettingsOptions
 * @param stringifiedSvgAttributes
 *
 * @returns TextSettingsFormState
 */
export const getDefaultTextSettings = (
  /** Checks if user is in edit mode */
  isEditMode: boolean,
  /** Attributes from the custom attributes of the lineItem */
  textSettingsOptions: TextSettingsOptions,
  /** Options for the text settings */
  stringifiedSvgAttributes?: string | null
) => {
  const parsedDefaultAttributes = stringifiedSvgAttributes
    ? JSON.parse(stringifiedSvgAttributes)
    : {};

  const defaultTextSettings: TextSettingsFormState = {
    fontColor:
      parsedDefaultAttributes?.fontColor ||
      textSettingsOptions.fontColorList[0]?.value ||
      '',
    fontSize: parsedDefaultAttributes?.fontSize || productFontSizes[1].value,
    fontWeight:
      parsedDefaultAttributes?.fontWeight ||
      textSettingsOptions.fontWeightList[0]?.value ||
      '',
    font:
      parsedDefaultAttributes?.fontFamily ||
      textSettingsOptions?.fontList?.[0]?.value ||
      '',
  };

  return defaultTextSettings;
};
