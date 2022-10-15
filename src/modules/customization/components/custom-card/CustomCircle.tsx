import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  Dispatch,
} from 'react';
import Konva from 'konva';
import {Ellipse} from 'react-konva';
import {TransformerWrapper} from './TransformerWrapper';
import {CircleProps, ShapeSettings} from '../../models/CustomCardElements';
import {Environment} from '../../../../Environment';

type CustomCircleProps = {
  circle: CircleProps;
  settings: ShapeSettings;
  isSelected: boolean;
  userClickedCircle: (shapeSettings: ShapeSettings, name: string) => void;
  setCircles: Dispatch<React.SetStateAction<CircleProps[]>>;
};

export const CustomCircle = (props: CustomCircleProps) => {
  const {services} = Environment.current();

  const circleRef = useRef<Konva.Ellipse>(null);
  const [settings, setSettings] = useState(props.settings);

  useEffect(() => {
    if (props.isSelected) {
      setSettings(props.settings);
    }
  }, [props.settings]);

  useLayoutEffect(() => {
    const savedSettings = services.storage.getItem(props.circle.name);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    services.storage.storeItem(props.circle.name, JSON.stringify(settings));
  }, [settings]);

  return (
    <TransformerWrapper
      name={props.circle.name}
      isSelected={props.isSelected}
      konvaNode={circleRef.current}
    >
      <Ellipse
        onClick={() => props.userClickedCircle(settings, props.circle.name)}
        fill={settings.fillColor}
        stroke={settings.strokeColor}
        strokeWidth={settings.strokeWidth}
        ref={circleRef}
        x={props.circle.x}
        y={props.circle.y}
        radiusX={props.circle.radiusX}
        radiusY={props.circle.radiusY}
        name={props.circle.name}
        draggable={props.isSelected}
        onTransformEnd={e => {
          const {scaleX, scaleY, rotation, name} = e.target.attrs;

          props.setCircles(prev =>
            prev.map(circle => {
              const newCircle = {
                ...circle,
                radiusX: circle.radiusX * scaleX,
                radiusY: circle.radiusY * scaleY,
                rotation: rotation,
              };

              return circle.name === name ? newCircle : circle;
            })
          );
          circleRef.current?.setAttr('scaleX', 1);
          circleRef.current?.setAttr('scaleY', 1);
        }}
        onDragEnd={e => {
          const {x, y, name} = e.target.attrs;

          props.setCircles(prev =>
            prev.map(circle => {
              const newCircle = {...circle, x, y};

              return circle.name === name ? newCircle : circle;
            })
          );
        }}
        rotation={props.circle?.rotation}
      />
    </TransformerWrapper>
  );
};
