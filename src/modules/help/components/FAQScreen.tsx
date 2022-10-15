import React from 'react';
import {PageTitles} from '../../../utils/constants/page-title.constants';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import {DecreeLanding} from '../../core/DecreeLanding';
import {DecreeText} from '../../core/DecreeText';
import {isMobile} from 'react-device-detect';

const faqs = [
  {
    question: 'Where is the stationery made?',
    details:
      'a.   All of our stationery is made in Raleigh, NC. We make everything under one roof to ensure the finest of quality. From our designs, to plates, to printing, to shipping, we do it all here.',
  },
  {
    question: 'What is your return policy?',
    details:
      'a.   Due to the custom nature of our stationery, all sales are final. If there is a problem with the quality, please reach out to us immediately and we will remedy the situation. We want to ensure each order meets our customer’s expectations. If that is not the case, we will reprint and ship to you at no extra charge.',
  },
  {
    question: 'Why does each print look slightly different?',
    details:
      'a.   Due to the fact that each piece of stationery is hand fed into machines that are often more than 100 years old, the ink compresses at different pressures each time. While the pressure changes are minute from print to print, they do cause every piece to be truly unique. This is the beauty and what makes each print so special – they are literally one of a kind. We promise at Decree that our prints will be perfectly sized and crafted, to ensure a phenomenal piece of stationery.',
  },
  {
    question: 'Do you only do engraving and letterpress printing?',
    details:
      'a.   Yes. We only do these two forms of printing. We want the highest and most luxurious methods for our customers and these methods are at the pinnacle of printing.',
  },
  {
    question: 'What if I want something fully-custom?',
    details:
      'a.   Please reach out to us via our email, chat or phone feature to discuss a truly bespoke solution. We have designers on staff that can cater to any demand or style. We are happy to help and we look forward to speaking with you. There is an extra fee that goes with this particular service but we are happy to discuss this with you in private.',
  },
  {
    question: 'What if I want a color of ink that is not offered?',
    details:
      'a.   We are happy to match any color needed and even create a truly original color, if desired. Please reach out to us via our email, chat or phone feature to discuss a custom ink solution. There is an extra fee that goes with this particular service but we are happy to discuss this with you in private.',
  },
  {
    question: 'Do all orders really ship out in 96 hours?',
    details:
      'a.   Yes! We pride ourselves at Decree at making artful, meaningful stationery that never misses a moment. Our mission is to ensure our customers have the finest stationery available in the right moment.',
  },
  {
    question: 'How do you all create stationery so fast?',
    details:
      'a.   All of our stationery is hand crafted in our shop in Raleigh, NC. Since everything is done under one roof, we do not have to wait on other vendors to dictate our production time.  From the plates to the printing, a well-trained person is involved in the entire production. We are very passionate about our craft and work tirelessly to ensure our customers receive their order in a timely manner. There are no shortcuts in crafting fine stationery, we just work hard to ensure each step is done within 96 hours.',
  },
  {
    question:
      'What if something is not working on the website or I am having trouble ordering?',
    details:
      'a.   Please contact us via email, phone or chat and we will remedy the situation immediately. We pride ourselves on taking care of every customer.',
  },
  {
    question: 'Is the paper recyclable?',
    details:
      'a.   Yes. All of the stationery we print on is recyclable. We have a strong commitment to the environment and want to ensure each card can be recycled.',
  },
  {
    question: 'What is your commitment to the environment?',
    details:
      'a.   All of our paper comes from a sustainable source that focuses on three key areas of sustainability. Not all paper is created equal and we have procured the most sustainable process for our paper. The three key areas are as follows: \n\n i.   Our paper requires much less water than the industry standard to produce. A greater savings in water leads to a more sustainable infrastructure in maintaining a healthy water supply. \n\n ii.   All of our paper is created from materials that are sustainably managed. For every tree that is felled, a new one is planted to replace. Plus, the raw materials only come from places where land rights are not abused, trees are not illegally harvested or from places that have special protections.\n\n iii.   The energy to produce the paper is 75% self-sustained and only requires minimal use of the national grid. The energy needed is created by solar and water turbines for a truly sustainable production line',
  },
];

export const FAQScreen = () => {
  return (
    <DecreePageWrapper color="white">
      <DecreeLanding type={PageTitles.FAQ} />
      <div className="w-full tablet:w-[90%] mx-auto py-11 laptop:py-20 fhd:max-w-screen-figma">
        <DecreeText
          size={isMobile ? 30 : 48}
          className="font-serif font-bold tracking-[0.075em] text-center text-blue-dark"
        >
          Help Topics
        </DecreeText>
        {faqs.map(faq => {
          return (
            <div key={faq.question} className="bg-gray-light p-4 my-8">
              <DecreeText size={30} className="text-gold font-serif">
                {faq.question}
              </DecreeText>
              <div className="leading-7 whitespace-pre-wrap tracking-[0.1em] font-sans text-sm tablet:text-size-21 mt-4">
                {faq.details}
              </div>
            </div>
          );
        })}
      </div>
    </DecreePageWrapper>
  );
};
