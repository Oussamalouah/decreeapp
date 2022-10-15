import React from 'react';
import {DecreeText} from '../../../core/DecreeText';

type ProfileSectionWrapper = {
  title: string;
  actions?: React.ReactNode;
};

/**
 * A wrapper for Profile Screen sections. This wrapper component renders a
 * repeatable enclosure that displays user profile data in separate blocks.
 * @param props
 * @constructor
 */
export const ProfileSectionWrapper: React.FC<ProfileSectionWrapper> = ({
  title,
  children,
  actions,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <DecreeText size={23} className="font-serif font-bold text-black-light">
          {title}
        </DecreeText>
        <div className="space-x-2">{actions}</div>
      </div>
      <div className="space-y-2 text-black-light">{children}</div>
      <div className="h-[1px] bg-gray mt-8" />
    </div>
  );
};
