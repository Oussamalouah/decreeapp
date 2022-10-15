import React from 'react';

import {LandingCarousel} from './shared/LandingCarousel';
import {Favorites} from './shared/Favorites';
import {EventVideo} from './shared/EventVideo';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import {MidHomeGallery} from './shared/MidHomeGallery';
import {NewStyles} from './shared/NewStyles';
import {OurBelief} from './shared/OurBelief';
import {FavoritesContainer} from '../containers/FavoritesContainer';
import {HomeScreenContainerProps} from '../containers/HomeScreenContainer';

const FavoritesSection = FavoritesContainer(Favorites, {
  collectionHandles: [
    'wedding-stationery-favorites',
    'personal-stationery-favorites',
    'limited-stationery-favorites',
  ],
});

export const HomeScreen = (props: HomeScreenContainerProps) => {
  return (
    <DecreePageWrapper color={props.activeColor}>
      <LandingCarousel
        slides={props.slides}
        setActiveColor={props.setActiveColor}
        activeColor={props.activeColor}
      />
      <FavoritesSection />
      <EventVideo />
      <MidHomeGallery />
      <NewStyles />
      <OurBelief />
    </DecreePageWrapper>
  );
};
