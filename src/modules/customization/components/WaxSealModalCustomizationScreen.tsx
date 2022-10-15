import React, {useState} from 'react';
import ReactModal from 'react-modal';
import {TextSettings} from './shared/sections/TextSettings';
import {WaxSealModalCustomizationScreenProps} from '../containers/WaxSealModalCustomizationContainer';
import {WaxSealsDesigner} from './shared/sections/WaxSealsDesigner';
import {DecreeSvgEditor} from '../../core/DecreeSvgEditor';
import {useWatch} from 'react-hook-form';
import {DecreeText} from '../../core/DecreeText';
import {formatPrice} from '../../../utils/format-price';
import {DecreeButton} from '../../core/DecreeButton';
import clsx from 'clsx';
import {images} from '../../../assets/images';

export const WaxSealModalCustomizationScreen = (
  props: WaxSealModalCustomizationScreenProps
) => {
  return (
    <>
      {props.isLaptopWidth ? (
        <ReactModal
          // Using z-20 in tailwind will still overlap with some UI elements
          style={{overlay: {zIndex: 20}}}
          isOpen={props.showModal}
          onRequestClose={props.userClickedCancel}
          className="h-full flex justify-center items-center"
        >
          <WaxSealCustomizer {...props} />
        </ReactModal>
      ) : (
        <WaxSealCustomizer {...props} />
      )}
    </>
  );
};

const WaxSealCustomizer = (props: WaxSealModalCustomizationScreenProps) => {
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const watchedFontColor = useWatch({
    name: 'fontColor',
    control: props.textSettingsForm.control,
  });
  const watchedFontSize = useWatch({
    name: 'fontSize',
    control: props.textSettingsForm.control,
  });
  const watchedFontFamily = useWatch({
    name: 'font',
    control: props.textSettingsForm.control,
  });
  const watchedMonogramText1 = useWatch({
    name: 'text1',
    control: props.monogramForm.control,
  });
  const watchedMonogramText2 = useWatch({
    name: 'text2',
    control: props.monogramForm.control,
  });
  const watchedMonogramText3 = useWatch({
    name: 'text3',
    control: props.monogramForm.control,
  });

  const svgEditorAttributes = {
    fontSize: watchedFontSize,
    fontFamily: watchedFontFamily,
    paperColor: watchedFontColor, // Used font color so I can just use text settings without editing it
    waxSealMonogram:
      watchedMonogramText1 + watchedMonogramText2 + watchedMonogramText3,
  };

  const userClickedPersonalize = () => {
    setIsPersonalizing(true);
    setIsSaved(false);
  };

  const userClickedSave = () => {
    setIsSaved(true);
    setIsPersonalizing(false);
  };

  const addToCart = async () => {
    await props.userClickedAddToCart();
    setIsSaved(false);
    setIsPersonalizing(false);
  };

  return (
    <div className="w-full max-w-screen-tablet laptop:max-h-screen m-auto overflow-auto">
      <div className="space-y-6 laptop:px-10 laptop:py-6 laptop:bg-offwhite laptop:border">
        <div className="laptop:space-y-6">
          <div className={clsx(['relative', {hidden: !props.isLaptopWidth}])}>
            <DecreeButton
              mode="secondary"
              className="bg-transparent"
              onClick={props.userClickedCancel}
            >
              Cancel
            </DecreeButton>
            <div className="absolute top-0 right-0">
              <DecreeButton
                className={clsx([{hidden: !isPersonalizing}])}
                onClick={userClickedSave}
              >
                Save
              </DecreeButton>
              <DecreeButton
                className={clsx([
                  'bg-gold',
                  {hidden: isPersonalizing},
                  {'cursor-not-allowed': props.loading},
                ])}
                disabled={props.loading}
                onClick={userClickedPersonalize}
              >
                Customize
              </DecreeButton>
            </div>
          </div>
          <div
            className="bg-white"
            style={{aspectRatio: props.isLaptopWidth ? '' : '1'}}
          >
            <img
              className={clsx([
                'h-full w-full object-cover',
                {hidden: isPersonalizing || isSaved},
              ])}
              src={
                props.isLaptopWidth
                  ? images.home_screen_background_second
                  : images.mobile_wax_seal_background
              }
            />
            <div
              className={clsx([
                'flex items-center justify-center py-24',
                {hidden: !isPersonalizing && !isSaved},
                {'bg-offwhite': !props.isLaptopWidth},
              ])}
            >
              <DecreeSvgEditor
                svgUrl={props.svgUrl}
                elements={[]}
                attributes={svgEditorAttributes}
                isWaxSeal={true}
                onSetSvgBlob={props.onSetSvgBlob}
              />
            </div>
          </div>
        </div>
        <div
          className={clsx([
            'text-center laptop:text-left',
            {hidden: isPersonalizing || props.isLaptopWidth},
          ])}
        >
          <DecreeText size={23} className="font-serif font-bold text-blue-dark">
            {props.title || 'Wax Seal'}
          </DecreeText>
          <DecreeText
            size={14}
            className="font-serif text-gold font-bold tracking-[0.075em] uppercase"
          >
            {props.subtitle || 'Personal Wax Seal'}
          </DecreeText>
        </div>
        <div
          className={clsx([
            'w-full flex laptop:flex-row-reverse',
            {hidden: isPersonalizing || !isSaved},
          ])}
        >
          {/* Additional flex flex-row since space-x-5 wasnt working with flex-row-reverse */}
          <div className="flex flex-row space-x-5">
            <DecreeText
              size={18}
              className="font-serif font-bold text-blue-dark"
            >
              Total: {formatPrice(props.totalPrice)}
            </DecreeText>
            <DecreeButton
              className={clsx([
                {'cursor-not-allowed': props.loading},
                {hidden: !props.isLaptopWidth},
              ])}
              disabled={props.loading}
              onClick={addToCart}
            >
              {props.isEditMode ? 'Update Item' : 'Add to Cart'}
            </DecreeButton>
          </div>
        </div>
        <div className={clsx(['space-y-6', {hidden: !isPersonalizing}])}>
          <DecreeText size={18} className="font-serif font-bold text-blue-dark">
            Total: {formatPrice(props.totalPrice)}
          </DecreeText>
          <div className="max-w-[90%] space-y-6">
            <DecreeText size={16} className="text-blue-dark">
              Finish Size: around 1.25 inch
            </DecreeText>
            <TextSettings
              form={props.textSettingsForm}
              options={props.textSettingsOptions}
              isWaxSeal={true}
              hiddenFields={['fontWeight']}
              disabled={props.loading}
            />
          </div>
          <WaxSealsDesigner
            form={props.monogramForm}
            userClickedPreviewMonogram={() => {}}
            hideButtons={true}
            containerClassName={clsx(['space-y-4'], {
              'bg-white': !props.isLaptopWidth,
            })}
            innerFormClassName="space-y-4"
            fieldDisabled={props.loading}
          />
          <div className={clsx({hidden: props.isLaptopWidth})}>
            <div className="w-full h-[1px] bg-gray" />
          </div>
        </div>
        <div
          className={clsx([
            'relative',
            {hidden: props.isLaptopWidth || !isSaved},
          ])}
        >
          <DecreeButton
            className={clsx([{'cursor-not-allowed': props.loading}])}
            disabled={props.loading}
            onClick={addToCart}
          >
            {props.isEditMode ? 'Update Item' : 'Add to Cart'}
          </DecreeButton>
          <DecreeButton
            className={clsx([
              'bg-gold absolute right-0',
              {'cursor-not-allowed': props.loading},
            ])}
            disabled={props.loading}
            onClick={userClickedPersonalize}
          >
            Customize
          </DecreeButton>
        </div>
        <div className={clsx(['relative', {hidden: props.isLaptopWidth}])}>
          <DecreeButton
            className={clsx([
              'bg-transparent',
              {hidden: !isPersonalizing && !isSaved},
            ])}
            mode="secondary"
            onClick={props.userClickedCancel}
          >
            Cancel
          </DecreeButton>

          <DecreeButton
            className={clsx([
              'absolute right-0',
              {hidden: !isPersonalizing || isSaved},
            ])}
            onClick={userClickedSave}
          >
            Save
          </DecreeButton>
          <div
            className={clsx([
              {'flex justify-center': !isPersonalizing && !isSaved},
              {hidden: isPersonalizing || isSaved},
            ])}
          >
            <DecreeButton
              className={clsx([
                'bg-gold',
                {'cursor-not-allowed': props.loading},
              ])}
              disabled={props.loading}
              onClick={userClickedPersonalize}
            >
              Customize
            </DecreeButton>
          </div>
        </div>
      </div>
    </div>
  );
};
