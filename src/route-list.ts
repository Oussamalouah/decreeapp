import {bespokeCategories} from './utils/constants/store.contants';

type StoreViewFilters = {
  tagIds?: string;
  paperColors?: string;
  sortType?: string;
};

// This file should solely contain the routes map
export const routes = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
  ABOUT_US: '/about-us',
  FAQ: '/faq',
  CONTACT_US: '/contact-us',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',

  // account management should have a prefix path of [/user]
  USER__SETTING: '/user/setting',
  USER__ORDERS: '/user/orders',
  USER__SETTING__PROFILE: '/user/setting/profile',
  USER__SETTING__ADDRESS: '/user/setting/address',
  // address book section for user settings
  USER__SETTING__ADDRESS_BOOK: '/user/address-book',
  USER__SETTING__ADDRESS_BOOK__ADD: '/user/address-book/add',
  USER__SETTINGS__ADDRESS_GROUP: '/user/settings/address/groups',
  USER__SETTINGS__ADDRESS_GROUP__ADD: '/user/settings/address/groups/add',
  USER__SETTINGS__ADDRESS_GROUP__EDIT: (id = ':groupId') => {
    return `/user/settings/address/groups/edit/${id}`;
  },
  USER__SETTING__ADDRESS_BOOK__EDIT: (id = ':id') => {
    return `/user/address-book/${id}/edit`;
  },

  CART: '/cart',

  // ITEMS AND PACKAGES
  STORE: '/store',
  STORE__VIEW: (productId = ':productId', filters?: StoreViewFilters) => {
    const getFilters = () => {
      return Object.keys(filters || {})
        .filter(key => filters![key as keyof StoreViewFilters])
        .map((key, i) => {
          const value = filters![key as keyof StoreViewFilters];

          if (i === 0) return `?${key}=${value}`;
          else return `&${key}=${value}`;
        })
        .join('');
    };

    return `/store/${productId}${getFilters()}`;
  },
  STORE__VIEW__PRODUCT_CUSTOMIZATION: (
    productId = ':productId',
    itemId = ':itemId'
  ) => `/store/${productId}/${itemId}/customization`,
  STORE__VIEW__CUSTOM_CARD_CUSTOMIZATION:
    '/store/bespoke/custom-card/customization',
  STORE__VIEW__PACKAGE_CUSTOMIZATION: (packageId = ':packageId') =>
    `/store/packages/${packageId}/customization`,
};
