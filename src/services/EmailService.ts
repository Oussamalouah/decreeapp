import {baseURL} from '../utils/constants/base-url-constants';

const baseAPI = `${
  process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev
}/Notification/email`;

export type ContactUsBody = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export type EmailService = {
  submitContactUs: (body: ContactUsBody) => void;
  emailSubscription: (email: string) => void;
};

export const emailService: EmailService = {
  submitContactUs: async body => {
    const response = await fetch(`${baseAPI}/contactus/send`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
  },
  emailSubscription: async email => {
    const response = await fetch(`${baseAPI}/subscription/add?email=${email}`, {
      method: 'POST',
    });

    if (!response.ok) {
      const responseJSON = await response.json();
      const errorMessage =
        responseJSON.innerError || 'Unable to subscribe email';

      throw new Error(errorMessage);
    }
  },
};
