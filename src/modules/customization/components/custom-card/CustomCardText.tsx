import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  Dispatch,
} from 'react';
import Konva from 'konva';
import {Text} from 'react-konva';
import {TransformerWrapper} from './TransformerWrapper';
import {
  EditModes,
  TextProps,
  TextSettings,
} from '../../models/CustomCardElements';
import _ from 'lodash';
import {Environment} from '../../../../Environment';

type Props = {
  isSelected: boolean;
  text: TextProps;
  settings: TextSettings;
  editMode: EditModes;
  userClickedText: (textSettings: TextSettings) => void;
  userDoubleClickedText: () => void;
  setTexts: Dispatch<React.SetStateAction<TextProps[]>>;
};

export const CustomCardText = (props: Props) => {
  const {services} = Environment.current();

  const textRef = useRef<Konva.Text>(null);
  const [settings, setSettings] = useState(props.settings);

  useEffect(() => {
    if (props.isSelected) {
      setSettings(props.settings);
    }
  }, [props.settings]);

  useLayoutEffect(() => {
    const savedSettings = services.storage.getItem(props.text.name);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    services.storage.storeItem(props.text.name, JSON.stringify(settings));
  }, [settings]);

  return (
    <TransformerWrapper
      name={props.text.name}
      isSelected={props.isSelected}
      konvaNode={textRef.current}
    >
      <Text
        ref={textRef}
        text={props.text?.text || 'Text here'}
        wrap="char"
        x={props.text.x}
        y={props.text.y}
        name={props.text.name}
        onClick={() => props.userClickedText(settings)}
        onTransform={e => {
          const text = e.target;
          e.target.width(Math.max(text.width() * text.scaleX()));
          e.target.height(Math.max(text.height() * text.scaleY()));
          e.target.scaleX(1);
          e.target.scaleY(1);
        }}
        rotation={props.text?.rotation}
        width={props.text.width || 100}
        height={props.text.height || 50}
        fill={settings.color}
        fontFamily={settings.family}
        fontStyle={settings.weight}
        fontSize={settings.size}
        align={settings.alignment}
        lineHeight={_.parseInt(settings.lineHeight) || 1}
        letterSpacing={_.parseInt(settings.letterSpacing) || 1}
        draggable={props.editMode === EditModes.SELECT || props.isSelected}
        onDblClick={props.userDoubleClickedText}
        onTransformEnd={e => {
          const {height, width, rotation, x, y, name} = e.target.attrs;

          props.setTexts(prev =>
            prev.map(text => {
              const newText = {...text, height, width, rotation, x, y};

              return text.name === name ? newText : text;
            })
          );
        }}
        onDragEnd={e => {
          const {x, y, name} = e.target.attrs;

          props.setTexts(prev =>
            prev.map(text => {
              const newText = {...text, x, y};

              return text.name === name ? newText : text;
            })
          );
        }}
      />
    </TransformerWrapper>
  );
};
