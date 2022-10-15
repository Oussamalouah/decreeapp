import React from 'react';

export type PrivacyPolicyScreenProps = {
  content: string;
};

export const PrivacyPolicyScreenContainer =
  (Screen: React.VFC<PrivacyPolicyScreenProps>) => () => {
    return <Screen content={''} />;
  };
