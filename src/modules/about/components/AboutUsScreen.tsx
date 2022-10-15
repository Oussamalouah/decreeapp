import React, {Fragment} from 'react';
import {PageTitles} from '../../../utils/constants/page-title.constants';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import {DecreeLanding} from '../../core/DecreeLanding';
import {DecreeText} from '../../core/DecreeText';
import {images} from '../../../assets/images';
import clsx from 'clsx';
import {isMobile} from 'react-device-detect';

const aboutUsSections = [
  {
    title: 'OUR STORY',
    image: images.decree_hand_with_ring,
    textContent: '',
    imgOrder: 1,
    isColorGold: false,
  },
  {
    title: 'OUR ARTISTRY',
    image: images.decree_hand_with_ring,
    textContent: '',
    imgOrder: 1,
    isColorGold: false,
  },
  {
    title: 'OUR FOUNDER',
    image: images.decree_hand_with_ring,
    textContent: '',
    imgOrder: 2,
    isColorGold: true,
  },
  {
    title: 'OUR VALUE',
    image: images.decree_hand_with_ring,
    textContent: '',
    imgOrder: 2,
    isColorGold: true,
  },
];

export const AboutUsScreen = () => {
  return (
    <DecreePageWrapper color="white">
      <DecreeLanding type={PageTitles.ABOUT_US} />
      <div className="w-full tablet:w-[90%] mx-auto py-11 laptop:py-20 fhd:max-w-screen-figma">
        <div className="space-y-8 text-center p-2 laptop:p-0">
          <DecreeText
            size={30}
            className="font-serif font-bold text-blue-dark tracking-[0.075em]"
          >
            Waiting weeks and weeks to receive custom stationery? To our
            founders, unacceptable. Decree was created to provide high-end
            stationery with a short turn-around time, and Robert and Ryan
            believe it’s paramount that your stationery is shipped within 96
            hours from the time of ordering. It’s the Decree guarantee.
          </DecreeText>
          <DecreeText
            size={30}
            className="font-serif font-bold text-blue-dark tracking-[0.075em]"
          >
            Decree’s mission is to help our customers communicate in a genuine
            and sophisticated form, and to make deep impact. In today’s cascade
            of text messages and emails, it’s often difficult to convey true
            meaning. At Decree, we know people can quickly forget an email they
            received yesterday … but they always remember a thoughtful
            handwritten note or stunning invitation.
          </DecreeText>
          <DecreeText
            size={30}
            className="font-serif font-bold text-blue-dark tracking-[0.075em]"
          >
            Decree was founded in Raleigh, North Carolina by a team that has a
            passion for gorgeous stationery and meaningful communication. All of
            our manufacturing – from plates to prints – is done under one roof.
            We don’t outsource any element of our creative process because
            precision and quality mean everything, including timely delivery to
            you.
          </DecreeText>
          <DecreeText
            size={30}
            className="font-serif font-bold text-blue-dark tracking-[0.075em]"
          >
            If you ever find yourself in beautiful Raleigh, please drop by for a
            visit!
          </DecreeText>
        </div>
        {/* uncomment below when changing about us template to original design */}
        {/* {aboutUsSections.map(section => {
          return (
            <Fragment key={section.title}>
              <DecreeText
                size={isMobile ? 30 : 48}
                className={clsx(
                  'font-serif font-bold tracking-[0.075em] text-center ',
                  {
                    'text-gold': section.isColorGold,
                    'text-blue-dark': !section.isColorGold,
                  }
                )}
              >
                {section.title}
              </DecreeText>
              <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 mt-16 mb-32">
                <div
                  className={clsx('flex justify-center items-center', {
                    'order-last': section.imgOrder === 2,
                  })}
                >
                  <img
                    src={section.image}
                    className="laptop:h-[500px] laptop:w-[500px]"
                  />
                </div>
                <div className="flex justify-center items-center px-4">
                  <DecreeText size={isMobile ? 16 : 21}>
                    {section.textContent ||
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                  </DecreeText>
                </div>
              </div>
            </Fragment>
          );
        })} */}
      </div>
    </DecreePageWrapper>
  );
};
