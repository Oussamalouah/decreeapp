declare global {
  interface Window {
    ga: any;
  }
}

export const getGoogleClientId = (
  trackerParam = 'clientId'
): Promise<string> => {
  return new Promise(resolve => {
    // gtag only makes 'ga' function available after the library loads
    // so we have to stub it if undefined here
    window.ga =
      window.ga ||
      function () {
        (window.ga.q = window.ga.q || []).push(arguments); //eslint-disable-line
      };
    window.ga.l = +new Date();

    const fallback = window.setTimeout(() => {
      //after 4 seconds, assume the script is blocked
      resolve('');
    }, 4000);
    window.ga(() => {
      // this function is called after GA library initializes
      window.clearTimeout(fallback);
      const tracker = window.ga.getAll()[0];
      const clientId = tracker && tracker.get(trackerParam);
      return resolve(clientId as string);
    });
  });
};
