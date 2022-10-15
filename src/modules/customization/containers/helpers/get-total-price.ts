import _ from 'lodash';
import {UseFormReturn} from 'react-hook-form';
import {getProduct_node_Product} from '../../../../api/operations/queries/__generated__/getProduct';
import {EnvelopeSettingsFormState} from '../../models/EnvelopeSettingsFormState';
import {PackageProduct} from '../../models/PackageProduct';
import {PaperSettingsFormState} from '../../models/PaperSettingsFormState';

type Args = {
  product: getProduct_node_Product | undefined;
  settingsForm:
    | UseFormReturn<PaperSettingsFormState>
    | UseFormReturn<EnvelopeSettingsFormState>;
  variantIndex?: number;
};

/**
 * Gets the total price for the product
 *
 * @param product
 * @param paperSettingsForm
 *
 * @returns number
 */
export const getProductTotalPrice = ({
  product,
  settingsForm,
  variantIndex = 0,
}: Args) => {
  if (!product) return 0;

  return (
    (_.toNumber(product.variants.edges[variantIndex]?.node.priceV2.amount) ||
      0) * (_.toNumber(settingsForm.getValues().quantity) || 0)
  );
};

/**
 * Gets the total price for a package
 *
 * @param packageProducts
 * @returns number;
 */
export const getPackageTotalPrice = (args: {
  packageProducts: PackageProduct[];
  fallbackQuantity: number;
}) => {
  const {packageProducts, fallbackQuantity} = args;

  return packageProducts.reduce((total, product) => {
    const {node, quantityPreset} = product;

    const price =
      node.variants.edges[product.productVariantIndex || 0].node.priceV2.amount;
    const quantity = parseInt(quantityPreset?.value || '0') || fallbackQuantity;

    return total + price * quantity;
  }, 0);
};
