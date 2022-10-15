import React from 'react';
import {AddressProps} from '../containers/AddressContainer';
import {ProfilePageWrapper} from './shared/ProfilePageWrapper';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeText} from '../../core/DecreeText';
import {isDesktop, isTablet} from 'react-device-detect';
import {SmallArrowDownIcon} from '../../../assets/svg';
import {DecreeFormItem} from '../../core/DecreeFormItem';

export const AddressScreen = ({user, ...props}: AddressProps) => {
  const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`;

  return (
    <ProfilePageWrapper
      title={displayName}
      loading={props.loading}
      showBackOnMobileHeader
      hideHeaderTabs
      userClickedBack={props.userClickedBack}
      userClickedClose={props.userClickedClose}
    >
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
          Shipping Address
        </div>
        <div className="mt-4 laptop:mt-12 space-y-3 laptop:space-y-7 hd:w-[87.5%] mx-auto">
          <div className="space-y-3 tablet:space-y-0 tablet:grid tablet:gap-8 tablet:grid-cols-2">
            <DecreeFormItem
              textSize={16}
              label="Country"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.country?.message}
              {...props.form.register('country')}
            />
          </div>
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
              label="Phone"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.phone?.message}
              {...props.form.register('phone')}
            />
          </div>
          <div className="space-y-3 tablet:space-y-0 tablet:grid tablet:gap-8 tablet:grid-cols-1">
            <DecreeFormItem
              textSize={16}
              label="Address Line 1"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.address1?.message}
              {...props.form.register('address1')}
            />
            <DecreeFormItem
              textSize={16}
              label="Address Line 2 (Optional)"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.address2?.message}
              {...props.form.register('address2')}
            />
          </div>

          <div className="space-y-3 tablet:space-y-0 tablet:grid tablet:gap-8 tablet:grid-cols-3">
            <DecreeFormItem
              textSize={16}
              label="City"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.city?.message}
              {...props.form.register('city')}
            />
            <DecreeFormItem
              textSize={16}
              label="Province"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.province?.message}
              {...props.form.register('province')}
            />
            <DecreeFormItem
              textSize={16}
              label="Zip Code"
              labelClassName="text-gray-medium"
              errorText={props.form.formState.errors.zip?.message}
              {...props.form.register('zip')}
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
