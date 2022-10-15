import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {AboutUsScreen} from './modules/about/components/AboutUsScreen';
import {AboutUsPageContainer} from './modules/about/containers/AboutUsPageContainer';

import {ForgotPasswordScreen} from './modules/authentication/components/ForgotPasswordScreen';
import {LoginScreen} from './modules/authentication/components/LoginScreen';
import {SignUpScreen} from './modules/authentication/components/SignUpScreen';
import {ForgotPasswordContainer} from './modules/authentication/containers/ForgotPasswordContainer';
import {LoginScreenContainer} from './modules/authentication/containers/LoginScreenContainer';
import {SignUpScreenContainer} from './modules/authentication/containers/SignUpScreenContainer';
import {CartScreen} from './modules/cart/components/CartScreen';
import {CartContainer} from './modules/cart/container/CartContainer';
import {PrivateRoute} from './modules/core/PrivateRoute';
import {ScrollToTopOnMount} from './modules/core/ScrollToTopOnMount';
import {CustomCardCustomizationScreen} from './modules/customization/components/CustomCardCustomizationScreen';
import {PackageCustomizationScreen} from './modules/customization/components/PackageCustomizationScreen';
import {ProductCustomizationScreen} from './modules/customization/components/ProductCustomizationScreen';
import {CustomCardCustomizationContainer} from './modules/customization/containers/CustomCardCustomizationContainer';
import {PackageCustomizationContainer} from './modules/customization/containers/PackageCustomizationContainer';
import {ProductCustomizationContainer} from './modules/customization/containers/ProductCustomizationContainer';
import {FAQScreen} from './modules/help/components/FAQScreen';
import {PrivacyPolicyScreen} from './modules/help/components/PrivacyPolicyScreen';
import {TermsOfServiceScreen} from './modules/help/components/TermsOfServiceScreen';
import {FAQContainer} from './modules/help/containers/FAQContainer';
import {PrivacyPolicyScreenContainer} from './modules/help/containers/PrivacyPolicyScreenContainer';
import {TermsOfServiceScreenContainer} from './modules/help/containers/TermsOfServiceScreenContainer';
import {HomeScreen} from './modules/home/components/HomeScreen';
import {HomeScreenContainer} from './modules/home/containers/HomeScreenContainer';
import {StoreScreen} from './modules/store/components/StoreScreen';
import {StoreScreenContainer} from './modules/store/containers/StoreScreenContainer';
import {AddressBookFormScreen} from './modules/user/components/AddressBookFormScreen';
import {AddressBookGroupScreen} from './modules/user/components/AddressBookGroupScreen';
import {AddressBookScreen} from './modules/user/components/AddressBookScreen';
import {AddressScreen} from './modules/user/components/AddressScreen';
import {ConfigureGroupScreen} from './modules/user/components/ConfigureGroupScreen';
import {EditProfileScreen} from './modules/user/components/EditProfileScreen';
import {OrdersScreen} from './modules/user/components/OrdersScreen';
import {ProfileScreen} from './modules/user/components/ProfileScreen';
import {AddressBookContainer} from './modules/user/containers/AddressBookContainer';
import {AddressBookFormContainer} from './modules/user/containers/AddressBookFormContainer';
import {AddressBookGroupContainer} from './modules/user/containers/AddressBookGroupContainer';
import {AddressContainer} from './modules/user/containers/AddressContainer';
import {ConfigureGroupContainer} from './modules/user/containers/ConfigureGroupContainer';
import {EditProfileContainer} from './modules/user/containers/EditProfileContainer';
import {OrdersContainer} from './modules/user/containers/OrdersContainer';
import {ProfileContainer} from './modules/user/containers/ProfileContainer';

// place this on top so when we import new screens it wont get mixed
import {routes} from './route-list';
import {weddingCategories} from './utils/constants/store.contants';

import TagManager from 'react-gtm-module';
import {useAnalyticsTracker} from './utils/hooks/use-analytics-tracker';
import {useGtagTracker} from './utils/hooks/use-gtag-tracker';

const Home = HomeScreenContainer(HomeScreen);
const Login = LoginScreenContainer(LoginScreen);
const Store = StoreScreenContainer(StoreScreen);
const ForgotPassword = ForgotPasswordContainer(ForgotPasswordScreen);
const SignUp = SignUpScreenContainer(SignUpScreen);
const Cart = CartContainer(CartScreen);
const Orders = OrdersContainer(OrdersScreen);
const Profile = ProfileContainer(ProfileScreen);
const EditProfile = EditProfileContainer(EditProfileScreen);
const ProductCustomization = ProductCustomizationContainer(
  ProductCustomizationScreen
);
const PackageCustomization = PackageCustomizationContainer(
  PackageCustomizationScreen
);
const Address = AddressContainer(AddressScreen);
const About = AboutUsPageContainer(AboutUsScreen);
const Faq = FAQContainer(FAQScreen);
const PrivacyPolicy = PrivacyPolicyScreenContainer(PrivacyPolicyScreen);
const TermsOfService = TermsOfServiceScreenContainer(TermsOfServiceScreen);
const CustomCard = CustomCardCustomizationContainer(
  CustomCardCustomizationScreen
);
const ContactList = AddressBookContainer(AddressBookScreen);
const AddressBookForm = AddressBookFormContainer(AddressBookFormScreen);
const EditAddressBookForm = AddressBookFormContainer(AddressBookFormScreen);
const AddressBookGroup = AddressBookGroupContainer(AddressBookGroupScreen);
const ConfigureGroup = ConfigureGroupContainer(ConfigureGroupScreen);

const tagManagerArgs = {
  gtmId: 'GTM-MB59F3S',
};

TagManager.initialize(tagManagerArgs);

const App = () => {
  // useAnalyticsTracker();
  useGtagTracker();

  return (
    <Switch>
      <Route exact path={routes.HOME}>
        <ScrollToTopOnMount />
        <Home />
      </Route>
      <Route exact path={routes.ABOUT_US}>
        <ScrollToTopOnMount />
        <About />
      </Route>
      <Route exact path={routes.FAQ}>
        <ScrollToTopOnMount />
        <Faq />
      </Route>
      <Route exact path={routes.PRIVACY_POLICY}>
        <ScrollToTopOnMount />
        <PrivacyPolicy />
      </Route>
      <Route exact path={routes.TERMS_OF_SERVICE}>
        <ScrollToTopOnMount />
        <TermsOfService />
      </Route>
      <Route path={routes.LOGIN}>
        <ScrollToTopOnMount />
        <Login />
      </Route>
      <Route path={routes.SIGN_UP}>
        <ScrollToTopOnMount />
        <SignUp />
      </Route>
      <Route path={routes.FORGOT_PASSWORD}>
        <ScrollToTopOnMount />
        <ForgotPassword />
      </Route>
      <PrivateRoute exact path={routes.USER__ORDERS}>
        <ScrollToTopOnMount />
        <Orders />
      </PrivateRoute>
      <PrivateRoute exact path={routes.USER__SETTING}>
        <ScrollToTopOnMount />
        <Profile />
      </PrivateRoute>
      <PrivateRoute path={routes.USER__SETTING__PROFILE}>
        <ScrollToTopOnMount />
        <EditProfile />
      </PrivateRoute>
      <PrivateRoute path={routes.USER__SETTING__ADDRESS}>
        <ScrollToTopOnMount />
        <Address />
      </PrivateRoute>
      <PrivateRoute exact path={routes.USER__SETTING__ADDRESS_BOOK}>
        <ScrollToTopOnMount />
        <ContactList />
      </PrivateRoute>
      <PrivateRoute exact path={routes.USER__SETTINGS__ADDRESS_GROUP}>
        <ScrollToTopOnMount />
        <AddressBookGroup />
      </PrivateRoute>
      <PrivateRoute
        exact
        path={[
          routes.USER__SETTINGS__ADDRESS_GROUP__ADD,
          routes.USER__SETTINGS__ADDRESS_GROUP__EDIT(),
        ]}
      >
        <ScrollToTopOnMount />
        <ConfigureGroup />
      </PrivateRoute>
      <PrivateRoute exact path={routes.USER__SETTING__ADDRESS_BOOK__ADD}>
        <ScrollToTopOnMount />
        <AddressBookForm />
      </PrivateRoute>

      <PrivateRoute exact path={routes.USER__SETTING__ADDRESS_BOOK__EDIT()}>
        <ScrollToTopOnMount />
        <EditAddressBookForm mode="edit" />
      </PrivateRoute>
      <Redirect
        exact
        from={routes.STORE}
        to={routes.STORE__VIEW(weddingCategories[0].id)}
      />
      <Route exact path={routes.STORE__VIEW()}>
        {/* IMPORTANT: Do not add auto scroll to top here */}
        <Store />
      </Route>
      <Route exact path={routes.STORE__VIEW__CUSTOM_CARD_CUSTOMIZATION}>
        <ScrollToTopOnMount />
        <CustomCard />
      </Route>
      <Route exact path={routes.STORE__VIEW__PACKAGE_CUSTOMIZATION()}>
        <ScrollToTopOnMount />
        <PackageCustomization />
      </Route>
      <Route path={routes.STORE__VIEW__PRODUCT_CUSTOMIZATION()}>
        <ScrollToTopOnMount />
        <ProductCustomization />
      </Route>
      <Route path={routes.CART}>
        <ScrollToTopOnMount />
        <Cart />
      </Route>
    </Switch>
  );
};

export default App;
