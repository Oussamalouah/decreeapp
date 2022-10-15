import {useLocation} from 'react-router-dom';
import {useLayoutEffect} from 'react';

/**
 * Utility component for Routes to automatically scroll
 * the page to the top when the component under the specific path is mounted.
 * Declarative use only. Include in Routes that you want the page to automatically
 * scroll on top when mounted.
 *
 * @constructor
 */
export const ScrollToTopOnMount = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};
