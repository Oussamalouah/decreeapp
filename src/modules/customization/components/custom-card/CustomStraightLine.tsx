import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  Dispatch,
} from 'react';
import Konva from 'konva';
import {LineSettings, StraightLineProps} from '../../models/CustomCardElements';
import {TransformerWrapper} from './TransformerWrapper';
import {Line} from 'react-konva';
import {Environment} from '../../../../Environment';

type CustomStraightLineProps = {
  straightLine: StraightLineProps;
  isSelected: boolean;
  userClickedStraightLine: () => void;
  settings: LineSettings;
  setStraightLines: Dispatch<React.SetStateAction<StraightLineProps[]>>;
};
export const CustomStraightLine = (props: CustomStraightLineProps) => {
  const {services} = Environment.current();

  const lineRef = useRef<Konva.Line>(null);
  const [settings, setSettings] = useState(props.settings);

  useEffect(() => {
    if (props.isSelected) {
      setSettings(props.settings);
    }
  }, [props.settings]);

  useLayoutEffect(() => {
    const savedSettings = services.storage.getItem(props.straightLine.name);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    services.storage.storeItem(
      props.straightLine.name,
      JSON.stringify(settings)
    );
  }, [settings]);

  return (
    <TransformerWrapper
      name={props.straightLine.name}
      isSelected={props.isSelected}
      konvaNode={lineRef.current}
    >
      <Line
        dashEnabled={settings.lineBond === 'Dashed'}
        dash={[10, 10]}
        name={props.straightLine.name}
        rotation={props.straightLine?.rotation}
        onClick={props.userClickedStraightLine}
        x={props.straightLine.x}
        y={props.straightLine.y}
        points={[0, 0, props.straightLine.nextX, props.straightLine.nextY]}
        ref={lineRef}
        draggable={props.isSelected}
        stroke={settings.strokeColor}
        scaleX={props.straightLine?.scaleX || 1}
        scaleY={props.straightLine?.scaleY || 1}
        onTransformEnd={e => {
          const {rotation, scaleX, scaleY, name, x, y} = e.target.attrs;

          props.setStraightLines(prev =>
            prev.map(straightLine => {
              const newStraightLine = {
                ...straightLine,
                rotation,
                scaleX,
                scaleY,
                x,
                y,
              };

              return straightLine.name === name
                ? newStraightLine
                : straightLine;
            })
          );
        }}
        onDragEnd={e => {
          const {x, y, name} = e.target.attrs;

          props.setStraightLines(prev =>
            prev.map(straightLine => {
              const newStraightLine = {...straightLine, x, y};

              return straightLine.name === name
                ? newStraightLine
                : straightLine;
            })
          );
        }}
      />
    </TransformerWrapper>
  );
};
