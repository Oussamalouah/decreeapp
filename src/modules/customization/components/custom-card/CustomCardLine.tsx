import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  Dispatch,
} from 'react';
import Konva from 'konva';
import {Line} from 'react-konva';
import {TransformerWrapper} from './TransformerWrapper';
import {
  EditModes,
  LineProps,
  PencilSettings,
} from '../../models/CustomCardElements';
import {Environment} from '../../../../Environment';

type Props = {
  isSelected: boolean;
  pencilSettings: PencilSettings;
  line: LineProps;
  editMode: EditModes;
  userClickedLine: () => void;
  setLines: Dispatch<React.SetStateAction<LineProps[]>>;
};

export const CustomCardLine = (props: Props) => {
  const {services} = Environment.current();

  const lineRef = useRef<Konva.Line>(null);
  const [pencilSettings, setPencilSettings] = useState(props.pencilSettings);

  useLayoutEffect(() => {
    const savedSettings = services.storage.getItem(props.line.name);
    if (savedSettings) {
      setPencilSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    services.storage.storeItem(props.line.name, JSON.stringify(pencilSettings));
  }, [pencilSettings]);

  return (
    <TransformerWrapper
      name={props.line.name}
      isSelected={props.isSelected}
      konvaNode={lineRef.current}
    >
      <Line
        ref={lineRef}
        x={props.line?.x}
        y={props.line?.y}
        name={props.line.name}
        rotation={props.line?.rotation}
        points={props.line.points}
        // use ref instead of prop pencilStrokeColor so it doesnt change
        // when user changed color
        stroke={pencilSettings.strokeColor}
        onClick={props.userClickedLine}
        draggable={props.editMode === EditModes.SELECT || props.isSelected}
        strokeWidth={5}
        tension={0.5}
        lineCap="round"
        globalCompositeOperation="source-over"
        scaleX={props.line?.scaleX || 1}
        scaleY={props.line?.scaleY || 1}
        onTransformEnd={e => {
          const {x, y, scaleX, scaleY, rotation, name} = e.target.attrs;

          props.setLines(prev =>
            prev.map(line => {
              const newLine = {...line, x, y, scaleX, scaleY, rotation};

              return line.name === name ? newLine : line;
            })
          );
        }}
        onDragEnd={e => {
          const {name, x, y} = e.target.attrs;

          props.setLines(prev =>
            prev.map(line => {
              const newLine = {...line, x, y};

              return line.name === name ? newLine : line;
            })
          );
        }}
      />
    </TransformerWrapper>
  );
};
