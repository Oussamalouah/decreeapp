import React from 'react';
import {CloseIcon} from '../../../assets/svg';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import {DecreeSpinner} from '../../core/DecreeSpinner';
import {DecreeText} from '../../core/DecreeText';
import {CartProps} from '../container/CartContainer';
import {CartForm} from './shared/CartForm';

export const CartScreen = (props: CartProps) => {
  return (
    <DecreePageWrapper headerType="block" color="blue">
      <div className="w-full px-5 pt-4 pb-8 mx-auto text-center hd:px-24 laptop:py-12 max-w-screen-figma">
        <div className="relative">
          <DecreeText size={30} className="font-serif font-bold text-blue-dark">
            Your Cart
          </DecreeText>
          {/* only shown on mobile */}
          <button
            className="absolute right-0 transform -translate-y-1/2 top-1/2 laptop:hidden"
            onClick={props.userClosedCart}
          >
            <CloseIcon className="w-8 h-8" />
          </button>
        </div>
        <div className="h-5" />
        <div className="w-full h-[1px] bg-gray" />
        {props.loading ? (
          <div className="mt-10">
            <DecreeSpinner type="primary" />
          </div>
        ) : (
          <CartForm
            checkout={props.checkout}
            addressGroups={props.addressGroups}
            shipmentData={props.shipmentData}
            userClosedCart={props.userClosedCart}
            userClickedRemove={props.userClickedRemove}
            userClickedCheckout={props.userClickedCheckout}
            userSelectedQuantity={props.userSelectedQuantity}
            userClickedEdit={props.userClickedEdit}
            isAuthenticated={props.isAuthenticated}
            userContacts={props.userContacts}
            userConfiguredShipment={props.userConfiguredShipment}
          />
        )}
      </div>
    </DecreePageWrapper>
  );
};
