import {getPackage_node_Collection_products} from '../../../../api/operations/queries/__generated__/getPackage';
import {metadataFields} from '../../../../utils/constants/metafields.constants';
import {extractMetadataField} from '../../../../utils/metadata-field-extractor';
import {productFontSizes} from '../../../../utils/constants/product-font-sizes.constants';
import {PaperSettingsOptions} from '../../models/PaperSettingsOptions';
import {TextSettingsOptions} from '../../models/TextSettingsOptions';
import _ from 'lodash';

const {QUANTITY_PRESET, PAPER_COLOR, FONT_COLOR, FONT_WEIGHT, FONT_STYLE} =
  metadataFields;

const metafieldsLib = {
  paperColorList: PAPER_COLOR,
  quantityList: QUANTITY_PRESET,
  fontColorList: FONT_COLOR,
  fontWeightList: FONT_WEIGHT,
  fontList: FONT_STYLE,
};

type Args = {
  packageProducts: getPackage_node_Collection_products | undefined;
  fieldsToExtract: (keyof typeof metafieldsLib)[];
};

type Option = {name: string; value: string};

type SettingsMapItem = {[key: string]: Option[]};

/**
 * Gets the intersection of all options of each setting
 * (provided through [fieldsToExtract]) of each products in a package
 *
 * @param {Args} args
 * @returns {{paperColorList: {name: string, value: string}[]}} settings map
 */
const getPackageSettingsOptions = (args: Args) => {
  const {packageProducts, fieldsToExtract} = args;

  // 1. Extract options of for each setting (e.g. paperColorList) of each product
  // [{ paperColorList: [{name, value}], quantityList: {...} }]
  const settingsMapList: SettingsMapItem[] = packageProducts?.edges.length
    ? packageProducts?.edges.map(product => {
        // Dynamically generate a setting map based on [args.fieldsToExtract]
        const map: SettingsMapItem = {};
        fieldsToExtract.forEach(field => {
          map[field] = extractMetadataField(product.node, metafieldsLib[field]);
        });
        return map;
      })
    : // If [packageProducts] is undefined or [packageProducts.edges] is empty,
      // return a map with the fields initialized as `[]`
      [...new Array(1)].map(() => {
        const map: SettingsMapItem = {};
        fieldsToExtract.forEach(field => {
          map[field] = [];
        });
        return map;
      });

  // 2. Combine all options of each setting
  // { paperColorList: [{name, value}], quantityList: [...] }
  const settingsMap: SettingsMapItem = {};
  settingsMapList?.forEach(optionMap => {
    Object.keys(optionMap).map(key => {
      if (!settingsMap[key]) {
        settingsMap[key] = [];
      }
      settingsMap[key] = [...settingsMap[key], ...optionMap[key]];
    });
  });

  // 3. Remove duplicate options out of each setting
  Object.keys(settingsMap).forEach(setting => {
    const options = settingsMap[setting];
    settingsMap[setting] = options.reduce<Option[]>((accum, current) => {
      // If the option is not yet in the resulting array.
      if (accum.findIndex(item => item.value === current.value) === -1) {
        return [...accum, current];
      } else {
        return accum;
      }
    }, []);
  });

  return settingsMap;
};

export const getPackagePaperSettingsOptions = (
  packageProducts: getPackage_node_Collection_products | undefined
): PaperSettingsOptions => {
  const settings = getPackageSettingsOptions({
    packageProducts,
    fieldsToExtract: ['paperColorList', 'quantityList'],
  }) as PaperSettingsOptions;
  return {
    ...settings,
    quantityList: settings.quantityList.sort((a, b) => {
      return parseInt(a.value) - parseInt(b.value);
    }),
  };
};

export const getPackageTextSettingsOptions = (
  packageProducts: getPackage_node_Collection_products | undefined
): TextSettingsOptions => {
  const settings = getPackageSettingsOptions({
    packageProducts,
    fieldsToExtract: ['fontColorList', 'fontWeightList', 'fontList'],
  });
  return {
    ...settings,
    fontWeightList: settings['fontWeightList'].sort((a, b) => {
      return parseInt(a.value) - parseInt(b.value);
    }),
    fontSizeList: productFontSizes,
  } as TextSettingsOptions;
};

export const getPackageVariantsIntersection = (
  packageProducts: getPackage_node_Collection_products | undefined
): string[] => {
  const variantsIntersection: string[][] = [];

  packageProducts?.edges.forEach(product => {
    const titleArray = product.node.variants.edges
      .map(variant => variant.node.title)
      .filter(title => title !== 'Default Title');

    variantsIntersection.push(titleArray);
  });

  return _.intersectionWith(...variantsIntersection, (a, b) => {
    return _.lowerCase(a) === _.lowerCase(b);
  });
};
