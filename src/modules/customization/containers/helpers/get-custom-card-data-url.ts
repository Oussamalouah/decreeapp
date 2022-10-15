import Konva from 'konva';
import {Dispatch} from 'react';

export const getCustomCardDataUrl = (
  selectedObjName: string,
  setSelectedObjName: Dispatch<React.SetStateAction<string>>,
  stageRef: React.RefObject<Konva.Stage>,
  backgroundRef: React.RefObject<Konva.Rect>
) => {
  // Hide any transformers selected if any
  const selectedObjects = stageRef.current?.find(`.${selectedObjName}`);
  selectedObjects?.forEach(obj => {
    if (obj.getClassName() === Konva.Transformer.name) {
      obj.hide();
    }
  });

  setSelectedObjName('');

  backgroundRef.current?.show();

  const customCardDataUrl = stageRef.current
    ?.getStage()
    .toDataURL({mimeType: 'image/png', quality: 1});

  backgroundRef.current?.hide();

  return customCardDataUrl;
};
