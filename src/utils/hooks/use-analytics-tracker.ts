import ReactGA from 'react-ga';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

export const useAnalyticsTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    ReactGA.initialize('UA-200991456-1');
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
};
