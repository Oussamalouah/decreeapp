import React, {useEffect, useRef} from 'react';
import {Transformer} from 'react-konva';
import Konva from 'konva';

type Props = {
  name: string;
  isSelected: boolean;
  konvaNode: Konva.Node | null;
};

export const TransformerWrapper: React.FC<Props> = props => {
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (props.isSelected && props.konvaNode && trRef.current) {
      trRef.current?.nodes([props.konvaNode]);
    }
  }, [props.isSelected, props.konvaNode, trRef.current]);

  return (
    <React.Fragment>
      {props.children}
      {props.isSelected && <Transformer ref={trRef} name={props.name} />}
    </React.Fragment>
  );
};
