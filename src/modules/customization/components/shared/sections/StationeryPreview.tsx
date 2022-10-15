import React from 'react';
import {
  ReactZoomPanPinchHandlers,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';
import {ZoomIcon} from '../../../../../assets/svg';
import clsx from 'clsx';

type Props = {
  containerClassName?: string;
  isZoomDisabled?: boolean;
  isPanningDisabled?: boolean;
  isDoubleClickDisabled?: boolean;
  otherChildren?: JSX.Element;
};

/**
 * Handles the preview of the stationery. Include features for pan and zoom.
 * @param props
 * @constructor
 */
export const StationeryPreview: React.FC<Props> = props => {
  return (
    <div
      className={clsx([
        'relative flex items-center justify-center w-full bg-offwhite',
        props.containerClassName,
      ])}
    >
      <TransformWrapper
        velocityAnimation={{}}
        initialScale={1}
        minScale={0.75}
        doubleClick={{disabled: props.isDoubleClickDisabled}}
        panning={{disabled: props.isPanningDisabled}}
        wheel={{disabled: props.isZoomDisabled}}
        centerOnInit
      >
        {({zoomIn}: ReactZoomPanPinchHandlers) => (
          <>
            <button
              onClick={() => zoomIn(0.25, 500, 'easeOut')}
              type="button"
              disabled={props.isZoomDisabled}
              className={clsx([
                'absolute z-10 hidden laptop:block bottom-6 right-6',
                {'cursor-not-allowed': props.isZoomDisabled},
              ])}
            >
              <ZoomIcon className="w-6 h-6" />
            </button>
            {props.otherChildren}
            <div className="flex items-center mt-14 mb-14">
              <TransformComponent>{props.children}</TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};
