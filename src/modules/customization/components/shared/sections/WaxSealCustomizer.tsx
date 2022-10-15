import React, {useState} from 'react';
import {DecreeText} from '../../../../core/DecreeText';
import {DecreeButton} from '../../../../core/DecreeButton';
import {WaxLogo} from '../../../../../assets/svg';
import {WaxSealModalCustomizationContainer} from '../../../containers/WaxSealModalCustomizationContainer';
import {WaxSealModalCustomizationScreen} from '../../WaxSealModalCustomizationScreen';
import clsx from 'clsx';
import {laptopWidth} from '../../../../../utils/constants/screen-width.constants';
import {HandleWindowResize} from '../../../../core/HandleWindowResize';

type Props = {
  waxSealId: string;
  isWaxSealVisible: boolean;
  userClickedCustomize: () => void;
  userClickedCancel: () => void;
  userClickedAddToCart: (id: string) => void;
};

const WaxSeal = WaxSealModalCustomizationContainer(
  WaxSealModalCustomizationScreen
);

export const WaxSealCustomizer = (props: Props) => {
  const [isLaptopWidth, setIsLaptopWidth] = useState(
    window.innerWidth >= laptopWidth
  );

  return (
    <>
      <HandleWindowResize
        onResize={() => setIsLaptopWidth(window.innerWidth >= laptopWidth)}
      />
      <div
        className={clsx([
          'space-y-6',
          {hidden: props.isWaxSealVisible && !isLaptopWidth},
          {'flex flex-col items-center': !isLaptopWidth},
        ])}
      >
        <DecreeText size={23} className="text-blue-dark font-bold font-serif">
          Accessories you may need:
        </DecreeText>
        <div className="flex">
          <div className="flex-shrink bg-offwhite py-6 px-7">
            <WaxLogo />
          </div>
        </div>
        <DecreeButton onClick={props.userClickedCustomize}>
          {props.waxSealId ? 'Edit Wax Seal' : 'Add Wax Seal'}
        </DecreeButton>
      </div>
      <div className={clsx({hidden: !props.isWaxSealVisible})}>
        <WaxSeal
          isLaptop={isLaptopWidth}
          showModal={props.isWaxSealVisible}
          waxSealId={props.waxSealId}
          userClickedCancel={props.userClickedCancel}
          userClickedAddToCart={props.userClickedAddToCart}
        />
      </div>
    </>
  );
};
