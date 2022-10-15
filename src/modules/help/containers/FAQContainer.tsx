import React from 'react';

type FaqContainerProps = {};

/**
 * A higher order component...
 * @param Screen
 * @constructor
 */

export const FAQContainer =
  (Screen: React.ComponentType<FaqContainerProps>) => () => {
    return <Screen />;
  };
