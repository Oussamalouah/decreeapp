import React from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ContactUsFormValidationSchema} from '../../../utils/validation-schemas';
import {Environment} from '../../../Environment';
import {toast} from 'react-toastify';

type ContactUsFormState = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export type ContactUsScreenProps = {
  contactUsForm: UseFormReturn<ContactUsFormState>;
  onUserSubmit: (formState: ContactUsFormState) => void;
};

/**
 * @deprecated
 * Client will use zendesk for the contact us instead
 *
 * @param Screen
 * @constructor
 */
export const ContactUsScreenContainer =
  (Screen: React.VFC<ContactUsScreenProps>) => () => {
    const {services} = Environment.current();

    const contactUsForm = useForm<ContactUsFormState>({
      resolver: yupResolver(ContactUsFormValidationSchema),
      mode: 'onTouched',
    });

    return (
      <Screen
        contactUsForm={contactUsForm}
        onUserSubmit={async () => {
          const {name, email, message, phoneNumber} = contactUsForm.getValues();
          const body = {name, email, message, phoneNumber};

          try {
            await services.email.submitContactUs(body);
            contactUsForm.reset();
            toast.success('Request has been submitted');
          } catch (e) {
            toast.error(e.message);
          }
        }}
      />
    );
  };
