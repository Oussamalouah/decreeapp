import React from 'react';
import {DecreeCtaButton} from '../../../core/DecreeCtaButton';
import {DecreePlayer} from '../../../core/DecreePlayer';
import {DecreeText} from '../../../core/DecreeText';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../../route-list';

export const OurBelief: React.FC = () => {
  const history = useHistory();

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-screen-fhd grid laptop:mb-12">
        <div className="flex flex-col bg-offwhite py-9 laptop:py-36 laptop:px-20 space-y-6">
          <div className="w-full">
            <div className="text-2xl laptop:text-3xl font-serif font-bold tracking-[0.075em] text-center text-blue-dark my-4">
              Our Belief
            </div>
            <div className="text-base laptop:text-size-21 p-4 font-sans tracking-[0.075em] text-center text-blue-dark">
              Birds have always been an animal of connection – historic carrier
              pigeons, the scribe-devoted ibis of mythology, even storks
              delivering their bundles of joy. Decree is adding a new addition
              to these ranks in the striking Secretary bird, uniquely known for
              standing tall and walking firm. At Decree, we’re committed to
              bringing people together through our meaningful communication
              offerings. The two secretary birds in our logo form a coupled
              front – a symbol of connection through our personalized and
              elegant stationery. The most important moments in life should
              always be addressed with meaningful gestures, for that is the mark
              of a genuine individual. At Decree, our mission is to aid you in
              meeting the mark with our expertly crafted stationery that ships
              within 96 hours, so you never miss the moment.
            </div>
          </div>
          {/* <div className="h-[223px] tablet:h-[474px] block laptop:hidden">
            <DecreePlayer src="https://www.youtube.com/watch?v=bkMjpEixNrg" />
          </div> */}
          <div className="col-span-3 mt-14 laptop:col-span-2">
            <div className="w-full flex justify-center mb-14">
              <DecreeCtaButton onClick={() => history.push(routes.ABOUT_US)}>
                <DecreeText
                  size={14}
                  className="font-serif font-bold laptop:font-normal tracking-[0.145em] uppercase"
                >
                  Learn more
                </DecreeText>
              </DecreeCtaButton>
            </div>
          </div>
        </div>
        {/* <div className="relative hidden laptop:block">
          <div className="w-[125%] fhd:w-[115%] h-[90%] absolute m-auto right-0 top-0 bottom-0">
            <DecreePlayer src="https://www.youtube.com/watch?v=bkMjpEixNrg" />
          </div>
        </div> */}
      </div>
    </div>
  );
};
