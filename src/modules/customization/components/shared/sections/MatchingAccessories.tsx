import React from 'react';
import {images} from '../../../../../assets/images';
import {BluePlusIcon} from '../../../../../assets/svg';
import {DecreeRoundButton} from '../../../../core/DecreeRoundButton';
import {DecreeText} from '../../../../core/DecreeText';
import {isDesktop} from 'react-device-detect';
import clsx from 'clsx';

export const MatchingAccessories = () => {
  return (
    <div className="w-full px-8 py-5 space-y-6 bg-offwhite">
      <DecreeText size={23} className="font-serif font-bold text-blue-dark">
        Matching Accessories
      </DecreeText>
      <div className="grid grid-cols-2 gap-8 laptop:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center space-y-3"
          >
            <div className="relative flex items-center justify-center group">
              <img src={images.stationery_placeholder} />
              {/* hover overlay */}
              <div
                className={clsx('absolute top-0 left-0 w-full h-full', {
                  'group-hover:bg-opacity-50 group-hover:bg-blue-dark':
                    isDesktop,
                })}
              />
              {/* top right button */}
              <button
                className="absolute top-0 right-0 transform -translate-y-1/4 translate-x-1/4"
                type="button"
              >
                <BluePlusIcon className="h-[45px] w-[45px]" />
              </button>
              <DecreeRoundButton
                className={clsx('absolute z-10 w-10/12 hidden', {
                  'group-hover:block': isDesktop,
                })}
                type="button"
              >
                Preview
              </DecreeRoundButton>
            </div>
            <DecreeText size={16} className="text-blue-dark">
              Save the date
            </DecreeText>
          </div>
        ))}
      </div>
    </div>
  );
};
