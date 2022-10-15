import React from 'react';

type AboutUsPageContainerProps = {};

/**
 * A higher order component...
 * @param Screen
 * @constructor
 */

export const AboutUsPageContainer =
  (Screen: React.ComponentType<AboutUsPageContainerProps>) => () => {
    return <Screen />;
  };
