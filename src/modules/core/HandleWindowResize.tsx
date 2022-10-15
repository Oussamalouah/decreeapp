import {useLayoutEffect} from 'react';

type Props = {
  onResize: () => void;
};

/**
 * Utility component for when window is resized
 *
 * @constructor
 */
export const HandleWindowResize = (props: Props) => {
  useLayoutEffect(() => {
    window.addEventListener('resize', props.onResize);

    return () => window.removeEventListener('resize', props.onResize);
  }, []);

  return null;
};
