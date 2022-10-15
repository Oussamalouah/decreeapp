import {getProduct_node_Product} from '../../../../api/operations/queries/__generated__/getProduct';
import {getCheckout_node_Checkout_lineItems_edges_node_variant_product} from '../../../../api/operations/queries/__generated__/getCheckout';
import {extractMetadataField} from '../../../../utils/metadata-field-extractor';
import {metadataFields} from '../../../../utils/constants/metafields.constants';
import {
  LineSettings,
  PaperOrientation,
  PaperSettings,
  PencilSettings,
  ShapeSettings,
  TextSettings,
} from '../../models/CustomCardElements';
import {Alignment} from '../../components/shared/AlignmentPicker';
import {quantityPresetFormatter} from '../../../../utils/quantity-preset-formatter';
import {Environment} from '../../../../Environment';
import {customCardStorage} from '../../../../utils/constants/custom-card-storage.constants';

const {
  PENCIL_STROKE_COLOR,
  SHAPE_STROKE_COLOR,
  SHAPE_FILL_COLOR,
  FONT_COLOR,
  FONT_STYLE,
  FONT_WEIGHT,
  QUANTITY_PRESET,
  PAPER_COLOR,
  LINE_STROKE_COLOR,
  LETTER_SPACING,
  LINE_HEIGHT,
} = metadataFields;

const lineBond = [
  {name: 'Solid', value: 'Solid'},
  {name: 'Dashed', value: 'Dashed'},
];

export const getCustomCardOptions = (
  productNode:
    | getProduct_node_Product
    | getCheckout_node_Checkout_lineItems_edges_node_variant_product
    | undefined
) => {
  const {services} = Environment.current();

  const pencilStrokeColors = extractMetadataField(
    productNode,
    PENCIL_STROKE_COLOR
  );
  const shapeStrokeColors = extractMetadataField(
    productNode,
    SHAPE_STROKE_COLOR
  );
  const shapeFillColors = extractMetadataField(productNode, SHAPE_FILL_COLOR);
  const fontColors = extractMetadataField(productNode, FONT_COLOR);
  const fontFamilies = extractMetadataField(productNode, FONT_STYLE);
  const fontWeights = extractMetadataField(productNode, FONT_WEIGHT);
  const letterSpacings = extractMetadataField(
    productNode,
    LETTER_SPACING,
    'px'
  );
  const lineHeights = extractMetadataField(productNode, LINE_HEIGHT, 'px');
  const paperQuantities = extractMetadataField(productNode, QUANTITY_PRESET);
  const paperColors = extractMetadataField(productNode, PAPER_COLOR);
  const lineStrokeColors = extractMetadataField(productNode, LINE_STROKE_COLOR);

  const paperSizes = productNode?.options.find(
    option => option.name === 'Paper Size'
  );

  const price = productNode?.variants.edges[0].node.priceV2.amount;

  const formattedPaperQuantity = quantityPresetFormatter(
    price,
    paperQuantities
  );

  const persistedPaperSettings = services.storage.getItem(
    customCardStorage.PAPER_SETTINGS
  );

  return {
    pencilSettingsOptions: {
      strokeColors: pencilStrokeColors,
    },
    shapeSettingsOptions: {
      strokeColors: shapeStrokeColors,
      fillColors: shapeFillColors,
    },
    textSettingsOptions: {
      colors: fontColors,
      families: fontFamilies,
      weights: fontWeights,
      lineHeights: lineHeights,
      letterSpacings: letterSpacings,
    },
    paperSettingsOptions: {
      sizes:
        (paperSizes &&
          paperSizes?.values.map(value => ({name: value, value}))) ||
        [],
      quantities: formattedPaperQuantity,
      colors: paperColors,
    },
    lineSettingsOptions: {
      strokeColors: lineStrokeColors,
      lineBonds: lineBond,
    },
    initialLineSettings: {
      strokeColor: lineStrokeColors[0]?.value || '',
      lineBond: lineBond[0]?.value || '',
    } as LineSettings,
    initialPencilSettings: {
      strokeColor: pencilStrokeColors[0]?.value || '',
    } as PencilSettings,
    initialShapeSettings: {
      strokeColor: shapeStrokeColors[0]?.value || '',
      fillColor: shapeFillColors[0]?.value || '',
      strokeWidth: 1,
    } as ShapeSettings,
    initialTextSettings: {
      color: fontColors[0]?.value || '',
      family: fontFamilies[0]?.value || '',
      weight: fontWeights[0]?.value || '',
      letterSpacing: letterSpacings[0]?.value || '',
      lineHeight: lineHeights[0]?.value || '',
      size: 12,
      alignment: Alignment.LEFT_ALIGN,
    } as TextSettings,
    initialPaperSettings: persistedPaperSettings
      ? JSON.parse(persistedPaperSettings)
      : ({
          dimensions: {
            height: 600,
            width: 450,
          },
          orientation: PaperOrientation.PORTRAIT,
          color: paperColors[0]?.value || '',
          size: paperSizes?.values?.[0] || '',
          quantity: formattedPaperQuantity[0]?.value || '',
        } as PaperSettings),
  };
};
