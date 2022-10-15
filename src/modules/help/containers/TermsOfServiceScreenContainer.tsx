import React from 'react';

type TermsOfServiceScreenContainerProps = {};

/**
 * A higher order component...
 * @param Screen
 * @constructor
 */

export const TermsOfServiceScreenContainer =
  (Screen: React.ComponentType<TermsOfServiceScreenContainerProps>) => () => {
    return <Screen />;
  };
