import React from 'react';
import {CloseIcon} from '../../../../assets/svg';

/**
 * @typedef AuthFormWrapperProps
 */
type AuthFormWrapperProps = {
  title: string;
  onClose?: () => void;
};

/**
 * A wrapper component that applies the default auth form layout and styling
 *
 * @component
 * @example
 * <AuthFormWrapper title="Login">
 *  <FormItems>
 *    <FormItem label="Email" placeholder="Your Email Address" />
 *  </FormItems>
 *  <div className="h-14" />
 *  <AuthButton>RESET PASSWORD</AuthButton>
 * </AuthFormWrapper>
 *
 * @param {AuthFormWrapperProps} props
 * @returns JSX.Element
 */
export const AuthFormWrapper: React.FC<AuthFormWrapperProps> = props => {
  return (
    <div className="relative flex flex-col items-center pt-16 pb-32 bg-offwhite px-9 laptop:px-0">
      <button
        className="absolute top-5 right-7 focus:outline-none laptop:hidden"
        onClick={props.onClose}
      >
        <CloseIcon />
      </button>
      <div className="mt-5 font-serif font-bold uppercase text-3xl text-blue-dark laptop:mt-0">
        {props.title}
      </div>
      <div className="h-[1px] w-full laptop:w-1/2 bg-blue-dark mt-[23px] mb-16" />
      <div className="flex flex-col items-center w-full laptop:w-1/4">
        {props.children}
      </div>
    </div>
  );
};
