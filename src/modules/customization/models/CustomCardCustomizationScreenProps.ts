import {
  AnnotationProps,
  BoxProps,
  CircleProps,
  EditModes,
  ImageProps,
  LineProps,
  LineSettings,
  PaperSettings,
  PencilSettings,
  ShapeSettings,
  StraightLineAnnotationProps,
  StraightLineProps,
  TextProps,
  TextSettings,
} from './CustomCardElements';
import {ProductEdges} from '../../store/containers/StoreScreenContainer';
import React, {Dispatch, KeyboardEvent, RefObject} from 'react';
import Konva from 'konva';
import {SettingOption} from './SettingOption';
import {Optional} from 'utility-types';
import {KonvaEventObject} from 'konva/lib/Node';

export type CustomCardCustomizationScreenProps = {
  stationeryTitle: string;
  stationeryType: string;
  selectedObjName: string;
  loading: boolean;
  isEditMode: boolean;
  totalPrice: number;
  editMode: EditModes;

  symbols: ProductEdges;
  glyphs: ProductEdges;

  // Refs
  stageRef: RefObject<Konva.Stage>;
  uploadRef: RefObject<HTMLInputElement>;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  backgroundRef: RefObject<Konva.Rect>;
  outerStageRef: RefObject<HTMLDivElement>;

  // Props for when in paper mode
  paperSettings: PaperSettings;
  paperOptions: {
    sizes: SettingOption[];
    quantities: SettingOption[];
    colors: SettingOption[];
  };
  userClickedPaperSetting: (setting: Optional<PaperSettings>) => void;

  // Props for when in text mode
  texts: TextProps[];
  textOptions: {
    colors: SettingOption[];
    families: SettingOption[];
    weights: SettingOption[];
    lineHeights: SettingOption[];
    letterSpacings: SettingOption[];
  };
  textSettings: TextSettings;
  userDoubleClickedText: () => void;
  userClickedTextSetting: (setting: Optional<TextSettings>) => void;
  setTexts: Dispatch<React.SetStateAction<TextProps[]>>;

  // Props for when in image mode
  images: ImageProps[];
  setImages: Dispatch<React.SetStateAction<ImageProps[]>>;

  // Props for when in pencil mode
  lines: LineProps[];
  pencilOptions: {strokeColors: SettingOption[]};
  pencilSettings: PencilSettings;
  userClickedPencilSetting: (setting: Optional<PencilSettings>) => void;
  setLines: Dispatch<React.SetStateAction<LineProps[]>>;

  // Props for when in box or circle mode
  boxes: BoxProps[];
  circles: CircleProps[];
  shapeOptions: {strokeColors: SettingOption[]; fillColors: SettingOption[]};
  shapeSettings: ShapeSettings;
  userClickedShapeSetting: (setting: Optional<ShapeSettings>) => void;
  setBoxes: Dispatch<React.SetStateAction<BoxProps[]>>;
  setCircles: Dispatch<React.SetStateAction<CircleProps[]>>;

  userClickedToolbarItem: (editMode: EditModes) => void;
  userClickedAddToCart: () => void;
  userClickedGetProof: () => void;
  userClickedReset: () => void;
  userClickedObj: (name: string) => void;

  // Handles the stage events
  onStageMouseDown: (event: KonvaEventObject<MouseEvent | TouchEvent>) => void;
  onStageMove: (event: KonvaEventObject<MouseEvent | TouchEvent>) => void;
  onStageMouseUp: () => void;

  onContainerKeyUp: (event: KeyboardEvent) => void;

  userAddedImage: (src: string) => void;

  // Text area props
  textAreaValue: string;
  isTextAreaVisible: boolean;
  newAnnotation: AnnotationProps | null;
  selectedTextProperties: Konva.Node | null;

  newStraightLineAnnotation: StraightLineAnnotationProps | null;
  straightLines: StraightLineProps[];
  lineSettings: LineSettings;
  lineSettingsOptions: {
    strokeColors: SettingOption[];
    lineBonds: SettingOption[];
  };
  userClickedLineSetting: (setting: Optional<LineSettings>) => void;
  setStraightLines: Dispatch<React.SetStateAction<StraightLineProps[]>>;

  // Handles the textarea events
  onTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTextAreaBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
};
