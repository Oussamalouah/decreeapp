import React from 'react';
import {images} from '../../../../assets/images';

import {DecreeText} from '../../../core/DecreeText';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../../route-list';

export const MidHomeGallery: React.FC = () => {
  const history = useHistory();

  return (
    <div className="flex items-center justify-center bg-offwhite">
      <div className="tablet:grid tablet:grid-cols-2 max-w-screen-fhd w-full h-full">
        <div
          onClick={() => history.push(routes.STORE__VIEW('in-season-holiday'))}
        >
          {/* <DecreeText
            className="font-serif font-bold text-center tracking-[0.075em] text-blue-dark my-8 tablet:hidden"
            size={24}
          >
            Choose your invitation
          </DecreeText> */}
          <img
            className="w-full h-[169px] tablet:max-h-[600px] tablet:h-full fhd:max-h-[780px] object-cover"
            src={images.left_side_image_home_screen}
            alt="Wedding"
          />
        </div>
        <div className=" h-full w-full tablet:max-h-[600px] px-6 py-6  tablet:p-0  fhd:max-h-[780px]  overflow-y-auto no-scrollbar">
          <div className="cursor-pointer space-y-3 tablet:space-y-0">
            {/* <DecreeText
              size={30}
              className="font-serif font-bold tracking-[0.075em] text-center text-blue-dark my-4 hidden tablet:block"
            >
              Choose your invitation
            </DecreeText> */}
            <img
              className="w-full object-cover "
              src={images.home_gallery_1}
              alt="Decree Holiday Gallery"
              onClick={() =>
                history.push(routes.STORE__VIEW('in-season-holiday'))
              }
            />
            {/* <div className="text-size-18 laptop:text-size-23 font-serif font-bold mt-4 text-blue-dark mb-[27px] laptop:mb-[91px]">
              Wedding Stationery
            </div> */}
            <img
              className="w-full object-cover "
              src={images.home_gallery_2}
              alt="Decree Holiday Gallery"
              onClick={() =>
                history.push(routes.STORE__VIEW('in-season-holiday'))
              }
            />
            {/* <div className="text-size-18 laptop:text-size-23 font-serif font-bold mt-4 text-blue-dark mb-[27px] laptop:mb-[91px]">
              Personal Stationery
            </div> */}
            <img
              className="w-full object-cover "
              src={images.home_gallery_3}
              alt="Decree Holiday Gallery"
              onClick={() =>
                history.push(routes.STORE__VIEW('in-season-holiday'))
              }
            />
            {/* <div className="text-size-18 laptop:text-size-23 font-serif font-bold mt-4 text-blue-dark mb-[27px] laptop:mb-[91px]">
              Limited Stationery
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
