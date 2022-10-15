import {useMutation, useQuery} from '@apollo/client';
import clsx from 'clsx';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import {toast} from 'react-toastify';
import tw from 'tailwind-styled-components/dist/tailwind';
import {AuthResult} from '../../api/models/AuthResult';
import {AUTHENTICATION} from '../../api/operations/queries/authentication';
import {images} from '../../assets/images';
import {
  CartIcon,
  CloseIcon,
  MenuDarkIcon,
  MenuLightIcon,
  ProfileIcon,
} from '../../assets/svg';
import {routes} from '../../route-list';
import {
  bespokeCategories,
  // Uncomment out once business stationery is available
  businessCategories,
  greetingCategories,
  holidayCategories,
  weddingCategories,
} from '../../utils/constants/store.contants';
import {
  useAddCheckoutLineItems,
  useCheckoutShippingUpdate,
  useCreateCheckout,
  useDeleteUserAccessToken,
  useLinkAssociateCustomer,
  useRemoveCheckoutLineItem,
} from '../../utils/hooks/mutation-hooks';
import {
  useCheckoutData,
  useProductByHandleData,
} from '../../utils/hooks/query-hooks';
import {CartModal} from '../cart/components/CartModal';
import {DecreeText} from './DecreeText';
import {StationeryTypes} from '../../utils/constants/stationery-type.constants';
import {customAttributeFields} from '../../utils/constants/custom-attribute.constants';
import {
  AttributeInput,
  CheckoutLineItemUpdateInput,
} from '../../../__generated__/globalTypes';
import {
  checkoutLineItemsUpdate,
  checkoutLineItemsUpdateVariables,
} from '../../api/operations/mutations/__generated__/checkoutLineItemsUpdate';
import {CHECKOUT_LINE_ITEM_UPDATE} from '../../api/operations/mutations/checkout';
import {productHandles} from '../../utils/constants/product-handle.constants';
import {productTypes} from '../../utils/constants/product-type.constants';
import {getCustomerProfile} from '../../api/operations/queries/__generated__/getCustomerProfile';
import {GET_CUSTOMER_PROFILE} from '../../api/operations/queries/customer';
import {ConvertAddressesToCsvBlob} from '../../utils/convert-addresses-to-csv-blob';
import {Environment} from '../../Environment';
import {
  AddressGroup,
  CreateCustomerAddressBookEntryResponse,
} from '../../services/customer-service';
import {getGoogleClientId} from '../../utils/get-google-client-id';

/**
 * @typedef DecreeHeaderProps
 */
type DecreeHeaderProps = {
  headerType?: 'absolute' | 'block';
  color?: 'blue' | 'white';
  sampleIsOnLimit?: boolean;
};

/**
 * The header component of the app
 * @component
 * @example
 * block
 * <DecreeHeader headerType="block"/>
 * absolute
 * <DecreeHeader headerType="absolute"/>
 *
 * @param {DecreeHeaderProps} props
 * @return JSX.Element
 */
export const DecreeHeader: React.FC<DecreeHeaderProps> = ({
  headerType = 'absolute',
  color = 'white',
  sampleIsOnLimit,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [addressGroups, setAddressGroups] = React.useState<AddressGroup[]>([]);
  const [userContacts, setUserContacts] = React.useState<
    CreateCustomerAddressBookEntryResponse[]
  >([]);

  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const {services} = Environment.current();

  const {productId: productTypeId} = useParams<{productId: string}>();

  /**
   * QUERIES
   */

  /** Reacts when there is a valid token */
  const {data: authData} = useQuery<AuthResult>(AUTHENTICATION);

  const isAuthenticated = Boolean(authData?.accessToken);

  const {loading: loadingProfile, data: profileData} =
    useQuery<getCustomerProfile>(GET_CUSTOMER_PROFILE, {
      variables: {
        customerAccessToken: authData?.accessToken || '',
      },
      onError(error) {
        toast.error(error.message);
      },
    });

  // Gets checkout data for the cart
  const {loadingCheckoutData, checkoutData} = useCheckoutData();

  /**
   * MUTATIONS
   */

  // Associates customer to checkout
  const {linkAssociateCustomer, loadingLinkAssociateCustomer} =
    useLinkAssociateCustomer();
  // mutation to remove a checkout line item
  const {removeCheckoutLineItem, loadingCheckoutRemoveItem} =
    useRemoveCheckoutLineItem();
  // mutation to create a checkout
  const {createCheckout, loadingCheckoutCreate} = useCreateCheckout();
  // mutation to delete the user access token
  const {deleteUserAccessToken, loadingDeleteUserAccessToken} =
    useDeleteUserAccessToken();
  const {addCheckoutLineItems, loadingCheckoutAddLineItems} =
    useAddCheckoutLineItems();
  // Get shipment options
  const {productData: shipmentData, loadingProductData: loadingShipmentData} =
    useProductByHandleData(productHandles.shipment);
  // Updates shipping address for checkout
  const {checkoutShippingAddressUpdate, loadingCheckoutShippingAddressUpdate} =
    useCheckoutShippingUpdate();

  const [updateCheckoutLineItem, {loading: loadingCheckoutUpdateItem}] =
    useMutation<checkoutLineItemsUpdate, checkoutLineItemsUpdateVariables>(
      CHECKOUT_LINE_ITEM_UPDATE,
      {
        onCompleted: data => {
          const errorMessage =
            data.checkoutLineItemsUpdate?.checkoutUserErrors?.[0]?.message;
          if (errorMessage) toast.error(errorMessage);
        },
        onError: e => {
          toast.error(e.message);
        },
      }
    );

  const handleGetAddressGroups = React.useCallback(async () => {
    if (profileData?.customer?.email) {
      try {
        const groups = await services.customer.getAddressesGroups(
          profileData.customer.email
        );

        setAddressGroups(groups);
      } catch (error) {
        toast.error(error?.message || 'Error getting address groups');
      }
    }
  }, [profileData?.customer]);

  const handleGetAllUserContacts = React.useCallback(async () => {
    if (profileData?.customer?.email) {
      try {
        const addresses = await services.customer.getCustomerAddresses(
          profileData?.customer?.email || ''
        );
        setUserContacts(addresses);
      } catch (error) {
        toast.error(error?.message || 'Error getting user contacts');
      }
    }
  }, [profileData?.customer]);

  const handleGetShipmentRecipients = React.useCallback(
    (contactIds: string[]) => {
      const selectedContacts: CreateCustomerAddressBookEntryResponse[] = [];

      _.uniq(contactIds).forEach(id => {
        const userDetails = userContacts.find(contact => contact.id === id);
        if (userDetails) {
          selectedContacts.push(userDetails);
        }
      });
      return selectedContacts;
    },
    [userContacts]
  );

  useEffect(() => {
    handleGetAddressGroups();
  }, [handleGetAddressGroups]);

  useEffect(() => {
    handleGetAllUserContacts();
  }, [handleGetAllUserContacts]);

  /**
   * EFFECTS
   */

  // this is here since we want to update it to a new cart if completed
  // this is also to link/unlink the user info since a checkout button is available on every screen
  useEffect(() => {
    /**
     * Links user account if logged in and vice versa if logged out.
     * Also creates a new checkout instance if the checkout has been completed already.
     */
    const handleCheckoutData = async () => {
      if (checkoutData) {
        const node = checkoutData.node;
        const isOrderCompleted = node?.completedAt;
        // If order has been completed, create a new cart

        if (isOrderCompleted) {
          await createCheckout({variables: {input: {lineItems: []}}});
        } else {
          const checkoutId = node?.id;
          const checkoutEmail = node?.email;

          if (authData?.accessToken && !checkoutEmail && checkoutId) {
            const defaultAddress = profileData?.customer?.defaultAddress;
            // Add shipping address if default address exists
            if (defaultAddress) {
              await checkoutShippingAddressUpdate({
                variables: {
                  shippingAddress: {
                    address1: defaultAddress.address1,
                    address2: defaultAddress.address2,
                    firstName: defaultAddress.firstName,
                    lastName: defaultAddress.lastName,
                    city: defaultAddress.city,
                    country: defaultAddress.country,
                    phone: defaultAddress.phone,
                    province: defaultAddress.province,
                    zip: defaultAddress.zip,
                  },
                  checkoutId: checkoutId,
                },
              });
            }
            // Associate user to checkout if logged in
            await linkAssociateCustomer({
              variables: {
                checkoutId: checkoutId,
                customerAccessToken: authData.accessToken,
              },
            });
          } else if (!authData?.accessToken && checkoutEmail) {
            // Copies the lineitems of the previous checkout
            const lineItems = node?.lineItems.edges.map(edge => {
              return {
                customAttributes: edge.node.customAttributes.map(attribute => ({
                  key: attribute.key,
                  value: attribute.value || '',
                })),
                quantity: edge.node.quantity,
                variantId: edge.node.variant?.id || '',
              };
            });

            // Create new checkout to clear email and shipping address
            await createCheckout({
              variables: {input: {lineItems: lineItems}},
            });
          }
        }
      }
    };
    handleCheckoutData();
  }, [checkoutData]);

  useEffect(() => {
    // temporary while navlinks are incomplete
    setIsNavOpen(false);
  }, [match.url]);

  const items = [
    {
      title: _.startCase(StationeryTypes.WEDDING),
      onClick: () => history.push(routes.STORE__VIEW(weddingCategories[0].id)),
      includedRoutes: weddingCategories.map(category => category.id),
    },
    {
      title: _.startCase(StationeryTypes.HOLIDAY),
      onClick: () => history.push(routes.STORE__VIEW(holidayCategories[0].id)),
      includedRoutes: holidayCategories.map(category => category.id),
    },
    {
      title: _.startCase(StationeryTypes.GREETING),
      onClick: () => history.push(routes.STORE__VIEW(greetingCategories[0].id)),
      includedRoutes: greetingCategories.map(category => category.id),
    },
    // Uncomment out once business stationery is available
    {
      title: _.startCase(StationeryTypes.BUSINESS),
      onClick: () => history.push(routes.STORE__VIEW(businessCategories[0].id)),
      includedRoutes: businessCategories.map(category => category.id),
    },
    // Uncomment out once bespoke stationery is available
    {
      title: _.startCase(StationeryTypes.BESPOKE),
      onClick: () =>
        history.push(routes.STORE__VIEW__CUSTOM_CARD_CUSTOMIZATION),
      includedRoutes: bespokeCategories.map(category => category.id),
    },
  ];

  const getIsNavItemActive = (includedRoutes: Array<string>) => {
    // If [productTypeId] is undefined, then get the second route instead (e.g. "/store/packages" => "packages")
    // This applies for "packages"; See: routes.STORE__VIEW__PACKAGE_CUSTOMIZATION()
    const fallbackProductTypeId = location.pathname.split('/')[2];

    return includedRoutes.some(
      route => route === (productTypeId || fallbackProductTypeId)
    );
  };

  return (
    <Header $headerType={headerType}>
      <div className="relative w-full">
        {/* Menu icon on absolute left (for mobile only) */}
        <div className="absolute flex space-x-5 transform -translate-y-1/2 laptop:hidden laptop:left-14 left-3 top-1/2">
          <button
            className="focus:outline-none"
            onClick={() => setIsNavOpen(true)}
          >
            {color === 'white' ? (
              <MenuLightIcon className="w-[27px] h-[27px]" />
            ) : (
              <MenuDarkIcon className="w-[27px] h-[27px]" />
            )}
          </button>
        </div>
        <MobileDrawer open={isNavOpen}>
          <button
            className="focus:outline_none"
            onClick={() => setIsNavOpen(false)}
          >
            <CloseIcon className="w-[27px] h-[27px]" />
          </button>
          {items.map(item => (
            <div key={item.title} className="my-16">
              <NavItem
                onClick={item.onClick}
                color={'blue'}
                textSize={18}
                isActive={getIsNavItemActive(item.includedRoutes || [])}
              >
                {item.title}
              </NavItem>
            </div>
          ))}
          <div className="border-t border-solid border-gray" />
          <div className="mt-16">
            <NavItem
              color="blue"
              textSize={18}
              onClick={() => history.push(routes.USER__SETTING)}
            >
              {!authData?.accessToken
                ? 'Sign in / Create Account'
                : 'My Account'}
            </NavItem>
          </div>
          {authData?.accessToken && (
            <div
              className="mt-16"
              onClick={() => {
                deleteUserAccessToken({
                  variables: {customerAccessToken: authData?.accessToken || ''},
                });
                setIsNavOpen(false);
              }}
            >
              <NavItem color="blue" textSize={18}>
                Logout
              </NavItem>
            </div>
          )}
        </MobileDrawer>
        {/* Logo and nav items on flex */}
        <div className="flex flex-col items-center justify-center laptop:pb-5">
          <button
            className="my-5 laptop:mb-8"
            onClick={() => history.push(routes.HOME)}
          >
            <img
              className="h-[27px] tablet:h-9"
              src={
                color === 'white'
                  ? images.decree_white_logo
                  : images.decree_blue_logo
              }
            />
          </button>
          {/* Nav items (hidden on mobile) */}
          <div className="hidden space-x-14 laptop:flex">
            {items.map(item => (
              <NavItem
                key={item.title}
                onClick={item.onClick}
                color={color}
                isActive={getIsNavItemActive(item.includedRoutes || [])}
              >
                {item.title}
              </NavItem>
            ))}
          </div>
        </div>
        {isProfileOpen && (
          <div className="absolute right-6 top-[65%] z-10 w-[160px] rounded-md shadow-xl bg-white space-y-3 py-4">
            {authData?.accessToken ? (
              <>
                <DecreeText
                  size={14}
                  className="text-center text-blue-dark hover:cursor-pointer"
                  onClick={() => history.push(routes.USER__SETTING)}
                >
                  MY ACCOUNT
                </DecreeText>
                <DecreeText
                  size={14}
                  className="text-center text-blue-dark hover:cursor-pointer"
                  onClick={() => {
                    deleteUserAccessToken({
                      variables: {
                        customerAccessToken: authData?.accessToken || '',
                      },
                    });
                    setIsProfileOpen(false);
                  }}
                >
                  SIGN OUT
                </DecreeText>
              </>
            ) : (
              <>
                <DecreeText
                  size={14}
                  className="text-center text-blue-dark hover:cursor-pointer"
                  onClick={() => history.push(routes.SIGN_UP)}
                >
                  CREATE AN ACCOUNT
                </DecreeText>
                <DecreeText
                  size={14}
                  className="text-center text-blue-dark hover:cursor-pointer"
                  onClick={() => history.push(routes.LOGIN)}
                >
                  SIGN IN
                </DecreeText>
              </>
            )}
          </div>
        )}
        {/* Fixed icons on absolute right */}
        <div className="absolute flex space-x-5 transform -translate-y-1/2 laptop:right-14 right-3 top-1/2">
          <button
            className="hidden laptop:block focus:outline-none"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsCartOpen(false);
            }}
          >
            <ProfileIcon
              stroke={color === 'white' ? '#fff' : '#324B6F'}
              strokeWidth={2.5}
              className="w-[34px] h-[34px]"
            />
          </button>
          <button
            className="focus:outline-none"
            onClick={() => {
              if (isMobile) {
                history.push(routes.CART);
              } else {
                setIsCartOpen(is => !is);
                setIsProfileOpen(false);
              }
            }}
          >
            <CartIcon
              fill={color === 'white' ? '#fff' : '#324B6F'}
              className="w-[27px] h-[27px] laptop:w-[34px] laptop:h-[34px]"
            />
            {/* Cart item count badge */}
            <div className="absolute bottom-0 right-0 flex items-center justify-center w-4 h-4 pt-[1px] text-xs rounded-full bg-blue-light text-blue-dark">
              {checkoutData?.node?.__typename === 'Checkout'
                ? checkoutData.node.lineItems.edges.filter(
                    edge =>
                      edge.node.variant?.product.productType !==
                      productTypes.SHIPMENT
                  ).length
                : 0}
            </div>
          </button>
        </div>
        {/* Absolute cart modal */}
        <CartModal
          checkout={checkoutData?.node}
          isOpen={isCartOpen}
          shipmentData={shipmentData}
          sampleIsOnLimit={sampleIsOnLimit}
          loading={
            loadingCheckoutData ||
            loadingCheckoutRemoveItem ||
            loadingLinkAssociateCustomer ||
            loadingCheckoutCreate ||
            loadingDeleteUserAccessToken ||
            loadingCheckoutAddLineItems ||
            loadingCheckoutUpdateItem ||
            loadingShipmentData ||
            isLoading ||
            loadingCheckoutShippingAddressUpdate ||
            loadingProfile
          }
          isAuthenticated={isAuthenticated}
          onClose={() => setIsCartOpen(is => !is)}
          userClickedRemove={(id, svgUrl) => {
            const lineItemIds = [id];

            const shipment = checkoutData?.node.lineItems.edges.find(edge =>
              edge.node.customAttributes.some(
                attr => attr.key === '_parent' && attr.value === id
              )
            );

            const envelope = _.find(
              checkoutData?.node.lineItems.edges,
              e =>
                e.node.customAttributes.some(
                  i =>
                    i.value === svgUrl &&
                    i.key === customAttributeFields.PARENT_SVG_FILE
                ) && e.node.id !== id
            );

            if (envelope?.node) {
              lineItemIds.push(envelope.node.id);
            }

            if (shipment?.node) {
              lineItemIds.push(shipment.node.id);
            }

            removeCheckoutLineItem({
              variables: {
                checkoutId: checkoutData?.node.id || '',
                lineItemIds,
              },
            });
          }}
          userClickedCheckout={async () => {
            const gaClientId = await getGoogleClientId('linkerParam');
            if (checkoutData?.node.webUrl && gaClientId) {
              window.location.replace(
                `${checkoutData?.node.webUrl}&${gaClientId}`
              );
            } else {
              toast.error('Error checking out');
            }
          }}
          userSelectedQuantity={lineItem => {
            const lineItems = [lineItem];

            updateCheckoutLineItem({
              variables: {
                checkoutId: checkoutData?.node.id || '',
                lineItems,
              },
            });
          }}
          userConfiguredShipment={async (shipment, lineItem, contactIds) => {
            if (!contactIds.length)
              return toast.error('Please select recipients for the shipment.');

            // get stationery attributes
            let stationeryAttributes =
              lineItem.customAttributes.map(({key, value}) => ({key, value})) ||
              [];
            // check if stationery has shipment attribute to determine if it should edit
            const hasProductShipment = stationeryAttributes.find(
              attr => attr.key === customAttributeFields.SHIPMENT
            );

            // get the lineitem of the "shipping" product associated with the stationery
            const shippingLineItem = checkoutData?.node.lineItems.edges.find(
              edge => edge.node.variant?.id === hasProductShipment?.value
            );

            const shipmentVariantData =
              shipmentData?.productByHandle.variants.edges.find(
                edge => edge.node.id === shipment.variantId
              );

            const isRemovingShipment =
              hasProductShipment && !shipment.variantId;
            const isAddingShipment = !hasProductShipment && shipment.variantId;
            const isEditingShipment = hasProductShipment && shipment.variantId;

            try {
              if (isAddingShipment) {
                setIsLoading(true);

                const selectedContacts =
                  handleGetShipmentRecipients(contactIds);

                const blob = ConvertAddressesToCsvBlob(selectedContacts);
                const csvUrl = await services.cloud.uploadIcon(
                  blob,
                  'address.csv'
                );
                setIsLoading(false);

                stationeryAttributes = [
                  ...stationeryAttributes,
                  {
                    key: customAttributeFields.SHIPMENT,
                    value: shipment.variantId || '',
                  },
                  {
                    key: customAttributeFields.SHIPMENT_TYPE,
                    value: shipmentVariantData?.node.title || '',
                  },
                  {
                    key: customAttributeFields.CSV_LINK,
                    value: csvUrl,
                  },
                ];

                await addCheckoutLineItems({
                  variables: {
                    checkoutId: checkoutData?.node.id || '',
                    lineItems: [
                      {
                        quantity: lineItem.quantity || 0,
                        variantId: shipment.variantId || '',
                        customAttributes: [
                          {key: '_parent', value: lineItem.id},
                        ],
                      },
                    ],
                  },
                });
              } else if (isRemovingShipment) {
                stationeryAttributes = stationeryAttributes.filter(
                  attr =>
                    attr.key !== customAttributeFields.SHIPMENT &&
                    attr.key !== customAttributeFields.SHIPMENT_TYPE &&
                    attr.key !== customAttributeFields.CSV_LINK
                );

                await removeCheckoutLineItem({
                  variables: {
                    checkoutId: checkoutData?.node.id || '',
                    lineItemIds: [shippingLineItem?.node.id || ''],
                  },
                });
              } else if (isEditingShipment) {
                setIsLoading(true);
                const selectedContacts =
                  handleGetShipmentRecipients(contactIds);
                const blob = ConvertAddressesToCsvBlob(selectedContacts);
                const csvUrl = await services.cloud.uploadIcon(
                  blob,
                  'address.csv'
                );
                setIsLoading(false);

                stationeryAttributes = stationeryAttributes.map(attr => {
                  if (attr.key === customAttributeFields.SHIPMENT) {
                    return {...attr, value: shipment.variantId || ''};
                  }
                  if (attr.key === customAttributeFields.SHIPMENT_TYPE) {
                    return {
                      ...attr,
                      value: shipmentVariantData?.node.title || '',
                    };
                  }
                  if (attr.key === customAttributeFields.CSV_LINK) {
                    return {
                      ...attr,
                      value: csvUrl,
                    };
                  }
                  return attr;
                });
              }

              const lineItemsUpdate: CheckoutLineItemUpdateInput[] = [
                {
                  id: lineItem?.id || '',
                  customAttributes: stationeryAttributes as AttributeInput[],
                },
              ];

              // should update always the custom attributes of the stationery
              await updateCheckoutLineItem({
                variables: {
                  checkoutId: checkoutData?.node.id || '',
                  lineItems: isEditingShipment
                    ? [
                        ...lineItemsUpdate,
                        {
                          id: shippingLineItem?.node.id || '',
                          variantId: shipment.variantId,
                        },
                      ]
                    : lineItemsUpdate,
                },
              });
            } catch (error) {
              toast.error(error?.message || 'Error saving shipment');
            }
          }}
          userClickedEdit={lineItemNode => {
            if (!lineItemNode?.variant?.product) {
              toast.error('Invalid Product');
              return;
            }

            const productTypeId =
              lineItemNode.variant.product.productType || 'invitation';
            const productId = lineItemNode.variant.product.id;

            // ID is now based on the svg file id
            // Doing this since if its the same variant even with custom attributes the ID is the same
            const svgFileId = _.last(
              lineItemNode.customAttributes?.[0]?.value?.split('/')
            );

            history.push({
              pathname: routes.STORE__VIEW__PRODUCT_CUSTOMIZATION(
                productTypeId,
                productId
              ),
              search: `id=${svgFileId}`,
            });
          }}
          userContacts={userContacts}
          addressGroups={addressGroups}
        />
      </div>
    </Header>
  );
};

const NavItem: React.FC<{
  onClick?: () => void;
  isActive?: boolean;
  color?: keyof typeof navItemColor;
  textSize?: number;
}> = ({color = 'blue', onClick, textSize = 12, ...props}) => {
  return (
    <TwButton onClick={onClick} $isActive={props.isActive}>
      <DecreeText
        size={textSize}
        className={`tracking-wide uppercase ${navItemColor[color]}`}
      >
        {props.children}
      </DecreeText>
    </TwButton>
  );
};

const MobileDrawer: React.FC<{
  open?: boolean;
}> = ({open, ...props}) => {
  return (
    <div
      className={clsx([
        {'-translate-x-full': !open, absolute: !open},
        `bg-offwhite p-4 h-screen w-full fixed inset-y-0 left-0 transform
         transition duration-200 ease-in-out tablet:w-5/12 laptop:hidden z-20 overflow-auto`,
      ])}
    >
      {props.children}
    </div>
  );
};

const navItemColor: {[key: string]: string} = {
  blue: 'text-blue-dark',
  white: 'text-white',
};

const Header = tw.div<{$headerType: 'absolute' | 'block'}>`
  flex justify-center w-full laptop:pt-5 fhd:pt-12 z-10
  ${p => p.$headerType}
`;

const TwButton = tw.button<{$isActive?: boolean}>`
  text-blue-dark outline-none focus:outline-none 
  ${p =>
    clsx('border-b-[1px] border-gold', {
      'border-opacity-0 hover:border-opacity-100': !p.$isActive,
    })}
`;
