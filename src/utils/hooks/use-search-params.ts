import {useLocation} from 'react-router-dom';

/**
 * A custom hook that builds on useLocation to parse
 * the query string for you.
 */
export const useSearchParams = () => {
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  return new URLSearchParams(useLocation().search);
};
