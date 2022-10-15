import clsx from 'clsx';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  Slide,
  Slider,
} from 'pure-react-carousel';
import React, {useRef} from 'react';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowInsideCircle,
} from '../../../../assets/svg';
import {DecreeCtaButton} from '../../../core/DecreeCtaButton';
import {DecreeText} from '../../../core/DecreeText';
import {CarouselListener} from './CarouselListener';
import {useHistory} from 'react-router-dom';
import {SlideProps} from '../../containers/HomeScreenContainer';

type Props = {
  slides: SlideProps;
  setActiveColor: (color: 'white' | 'blue') => void;
  activeColor: 'white' | 'blue';
};

export const LandingCarousel = (props: Props) => {
  // Using a ref since we dont need it to rerender using useState
  const currentSlideIndex = useRef(0);
  const history = useHistory();

  return (
    <div className="w-full h-full">
      <CarouselProvider
        // slide ratio for desktop: 16:9
        // slide ratio for mobile: 4:3
        naturalSlideWidth={isMobile ? 4 : 16}
        naturalSlideHeight={isMobile ? 3 : 9}
        infinite={true}
        totalSlides={props.slides.length}
      >
        <CarouselListener
          setCurrentIndex={(index: number) => {
            currentSlideIndex.current = index;
          }}
        />
        <div className="relative">
          <Slider
            onTransitionEnd={() => {
              props.setActiveColor(
                props.slides[currentSlideIndex.current].textColor
              );
            }}
          >
            {props.slides.map((slide, i) => {
              return (
                <Slide key={slide.id} index={i}>
                  <div className="relative w-full h-full">
                    <img
                      className="absolute object-cover object-center w-full h-full"
                      src={slide.imageUrl}
                    />
                    <div className="absolute w-3/4 space-y-6 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <DecreeText
                        size={19}
                        className={clsx(
                          'hidden tablet:block tracking-[0.205em] uppercase',
                          {
                            'text-white': slide.textColor === 'white',
                            'text-blue-dark': slide.textColor === 'blue',
                          }
                        )}
                      >
                        {slide.subtitle}
                      </DecreeText>
                      <div
                        className={clsx(
                          'tracking-[0.205em] uppercase text-lg laptop:text-size-41',
                          {
                            'text-white': slide.textColor === 'white',
                            'text-blue-dark': slide.textColor === 'blue',
                          }
                        )}
                      >
                        {slide.title}
                      </div>
                    </div>
                    {/* Shown only if the slide is not using the standard CTA button and if its not in mobile */}
                    <button
                      className={clsx(
                        'hidden absolute bottom-[15%] laptop:bottom-[50%] laptop:left-[60%] laptop:mt-10 laptop:py-4 laptop:px-9',
                        {'laptop:block': !slide.isUsingCtaButton}
                      )}
                      onClick={() => history.push(slide.route)}
                    >
                      <div className="flex space-x-2">
                        <DecreeText size={23} className="text-gold">
                          {slide.desktopButtonText}
                        </DecreeText>
                        <ArrowInsideCircle />
                      </div>
                    </button>
                    {/* Shown if the slide is using the CTA button or if its in mobile */}
                    <DecreeCtaButton
                      mode="secondary"
                      className={clsx(
                        'absolute bottom-[15%] laptop:bottom-[25%] left-1/2 transform -translate-x-1/2 laptop:mt-10 laptop:py-4 laptop:px-9',
                        {'laptop:hidden': !slide.isUsingCtaButton}
                      )}
                      onClick={() => history.push(slide.route)}
                    >
                      <DecreeText
                        size={14}
                        className="font-serif tracking-[0.145em] uppercase font-bold"
                      >
                        <div className="hidden laptop:block">
                          {slide.desktopButtonText}
                        </div>
                        <div className="laptop:hidden">
                          {slide.mobileButtonText}
                        </div>
                      </DecreeText>
                    </DecreeCtaButton>
                  </div>
                </Slide>
              );
            })}
          </Slider>
          <ButtonBack className="absolute transform -translate-y-1/2 left-6 hd:left-14 top-1/2">
            <ArrowLeftIcon
              fill={clsx({
                '#324B6F': props.activeColor === 'blue',
                '#fff': props.activeColor === 'white',
              })}
              className="w-2 laptop:w-7"
            />
          </ButtonBack>
          <ButtonNext className="absolute transform -translate-y-1/2 right-6 hd:right-14 top-1/2">
            <ArrowRightIcon
              fill={clsx({
                '#324B6F': props.activeColor === 'blue',
                '#fff': props.activeColor === 'white',
              })}
              className="w-2 laptop:w-7"
            />
          </ButtonNext>
          <DesktopIndicators
            $color={props.activeColor}
            className="hidden laptop:block absolute space-x-6 transform -translate-x-1/2 bottom-[3%] left-1/2"
          />
          <MobileIndicators
            $color={props.activeColor}
            className="laptop:hidden absolute space-x-2 transform -translate-x-1/2 bottom-[3%] left-1/2"
          />
        </div>
      </CarouselProvider>
    </div>
  );
};

const DesktopIndicators = styled(DotGroup)<{$color: 'white' | 'blue'}>`
  .carousel__dot {
    position: relative;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${p => (p.$color === 'white' ? '#fff' : '#324B6F')};
  }
  /* creates an outer circle */
  .carousel__dot--selected {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 18px;
      width: 18px;
      border-radius: 50%;
      border: 1px solid ${p => (p.$color === 'white' ? '#fff' : '#324B6F')};
    }
  }
`;

const MobileIndicators = styled(DotGroup)<{$color: 'white' | 'blue'}>`
  .carousel__dot {
    position: relative;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: ${p => (p.$color === 'white' ? '#fff' : '#324B6F')};
  }
  /* creates an outer circle */
  .carousel__dot--selected {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background-color: ${p => (p.$color === 'white' ? '#fff' : '#324B6F')};
    }
  }
`;
