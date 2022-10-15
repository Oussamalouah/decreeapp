import React from 'react';
import {isDesktop, isTablet} from 'react-device-detect';
import {SmallArrowDownIcon} from '../../../assets/svg';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeFormItem} from '../../core/DecreeFormItem';
import {DecreeText} from '../../core/DecreeText';
import {EditProfileProps} from '../containers/EditProfileContainer';
import {ProfilePageWrapper} from './shared/ProfilePageWrapper';

export const EditProfileScreen = (props: EditProfileProps) => {
  return (
    <ProfilePageWrapper
      showBackOnMobileHeader
      loading={props.loading}
      title={`${props.user?.firstName || ''} ${props.user?.lastName || ''}`}
      titleComponentOnMobileOverride={
        <DecreeText size={23}>Setting</DecreeText>
      }
      hideHeaderTabs={true}
      userClickedBack={props.userClickedBack}
      userClickedClose={props.userClickedClose}
    >
      {/* back button */}
      {(isDesktop || isTablet) && (
        <button
          className="flex items-center self-start space-x-4 outline focus:outline-none"
          onClick={props.userClickedBack}
        >
          <SmallArrowDownIcon width={14} stroke="#324B6F" />
          <DecreeText size={23} className="font-serif font-bold text-blue-cyan">
            Setting
          </DecreeText>
        </button>
      )}
      <div className="w-full">
        <div className="text-base laptop:text-3xl font-serif font-bold tablet:tracking-[0.075em] text-black-light text-center">
          Profile
        </div>
        <div className="mt-4 laptop:mt-12 space-y-3 laptop:space-y-7 hd:w-[87.5%] mx-auto">
          <div className="space-y-3 tablet:space-y-0 tablet:grid tablet:gap-8 tablet:grid-cols-2">
            <DecreeFormItem
              textSize={16}
              label="First Name"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.firstName?.message}
              {...props.form.register('firstName')}
            />
            <DecreeFormItem
              textSize={16}
              label="Last Name"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.lastName?.message}
              {...props.form.register('lastName')}
            />
          </div>
          <div className="space-y-3 tablet:space-y-0 tablet:grid tablet:gap-8 tablet:grid-cols-2">
            <DecreeFormItem
              textSize={16}
              label="Email"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.email?.message}
              {...props.form.register('email')}
            />
            <DecreeFormItem
              textSize={16}
              label="Country"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.country?.message}
              {...props.form.register('country')}
            />
          </div>
          <div>
            <DecreeText size={16} className="mb-[6px] text-gray-medium">
              Please enter your special days
            </DecreeText>
            <div className="flex space-x-4">
              <DecreeFormItem />
              <DecreeFormItem />
              <DecreeFormItem />
            </div>
            <button className="mt-4">
              <DecreeText size={18} className="underline text-blue-cyan">
                + add more
              </DecreeText>
            </button>
          </div>
          <div className="space-y-3 tablet:space-y-0 tablet:grid tablet:gap-8 tablet:grid-cols-2">
            <DecreeFormItem
              disabled
              textSize={16}
              label="Password"
              type="password"
              labelClassName="text-gray-medium"
              value="********"
              inputSuffix={
                // this is an illusion that this element is part of the input
                <div className="flex items-center justify-center -ml-1 bg-white border border-l-0 rounded border-gray">
                  <DecreeButton
                    mode="secondary"
                    className="h-[75%] mr-2"
                    onClick={props.userClickedEditPassword}
                  >
                    Edit
                  </DecreeButton>
                </div>
              }
            />
          </div>
          <div className="hidden tablet:block h-[1px] bg-gray my-8" />
          <div className="flex justify-between pt-4 tablet:space-x-4 tablet:justify-start tablet:pt-0">
            <DecreeButton
              mode="secondary"
              className="px-8 py-3"
              onClick={props.userClickedCancel}
            >
              Cancel
            </DecreeButton>
            <DecreeButton
              className="px-8 py-3"
              onClick={props.form.handleSubmit(data =>
                props.userSubmittedForm(data)
              )}
              disabled={props.updating}
              loading={props.updating}
            >
              Save
            </DecreeButton>
          </div>
        </div>
      </div>
    </ProfilePageWrapper>
  );
};
