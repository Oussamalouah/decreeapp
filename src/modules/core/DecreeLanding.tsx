import React from 'react';
import {isMobile} from 'react-device-detect';
import tw from 'tailwind-styled-components/dist/tailwind';
import {images} from '../../assets/images';
import _ from 'lodash';
import {StationeryTypes} from '../../utils/constants/stationery-type.constants';
import {PageTitles} from '../../utils/constants/page-title.constants';

type Props = {
  type: StationeryTypes | PageTitles | undefined;
  subtitle?: string;
};

const getBackground = (
  type: StationeryTypes | PageTitles | undefined,
  isMobile: boolean
) => {
  switch (type) {
    case StationeryTypes.WEDDING: {
      return images.wedding_stationery_background;
    }
    case PageTitles.ABOUT_US: {
      return images.about_us_background;
    }
    case StationeryTypes.BESPOKE: {
      return images.bespoke_stationery_background;
    }
    case StationeryTypes.GREETING: {
      return images.greeting_stationery_background;
    }
    case StationeryTypes.HOLIDAY: {
      // TODO: Change this once we get the image for this
      return images.holiday_stationery_background;
    }
    // Uncomment out once business stationery is available
    case StationeryTypes.BUSINESS: {
      return images.business_stationery_background;
    }
    case PageTitles.FAQ: {
      return images.faq_screen_background;
    }
    case PageTitles.PRIVACY_POLICY: {
      return images.privacy_policy_background;
    }
    case PageTitles.CONTACT_US: {
      return images.contact_us_background;
    }
    case PageTitles.TERMS_OF_SERVICE: {
      return images.terms_of_service_background;
    }
  }
};

export const DecreeLanding = (props: Props) => {
  return (
    <BackgroundLanding
      style={{
        backgroundImage: `url(${getBackground(props.type, isMobile)})`,
      }}
    >
      <CenterText
        $isTextBlue={false}
        // props.type === StationeryTypes.WEDDING && !isMobile}
      >
        <div className="absolute transform -translate-y-1/2 top-1/2">
          <Title>{_.startCase(props.type)}</Title>
          <div className="h-3" />
          <Subtitle>{props.subtitle || ''}</Subtitle>
        </div>
      </CenterText>
    </BackgroundLanding>
  );
};

const BackgroundLanding = tw.div`
  w-full flex
  bg-no-repeat bg-center bg-cover
`;

// didnt use breakpoints for this cause of the tablet mode
const CenterText = tw.div<{$isTextBlue: boolean}>`
  mx-auto mt-12  laptop:mt-40 h-[30vh] laptop:h-[55vh]
  relative flex justify-center
  w-[85%] laptop:w-[53.5%] text-center
  ${({$isTextBlue}) => ($isTextBlue ? 'text-blue-dark' : 'text-white')}
`;

const Title = tw.div`
  tracking-[0.205em]
  leading-[112%]
  text-lg tablet:text-size-55
  uppercase
`;

const Subtitle = tw.div`
  tracking-[0.1em]
  tablet:leading-[182%]
  text-sm tablet:text-size-21
`;
