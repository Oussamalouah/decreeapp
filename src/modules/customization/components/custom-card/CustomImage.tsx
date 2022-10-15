import React, {Dispatch, useCallback, useEffect, useRef, useState} from 'react';
import Konva from 'konva';

import {Image} from 'react-konva';
import {TransformerWrapper} from './TransformerWrapper';
import {ImageProps} from '../../models/CustomCardElements';

type Props = {
  image: ImageProps;
  isSelected: boolean;
  userClickedImage: () => void;
  setImages: Dispatch<React.SetStateAction<ImageProps[]>>;
};

export const CustomImage = (props: Props) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const konvaImageRef = useRef<Konva.Image>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const handleImageLoad = useCallback(() => {
    setImage(imageRef.current);
    // handle auto select
    props.userClickedImage();
  }, []);

  const loadImage = useCallback(() => {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.src = props.image.src;
    imageRef.current = img;
    imageRef.current.addEventListener('load', handleImageLoad);
  }, [props.image]);

  // todo: fix issue on scaling when image is transformed
  // const getScale = (height: number, width: number) => {
  //   let scale = 1;

  //   while ((scale * height > 300 || scale * width > 300) && scale > 0) {
  //     scale = scale * 0.9;
  //   }

  //   return {x: scale > 0 ? scale : 1, y: scale > 0 ? scale : 1};
  // };

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  return (
    image && (
      <TransformerWrapper
        name={props.image.name}
        isSelected={props.isSelected}
        konvaNode={konvaImageRef.current}
      >
        <Image
          x={props.image?.x}
          y={props.image?.y}
          scaleX={props.image?.scaleX}
          scaleY={props.image?.scaleY}
          rotation={props.image?.rotation}
          image={image}
          name={props.image.name}
          ref={konvaImageRef}
          // scale={getScale(image.height, image.width)}
          draggable
          onClick={props.userClickedImage}
          onTransformEnd={e => {
            const {name, x, y, rotation, scaleX, scaleY} = e.target.attrs;

            props.setImages(prev =>
              prev.map(img => {
                const newImg = {...img, x, y, rotation, scaleX, scaleY};

                return img.name === name ? newImg : img;
              })
            );
          }}
          onDragEnd={e => {
            const {name, x, y} = e.target.attrs;

            props.setImages(prev =>
              prev.map(img => {
                const newImg = {...img, x, y};

                return img.name === name ? newImg : img;
              })
            );
          }}
        />
      </TransformerWrapper>
    )
  );
};
