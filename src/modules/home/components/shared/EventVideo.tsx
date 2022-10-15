import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';
import {useHistory} from 'react-router-dom';

import {DecreePlayer} from '../../../core/DecreePlayer';
import {DecreeCtaButton} from '../../../core/DecreeCtaButton';
import {routes} from '../../../../route-list';
import {weddingProductTypes} from '../../../../utils/constants/store.contants';

export const EventVideo: React.FC = () => {
  const history = useHistory();
  return (
    <div className="w-full tablet:w-[90%] mx-auto py-11 laptop:py-20 fhd:max-w-screen-figma">
      <div className="text-2xl laptop:text-3xl font-serif font-bold tracking-[0.075em] text-center text-blue-dark">
        The Passion of Our Craft
      </div>
      {/* <Center>
        <div className="max-w-[273px] laptop:max-w-none">
          <div className="text-base laptop:text-size-21 font-sans tracking-[0.075em] text-center text-blue-dark my-4">
            Ducimus qui blanditiis praesentium voluptatum deleniti atque
            corrupti quos dolores.
          </div>
        </div>
      </Center> */}
      <Center>
        <div className="w-[100%] h-[223px] tablet:w-[80%] laptop:w-[979px] tablet:h-[474px]">
          <DecreePlayer src="https://www.youtube.com/watch?v=_pVrMcmKa7w" />
        </div>
      </Center>
      <Center className="mt-8">
        {/* redirects to packages */}
        <DecreeCtaButton
          onClick={() =>
            history.push(routes.STORE__VIEW(weddingProductTypes.PACKAGE))
          }
        >
          <div className="flex justify-center items-center">
            <div className="max-w-[70%] laptop:max-w-full">
              <div className="text-base laptop:text-sm font-serif font-bold laptop:font-normal tracking-[0.145em] uppercase">
                Shop the collection
              </div>
            </div>
          </div>
        </DecreeCtaButton>
      </Center>
    </div>
  );
};

const Center = tw.div`
w-full flex justify-center
`;
