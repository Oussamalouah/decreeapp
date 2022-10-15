import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (
      key: string,
      trackingId: string,
      config: {
        page_path: string;
        linker: {
          domains: string[];
          allowLinker: boolean;
        };
      }
    ) => void;
  }
}

export const useGtagTracker = (
  trackingId: string | undefined = 'UA-200991456-1'
) => {
  const {listen} = useHistory();

  useEffect(() => {
    const unlisten = listen(location => {
      if (!window.gtag) return alert("gtag isn't defined");
      if (!trackingId) {
        console.log(
          'Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.'
        );
        return;
      }
      window.gtag('config', trackingId, {
        page_path: location.pathname,
        linker: {
          domains: ['decreecompany.com', 'decree-co.myshopify.com'],
          allowLinker: true,
        },
      });
    });

    return unlisten;
  }, [trackingId, listen]);
};
