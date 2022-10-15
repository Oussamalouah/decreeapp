import {Alignment} from '../components/shared/AlignmentPicker';

export type PaperDimensions = {
  height: number;
  width: number;
};

export enum EditModes {
  SELECT = 'Select',
  PAPER = 'Paper',
  PENCIL = 'Pencil',
  TEXT = 'Text',
  LINE = 'Line',
  BOX = 'Box',
  CIRCLE = 'Circle',
  SYMBOLS = 'Symbols',
}

export enum ElementNames {
  TEXT = 'text',
  LINE = 'line',
  IMAGE = 'image',
  CIRCLE = 'circle',
  BOX = 'box',
  STRAIGHT_LINE = 'straightLine',
}

export type LineProps = {
  name: string;
  tool: string;
  points: number[];
  scaleX?: number;
  scaleY?: number;
  x?: number;
  y?: number;
  rotation?: number;
};

export type StraightLineProps = {
  name: string;
  rotation?: number;
} & StraightLineAnnotationProps;

export type StraightLineAnnotationProps = {
  x: number;
  y: number;
  nextX: number;
  nextY: number;
  scaleX?: number;
  scaleY?: number;
};

export type ImageProps = {
  name: string;
  src: string;
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
};

export type TextProps = {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  rotation?: number;
};

export type BoxProps = {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
};

export type CircleProps = {
  name: string;
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation?: number;
};

export type AnnotationProps = {
  type: EditModes;
  x: number;
  y: number;
  height: number;
  width: number;
};

export enum PaperOrientation {
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait',
}

export type TextSettings = {
  color: string;
  family: string;
  weight: string;
  size: number;
  letterSpacing: string;
  lineHeight: string;
  alignment: Alignment;
};

export type PaperSettings = {
  color: string;
  size: string;
  cardStyle: string;
  quantity: string;
  dimensions: PaperDimensions;
  orientation: PaperOrientation;
};

export type ShapeSettings = {
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
};

export type PencilSettings = {
  strokeColor: string;
};

export type LineSettings = {
  strokeColor: string;
  lineBond: string;
};

export type ElementsArray = {
  boxes: BoxProps[];
  circles: CircleProps[];
  straightLines: StraightLineProps[];
  texts: TextProps[];
  lines: LineProps[];
  images: ImageProps[];
};
