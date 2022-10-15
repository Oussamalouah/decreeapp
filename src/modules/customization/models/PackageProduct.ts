import {getPackage_node_Collection_products_edges_node} from '../../../api/operations/queries/__generated__/getPackage';
import {NotesCustomizerFormValues} from '../components/shared/sections/NotesCustomizer';

/** The type of an item in [PackageSettings] */
export type PackageProduct = {
  /** A single product in a package's products */
  node: getPackage_node_Collection_products_edges_node;
  /** The selected quantity from the package product customization modal */
  quantityPreset?: {name: string; value: string};
  /** The modified svg */
  modifiedSvg?: Blob | null;
  /** The modified svg customization values */
  modifiedSvgCustomizationValues?: NotesCustomizerFormValues;
  productVariantIndex?: number | undefined;
};
