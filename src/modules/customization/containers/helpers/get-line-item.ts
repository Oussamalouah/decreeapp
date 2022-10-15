import {getCheckout_node_Checkout} from '../../../../api/operations/queries/__generated__/getCheckout';
import {customAttributeFields} from '../../../../utils/constants/custom-attribute.constants';

type Args = {
  search: string;
  checkoutData: {node: getCheckout_node_Checkout} | undefined | null;
};

/**
 * Checks if the search id is valid and return a line item
 *
 * @param search
 * @param checkoutData
 *
 * @returns lineItem
 */
export const getLineItem = ({search, checkoutData}: Args) => {
  if (!search || !checkoutData) return;

  // eslint-disable-next-line
  const searchParam = new URLSearchParams(search);
  const svgFileId = searchParam.get('id');

  const lineItems = checkoutData?.node.lineItems.edges;
  // Basing it of the SVG file id since the id duplicates with lineItems ID
  const productLineItemIndex = lineItems?.findIndex(item => {
    const customAttribute = item.node?.customAttributes;

    return (
      svgFileId &&
      customAttribute?.[0]?.value?.includes(svgFileId) &&
      customAttribute?.[0]?.key === customAttributeFields.SVG_FILE
    );
  });

  const envelopeLineItemIndex = lineItems?.findIndex(item => {
    const customAttribute = item.node?.customAttributes;

    return (
      svgFileId &&
      customAttribute?.[0]?.value?.includes(svgFileId) &&
      customAttribute?.[0]?.key === customAttributeFields.PARENT_SVG_FILE
    );
  });

  return {
    productLineItem: lineItems?.[productLineItemIndex],
    envelopeLineItem: lineItems?.[envelopeLineItemIndex],
  };
};
