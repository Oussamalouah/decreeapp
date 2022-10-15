import React from 'react';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import {DecreeLanding} from '../../core/DecreeLanding';
import {PageTitles} from '../../../utils/constants/page-title.constants';
import {DecreeText} from '../../core/DecreeText';
import {PrivacyPolicyScreenProps} from '../containers/PrivacyPolicyScreenContainer';

export const PrivacyPolicyScreen = (props: PrivacyPolicyScreenProps) => {
  return (
    <DecreePageWrapper color="white">
      <DecreeLanding type={PageTitles.PRIVACY_POLICY} />
      <div className="flex items-center justify-center">
        <div className="max-w-screen-figma w-full pb-24 laptop:pb-48 px-4 laptop:px-48">
          <DecreeText size={21} className="pt-14 pb-12">
            {/* Privacy Policy contents will be here */}
            {props.content}
          </DecreeText>
        </div>
      </div>
    </DecreePageWrapper>
  );
};
