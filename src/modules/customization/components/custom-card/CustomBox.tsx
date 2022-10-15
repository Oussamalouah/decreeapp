import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  Dispatch,
} from 'react';
import Konva from 'konva';
import {Rect} from 'react-konva';

import {TransformerWrapper} from './TransformerWrapper';
import {BoxProps, ShapeSettings} from '../../models/CustomCardElements';
import {Environment} from '../../../../Environment';

type CustomBoxProps = {
  box: BoxProps;
  settings: ShapeSettings;
  isSelected: boolean;
  userClickedBox: (shapeSettings: ShapeSettings, name: string) => void;
  setBoxes: Dispatch<React.SetStateAction<BoxProps[]>>;
};

export const CustomBox = (props: CustomBoxProps) => {
  const {services} = Environment.current();
  const boxRef = useRef<Konva.Rect>(null);
  const [settings, setSettings] = useState(props.settings);

  useEffect(() => {
    if (props.isSelected) {
      setSettings(props.settings);
    }
  }, [props.settings]);

  useLayoutEffect(() => {
    const savedSettings = services.storage.getItem(props.box.name);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    services.storage.storeItem(props.box.name, JSON.stringify(settings));
  }, [settings]);

  return (
    <TransformerWrapper
      name={props.box.name}
      isSelected={props.isSelected}
      konvaNode={boxRef.current}
    >
      <Rect
        onClick={() => props.userClickedBox(settings, props.box.name)}
        ref={boxRef}
        fill={settings.fillColor}
        stroke={settings.strokeColor}
        strokeWidth={settings.strokeWidth}
        x={props.box.x}
        y={props.box.y}
        width={props.box.width}
        height={props.box.height}
        name={props.box.name}
        draggable={props.isSelected}
        rotation={props.box?.rotation}
        onTransformEnd={e => {
          const {scaleY, scaleX, rotation, name} = e.target.attrs;

          props.setBoxes(prev =>
            prev.map(box => {
              const newBox = {
                ...box,
                height: box.height * scaleY,
                width: box.width * scaleX,
                rotation: rotation,
              };

              return box.name === name ? newBox : box;
            })
          );

          boxRef.current?.setAttr('scaleX', 1);
          boxRef.current?.setAttr('scaleY', 1);
        }}
        onDragEnd={e => {
          const {x, y, name} = e.target.attrs;

          props.setBoxes(prev =>
            prev.map(box => {
              const newBox = {
                ...box,
                x: x || box.x,
                y: y || box.y,
              };

              return box.name === name ? newBox : box;
            })
          );
        }}
      />
    </TransformerWrapper>
  );
};
