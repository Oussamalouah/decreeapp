import React, {useState} from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';
import {images} from '../../assets/images';
import {ArrowDownIcon, ArrowUpIcon} from '../../assets/svg';
import {DecreeCtaButton} from './DecreeCtaButton';
import {DecreeText} from './DecreeText';
import facebookIcon from '../../assets/svg/facebook_icon.svg';
import instagramIcon from '../../assets/svg/instagram_icon.svg';
import pinterestIcon from '../../assets/svg/pinterest_icon.svg';
import linkedinIcon from '../../assets/svg/linkedin_icon.svg';
import tiktokIcon from '../../assets/svg/tiktok_icon.svg';
import {routes} from '../../route-list';
import {socialMediaLinks} from '../../utils/constants/social-media.constants';

import {useHistory} from 'react-router-dom';
import {
  // Uncomment out once business stationery is available
  businessCategories,
  greetingCategories,
  holidayCategories,
  weddingProductTypes,
} from '../../utils/constants/store.contants';
import {Environment} from '../../Environment';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {EmailSubscriptionFormValidationSchema} from '../../utils/validation-schemas';
import {toast} from 'react-toastify';
import {StationeryTypes} from '../../utils/constants/stationery-type.constants';
import _ from 'lodash';

type EmailSubscriptionFormState = {
  email: string;
};

const socialMedia = [
  // {
  //   image: facebookIcon,
  //   link: socialMediaLinks.facebook,
  // },
  {
    image: instagramIcon,
    link: socialMediaLinks.instagram,
  },
  {
    image: pinterestIcon,
    link: socialMediaLinks.pinterest,
  },
  {
    image: linkedinIcon,
    link: socialMediaLinks.linkedin,
  },
  // {
  //   image: tiktokIcon,
  //   link: socialMediaLinks.tiktok,
  // },
];

/**
 * The footer component of the app
 * @component
 * @example
 * <DecreeFooter />
 *
 * @return JSX.Element
 */
export const DecreeFooter = () => {
  const history = useHistory();
  const {services} = Environment.current();
  const form = useForm<EmailSubscriptionFormState>({
    resolver: yupResolver(EmailSubscriptionFormValidationSchema),
    mode: 'onTouched',
  });

  const items = [
    {
      title: 'Shop',
      subItems: [
        {
          title: _.startCase(StationeryTypes.WEDDING),
          onClick: () => {
            history.push(routes.STORE__VIEW(weddingProductTypes.INVITATION));
            window.scrollTo(0, 0);
          },
        },
        {
          title: _.startCase(StationeryTypes.HOLIDAY),
          onClick: () => {
            history.push(routes.STORE__VIEW(holidayCategories[0].id));
            window.scrollTo(0, 0);
          },
        },
        {
          title: _.startCase(StationeryTypes.GREETING),
          onClick: () => {
            history.push(routes.STORE__VIEW(greetingCategories[0].id));
            window.scrollTo(0, 0);
          },
        },
        // Uncomment out once business stationery is available
        {
          title: 'Business Stationery',
          onClick: () => {
            history.push(routes.STORE__VIEW(businessCategories[0].id));
            window.scrollTo(0, 0);
          },
        },
        // Uncomment our once bespoke is available
        {
          title: _.startCase(StationeryTypes.BESPOKE),
          onClick: () => {
            history.push(routes.STORE__VIEW__CUSTOM_CARD_CUSTOMIZATION);
            window.scrollTo(0, 0);
          },
        },
      ],
    },
    {
      title: 'Company',
      subItems: [
        {title: 'About', onClick: () => history.push(routes.ABOUT_US)},
        // {title: 'Products', onClick: () => {}},
        {
          title: 'Privacy Policy',
          onClick: () => history.push(routes.PRIVACY_POLICY),
        },
        {
          title: 'Terms of Service',
          onClick: () => history.push(routes.TERMS_OF_SERVICE),
        },
      ],
    },
    {
      title: 'Help',
      subItems: [
        {title: 'FAQ', onClick: () => history.push(routes.FAQ)},
        // {title: 'Shipping & Returns', onClick: () => {}},
        // {title: 'help@decree.com', onClick: () => {}},
        // {title: 'For support call (856)651-6889'}
      ],
    },
  ];

  return (
    <Footer style={{backgroundImage: `url(${images.decree_big_footer_bg})`}}>
      <div className="flex flex-col-reverse text-white fhd:self-center laptop:flex-row fhd:w-screen-figma">
        {/* Footer columns (only shown on desktop) */}
        <div className="flex-grow-[1.5] hidden laptop:flex">
          {items.map(item => (
            <FooterColumn key={item.title}>
              <ColumnTitle size={23}>{item.title}</ColumnTitle>
              <div className="space-y-3">
                {item.subItems.map(subItem => (
                  <ColumnItem
                    size={14}
                    className="cursor-pointer"
                    key={subItem.title}
                    onClick={() => subItem?.onClick()}
                  >
                    {subItem.title}
                  </ColumnItem>
                ))}
                {item.title === 'Help' && (
                  <ColumnItem size={14} className="cursor-pointer">
                    <a href="tel:(856)651-6889">
                      For support call (856) 651-6889
                    </a>
                  </ColumnItem>
                )}
              </div>
            </FooterColumn>
          ))}
        </div>
        {/* Footer dropdowns (only shown in mobile) */}
        <div className="mt-8 space-y-6 laptop:hidden">
          {items.map(item => (
            <FooterItemDropdown
              key={item.title}
              title={item.title}
              subItems={item.subItems}
            />
          ))}
        </div>
        <form
          className="flex flex-col items-center flex-1 laptop:self-center"
          onSubmit={form.handleSubmit(async content => {
            try {
              await services.email.emailSubscription(content.email);
              form.reset();
              toast.success('Email has been successfully subscribed');
            } catch (e) {
              toast.error(e.message);
            }
          })}
        >
          <div className="space-y-1 w-full">
            <input
              placeholder="Email Address"
              className="w-full pb-2 text-white placeholder-white bg-transparent border-b border-white focus:outline-none"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <>
                <div className="h-[2px]" />
                <small className="text-red-500">
                  {form.formState.errors.email.message}
                </small>
              </>
            )}
          </div>
          <div className="mt-8 hd:mt-10">
            <DecreeCtaButton
              mode="secondary"
              type="submit"
              className="font-serif font-bold tracking-widest uppercase text-blue-cyan"
            >
              Subscribe
            </DecreeCtaButton>
          </div>
        </form>
      </div>
      <div className="h-full m-auto mt-10 laptop:mt-16">
        <img
          src={images.decree_footer_logo}
          className="object-contain h-24 m-auto laptop:h-36"
        />
        <div className="flex justify-between mt-6 space-x-4">
          {socialMedia.map(social => {
            return (
              <a href={social.link} key={social.link} target="_blank">
                <SocialMediaIcon src={social.image} />
              </a>
            );
          })}
        </div>
      </div>
    </Footer>
  );
};

const FooterItemDropdown = (props: {
  title: string;
  subItems: {title: string; onClick: () => void}[];
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      <button
        className="flex items-center justify-between w-full focus:outline-none"
        onClick={() => setIsDropdownOpen(previous => !previous)}
      >
        <DecreeText
          size={23}
          className="font-serif font-bold tracking-wide uppercase"
        >
          {props.title}
        </DecreeText>
        {isDropdownOpen ? (
          <ArrowUpIcon className="object-contain h-3" />
        ) : (
          <ArrowDownIcon className="object-contain h-3" />
        )}
      </button>

      {isDropdownOpen && (
        <>
          {props.subItems.map(item => {
            return (
              <DecreeText
                size={14}
                key={item.title}
                className="font-sans uppercase my-4 tracking-[0.205em]"
                onClick={item.onClick}
              >
                {item.title}
              </DecreeText>
            );
          })}
          {props.title === 'Help' && (
            <DecreeText
              size={14}
              className="font-sans uppercase my-4 tracking-[0.205em]"
            >
              <a href="tel:(856)651-6889">For support call (856)651-6889</a>
            </DecreeText>
          )}
        </>
      )}
    </>
  );
};

const Footer = tw.div`
  flex flex-col bg-center bg-no-repeat bg-cover bg-blue-dark
  px-14 pt-10 pb-20
  laptop:py-12 laptop:px-14
  hd:pt-24 hd:px-28 hd:pb-16
`;

const FooterColumn = tw.div`
  flex-1 flex flex-row laptop:flex-col
`;

const ColumnTitle = tw(DecreeText)`
  font-serif font-bold uppercase mb-6
`;

const ColumnItem = tw(DecreeText)`
  uppercase
`;

const SocialMediaIcon = tw.img`
  w-7 h-7 object-contain
  laptop:w-10 laptop:h-10
`;
