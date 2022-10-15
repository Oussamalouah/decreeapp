import React from 'react';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import {DecreeLanding} from '../../core/DecreeLanding';
import {PageTitles} from '../../../utils/constants/page-title.constants';
import {DecreeText} from '../../core/DecreeText';
import {DecreeFormItem} from '../../core/DecreeFormItem';
import {DecreeButton} from '../../core/DecreeButton';
import {ContactUsScreenProps} from '../containers/ContactUsScreenContainer';

/**
 * @deprecated
 * Client will use zendesk for the contact us instead
 *
 * @param Screen
 * @constructor
 */
export const ContactUsScreen = ({
  contactUsForm,
  onUserSubmit,
}: ContactUsScreenProps) => {
  return (
    <DecreePageWrapper color="white">
      <DecreeLanding type={PageTitles.CONTACT_US} />
      <div className="flex justify-center pb-24 laptop:pb-48 px-4 laptop:px-0">
        <div className="w-full max-w-[500px]">
          <DecreeText
            size={30}
            className="font-serif font-bold text-blue-dark text-center pt-14 pb-12"
          >
            Submit A Request
          </DecreeText>
          <form
            className="space-y-14"
            onSubmit={contactUsForm.handleSubmit(onUserSubmit)}
          >
            <div className="space-y-6">
              <DecreeFormItem
                required
                label="Name"
                errorText={contactUsForm.formState.errors.name?.message}
                {...contactUsForm.register('name')}
              />
              <DecreeFormItem
                required
                label="Email"
                errorText={contactUsForm.formState.errors.email?.message}
                {...contactUsForm.register('email')}
              />
              <DecreeFormItem
                label="Phone Number"
                errorText={contactUsForm.formState.errors.phoneNumber?.message}
                {...contactUsForm.register('phoneNumber')}
              />
              <div className="space-y-[6px]">
                <DecreeText size={18}>How can we help?*</DecreeText>
                <textarea
                  className="w-full p-3 bg-white border rounded outline-none border-gray-dark"
                  rows={5}
                  {...contactUsForm.register('message')}
                />
                {contactUsForm.formState.errors.message?.message && (
                  <>
                    <div className="h-[2px]" />
                    <small className="text-red-500">
                      {contactUsForm.formState.errors.message?.message}
                    </small>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <DecreeButton className="w-9/12">
                <DecreeText size={23} className="font-serif">
                  SUBMIT
                </DecreeText>
              </DecreeButton>
            </div>
          </form>
        </div>
      </div>
    </DecreePageWrapper>
  );
};
