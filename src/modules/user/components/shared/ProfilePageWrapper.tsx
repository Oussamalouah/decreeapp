import React from 'react';
import {ArrowLineLeftIcon, XIcon} from '../../../../assets/svg';
import {DecreePageWrapper} from '../../../core/DecreePageWrapper';
import {DecreeSpinner} from '../../../core/DecreeSpinner';
import {DecreeText} from '../../../core/DecreeText';
import {isMobileOnly} from 'react-device-detect';
import {ProfileHeaderTabs} from './ProfileHeaderTabs';

type Props = {
  title: string;
  loading?: boolean;
  showBackOnMobileHeader?: boolean;
  titleComponentOnMobileOverride?: React.ReactNode;
  hideHeaderTabs?: boolean;
  userClickedBack?: () => void;
  userClickedClose?: () => void;
};

export const ProfilePageWrapper: React.FC<Props> = props => {
  return (
    <DecreePageWrapper headerType="block" color="blue">
      <div className="flex flex-col items-center pt-3 pb-12 mx-auto bg-white laptop:pb-32 laptop:pt-16 max-w-screen-figma">
        <div className="grid w-[95%] grid-cols-3">
          <div className="w-8 h-8 tablet:w-0 tablet:h-0">
            {props.showBackOnMobileHeader && (
              // hide on laptop even if showBackOnMobileHeader === true
              <button className="tablet:hidden" onClick={props.userClickedBack}>
                <ArrowLineLeftIcon fill="#324B6F" />
              </button>
            )}
          </div>
          <div className="font-serif font-bold text-center text-blue-dark">
            {isMobileOnly && props.titleComponentOnMobileOverride ? (
              props.titleComponentOnMobileOverride
            ) : (
              <>
                <DecreeText
                  size={14}
                  className="mb-1 text-center tracking-[0.075em] uppercase"
                >
                  Welcome Back
                </DecreeText>
                <DecreeText
                  size={30}
                  className="text-center tracking-[0.075em] uppercase"
                >
                  {props.title}
                </DecreeText>
              </>
            )}
          </div>
          <div className="flex w-8 h-8 justify-self-end tablet:w-0 tablet:h-0">
            <button className="tablet:hidden" onClick={props.userClickedClose}>
              <XIcon fill="#324B6F" />
            </button>
          </div>
        </div>
        <div className="h-[1px] w-[90%] laptop:w-3/4 bg-gray mt-5 laptop:mt-6" />
        {!props.hideHeaderTabs && (
          <div className="mt-4 laptop:mt-6">
            <ProfileHeaderTabs />
          </div>
        )}
        <div className="flex flex-col items-center space-y-4 laptop:space-y-8 w-[90%] laptop:w-[75%] hd:w-[65%] mt-4 tablet:mt-10">
          {props.loading ? <DecreeSpinner type="primary" /> : props.children}
        </div>
      </div>
    </DecreePageWrapper>
  );
};
