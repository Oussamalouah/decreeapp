import React, {useState} from 'react';
import {routes} from '../../../route-list';
import {images} from '../../../assets/images';
import {
  greetingCategories,
  holidayCategories,
  weddingCategories,
} from '../../../utils/constants/store.contants';

export type HomeScreenContainerProps = {
  slides: SlideProps;
  setActiveColor: (color: 'white' | 'blue') => void;
  activeColor: 'white' | 'blue';
};

export type SlideProps = {
  id: string;
  title?: string;
  subtitle?: string;
  desktopButtonText: string;
  mobileButtonText: string;
  isUsingCtaButton: boolean;
  route: string;
  imageUrl: string;
  textColor: 'white' | 'blue';
}[];

const slides = [
  {
    id: '1',
    title: 'Wedding Stationery',
    subtitle:
      'Our customizable suite of elegance harmonizes with your perfect day',
    desktopButtonText: 'Shop',
    mobileButtonText: 'Shop',
    isUsingCtaButton: true,
    route: routes.STORE__VIEW(weddingCategories[0].id),
    imageUrl: images.wedding_stationery_carousel,
    textColor: 'white',
  },
  {
    id: '2',
    title: 'Holiday Stationery',
    subtitle: 'A timeless tradition created with classic craftsmanship',
    desktopButtonText: 'Shop',
    mobileButtonText: 'Shop',
    isUsingCtaButton: true,
    route: routes.STORE__VIEW(holidayCategories[0].id),
    imageUrl: images.holiday_stationery_carousel,
    textColor: 'white',
  },
  {
    id: '3',
    title: 'Greeting Cards',
    subtitle:
      'From Birthdays to Thank You’s, our cards speak to the right moment',
    desktopButtonText: 'Shop',
    mobileButtonText: 'Shop',
    isUsingCtaButton: true,
    route: routes.STORE__VIEW(greetingCategories[0].id),
    imageUrl: images.greeting_cards_carousel,
    textColor: 'white',
  },
  {
    id: '4',
    title: 'Bespoke Stationery',
    subtitle:
      'Bring your own ideas to life from custom monograms to personal cards with our easy design tool',
    desktopButtonText: 'Shop',
    mobileButtonText: 'Shop',
    isUsingCtaButton: true,
    route: routes.STORE__VIEW__CUSTOM_CARD_CUSTOMIZATION,
    imageUrl: images.home_screen_background,
    textColor: 'white',
  },
] as SlideProps;

/**
 * A higher order component...
 * @param Screen
 * @constructor
 */
export const HomeScreenContainer =
  (Screen: React.FC<HomeScreenContainerProps>) => () => {
    const [activeColor, setActiveColor] = useState<'white' | 'blue'>(
      slides[0].textColor
    );

    return (
      <Screen
        slides={slides}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
    );
  };
