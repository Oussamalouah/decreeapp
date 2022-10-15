import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';
import {DecreeRoundButton} from './DecreeRoundButton';
import {DecreeText} from './DecreeText';
import {isDesktop} from 'react-device-detect';
import {images} from '../../assets/images';

/**
 * @typedef DecreeCardPreviewProps
 */
type DecreeCardPreviewProps = {
  imageURL: string;
  title: string;
  subtitle: string;
  hasShadow?: boolean;
  hoverButtonsDirection?: 'vertical' | 'horizontal';
  footerDirection?: 'vertical' | 'horizontal';
  hoverable?: boolean;
  hoverButtonsOverride?: React.ReactNode;
  thumbnailOrientation?: 'portrait' | 'landscape';
  onPreviewClick?: () => void;
  onEditClick?: () => void;
};

/**
 * DecreeCardPreview
 * @component
 * @param title
 * @param subtitle
 * @param hoverButtonsDirection
 * @param footerDirection
 * @param hoverable
 * @param thumbnailOrientation
 * @param {DecreeCardPreviewProps} props
 * @returns JSX.Element
 */
export const DecreeCardPreview = ({
  title,
  subtitle,
  hoverButtonsDirection = 'horizontal',
  footerDirection = 'vertical',
  hoverable = true,
  thumbnailOrientation = 'portrait',
  ...props
}: DecreeCardPreviewProps) => {
  return (
    <Card $hasShadow={props.hasShadow}>
      <ThumbnailDiv onClick={isDesktop ? () => {} : props.onEditClick}>
        <Thumbnail
          src={props.imageURL || images.decree_no_image}
          style={{
            aspectRatio: thumbnailOrientation === 'portrait' ? '5/7' : 'unset',
          }}
        />
        <HoverButtons
          $hoverable={hoverable}
          $flexDirection={hoverButtonsDirection}
        >
          {props.hoverButtonsOverride || (
            <>
              <DecreeRoundButton
                className="w-[30%]"
                onClick={props.onEditClick}
                type="button"
              >
                Customize
              </DecreeRoundButton>
              <DecreeRoundButton
                className="w-[30%]"
                onClick={props.onPreviewClick}
                type="button"
              >
                Preview
              </DecreeRoundButton>
            </>
          )}
        </HoverButtons>
      </ThumbnailDiv>
      <DescriptionDiv $flexDirection={footerDirection}>
        {footerDirection === 'vertical' ? (
          <>
            <div className="text-base laptop:text-size-23 font-serif font-bold text-blue-dark">
              {title}
            </div>
            <div className="text-xs laptop:text-sm font-serif tracking-[0.075em] uppercase text-gold">
              {subtitle}
            </div>
          </>
        ) : (
          <>
            <DecreeText
              size={23}
              className="font-serif font-bold text-blue-dark"
            >
              {title}
            </DecreeText>
            <DecreeText
              size={23}
              className="font-thin uppercase text-blue-dark"
            >
              {subtitle}
            </DecreeText>
          </>
        )}
      </DescriptionDiv>
    </Card>
  );
};

const Card = tw.div<{
  $hasShadow: boolean | undefined;
}>`
  flex flex-col w-full
  ${({$hasShadow}) => ($hasShadow ? 'shadow-lg laptop:shadow-2xl' : '')}
`;

const ThumbnailDiv = tw.div`
  justify-center flex flex-1 relative bg-offwhite
  
  ${() => (isDesktop ? 'group' : '')}
`;

const Thumbnail = tw.img`
  object-fill w-full h-full
  filter drop-shadow-card
`;

const DescriptionDiv = tw.div<{$flexDirection?: 'vertical' | 'horizontal'}>`
 bg-white flex space-x-2
  ${p =>
    p.$flexDirection === 'vertical'
      ? 'flex-col space-y-2 text-center py-4 px-2 laptop:py-6'
      : 'flex-row items-start justify-between py-4'}
`;

const HoverButtons = tw.div<{
  $hoverable?: boolean;
  $flexDirection: 'vertical' | 'horizontal';
}>`
  hidden 
  ${p => (p.$hoverable ? 'group-hover:flex' : '')}
  items-center justify-center
  absolute top-0 left-0 w-full h-full
  group-hover:bg-blue-cyan group-hover:bg-opacity-50
  ${p =>
    p.$flexDirection === 'vertical'
      ? 'flex-col space-y-4 md:space-y-8'
      : 'flex-row space-x-4 md:space-x-8'}
`;
