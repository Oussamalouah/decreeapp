import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import React, {useState} from 'react';
import {isMobile} from 'react-device-detect';
import styled, {css} from 'styled-components';
import tw from 'tailwind-styled-components/dist/tailwind';
import {DecreeCardPreview} from '../../../core/DecreeCardPreview';
import {DecreeRoundButton} from '../../../core/DecreeRoundButton';
import {DecreeText} from '../../../core/DecreeText';
import {FavoritesContainerProps} from '../../containers/FavoritesContainer';
import {DecreeSpinner} from '../../../core/DecreeSpinner';
import _ from 'lodash';

export const Favorites = ({
  favoritesCollections,
  loading,
  userClickedViewDetails,
}: FavoritesContainerProps) => {
  const [activeItem, setActiveItem] = useState<number>(0); // temporary

  if (loading) {
    return (
      <div className="w-full tablet:w-[90%] mx-auto py-11 laptop:py-20 max-w-screen-figma">
        <DecreeSpinner type="primary" />
      </div>
    );
  }

  return (
    <div className="w-full tablet:w-[90%] mx-auto py-11 laptop:py-20 max-w-screen-figma">
      <div className="text-2xl laptop:text-3xl font-serif font-bold tracking-[0.075em] text-center text-blue-dark">
        Our Favorites
      </div>
      {/* Only shown in tablet+ */}
      <div className="hidden tablet:block mt-14">
        <div className="border-b-2 border-gray text-center">
          <div className="flex items-center justify-center space-x-20">
            {favoritesCollections.map((item, index) => {
              return (
                <NavItem
                  key={item!.id}
                  size={23}
                  $isActive={activeItem === index}
                  onClick={() => setActiveItem(index)}
                >
                  {item!.title}
                </NavItem>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-16">
          {favoritesCollections[activeItem]?.products!.edges.map((edge, i) => {
            const product = edge.node;
            return (
              <DecreeCardPreview
                key={i}
                title={product.title}
                imageURL={
                  product.media.edges?.[0].node.previewImage?.originalSrc
                }
                subtitle={
                  product.subtitle?.value ||
                  `${_.startCase(product.productType)} Stationery`
                }
                hasShadow={true}
                hoverButtonsDirection="vertical"
                hoverButtonsOverride={[
                  <DecreeRoundButton
                    className="w-[30%]"
                    key="2"
                    onClick={() => userClickedViewDetails(product)}
                  >
                    View Details
                  </DecreeRoundButton>,
                ]}
                onEditClick={() => {
                  // For tablets
                  if (isMobile) {
                    userClickedViewDetails(product);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
      {/* Only shown in mobile */}
      <div className="mt-8 tablet:hidden">
        <CarouselProvider
          naturalSlideWidth={233}
          naturalSlideHeight={297}
          totalSlides={9}
        >
          <Slider className="px-[15%]">
            {favoritesCollections[activeItem]?.products!.edges.map(
              (edge, i) => {
                const product = edge.node;
                return (
                  <Slide key={i} index={i} innerClassName="px-3">
                    <DecreeCardPreview
                      title={product.title}
                      imageURL={
                        product.media.edges?.[0].node.previewImage?.originalSrc
                      }
                      subtitle={
                        product.subtitle?.value ||
                        `${_.startCase(product.productType)} Stationery`
                      }
                      hasShadow={true}
                      hoverButtonsDirection="vertical"
                      onEditClick={() => userClickedViewDetails(product)}
                    />
                  </Slide>
                );
              }
            )}
          </Slider>
        </CarouselProvider>
      </div>
    </div>
  );
};

const NavItem = styled(tw(DecreeText)`
  font-serif text-blue-dark pb-4 relative cursor-pointer
`)<{$isActive?: boolean}>`
  ${p =>
    p.$isActive
      ? css`
          font-weight: bold;
          opacity: 1;
          &::after {
            content: '';
            position: absolute;
            top: 100%;
            transform: translateY(-20%);
            left: 0;
            height: 3px;
            width: 100%;
            border-radius: 10px;
            background-color: #324b6f;
          }
        `
      : css`
          opacity: 0.6;
        `}
`;
