import React from 'react';
import {DecreeText} from '../../../../core/DecreeText';
import {DecreeFormItem} from '../../../../core/DecreeFormItem';
import {DecreeButton} from '../../../../core/DecreeButton';
import {MonogramFormState} from '../../../models/MonogramFormState';
import {UseFormReturn} from 'react-hook-form';
import clsx from 'clsx';

type Props = {
  form: UseFormReturn<MonogramFormState>;
  userClickedPreviewMonogram: (data: MonogramFormState) => void;
  userClickedClearWaxSeal?: () => void;
  fieldDisabled?: boolean;
  savingDisabled?: boolean;
  hideButtons?: boolean;
  containerClassName?: string;
  titleClassName?: string;
  innerFormClassName?: string;
};

/**
 * The grid of products in a package.
 * @param {Props} props
 * @returns JSX.Element
 */
export const WaxSealsDesigner = (props: Props) => {
  return (
    <div className={clsx(['w-full bg-offwhite', props.containerClassName])}>
      <div className={props.titleClassName}>
        <DecreeText size={23} className="font-serif font-bold text-blue-dark">
          Design your monogram:
        </DecreeText>
        <DecreeText size={23} className="font-serif text-blue-dark">
          (3 Characters as maximum)
        </DecreeText>
      </div>
      <form
        onSubmit={props.form.handleSubmit(props.userClickedPreviewMonogram)}
      >
        <div className="grid grid-cols-12">
          <div
            className={clsx([
              'col-span-full tablet:col-span-5',
              props.innerFormClassName,
            ])}
          >
            <div className="grid grid-cols-3 gap-8">
              <DecreeFormItem
                className={clsx([
                  'text-center text-gray-medium',
                  {'cursor-not-allowed': props.fieldDisabled},
                ])}
                {...props.form.register('text1')}
                disabled={props.fieldDisabled}
                maxLength={1}
              />

              <DecreeFormItem
                className={clsx([
                  'text-center text-gray-medium',
                  {'cursor-not-allowed': props.fieldDisabled},
                ])}
                {...props.form.register('text2')}
                disabled={props.fieldDisabled}
                maxLength={1}
              />

              <DecreeFormItem
                className={clsx([
                  'text-center text-gray-medium',
                  {'cursor-not-allowed': props.fieldDisabled},
                ])}
                {...props.form.register('text3')}
                disabled={props.fieldDisabled}
                maxLength={1}
              />
            </div>
            <div
              className={clsx([
                'flex justify-between items-center',
                {hidden: props.hideButtons},
              ])}
            >
              <DecreeButton
                mode="secondary"
                className="bg-transparent"
                onClick={props.userClickedClearWaxSeal}
                type="button"
              >
                Clear
              </DecreeButton>
              <DecreeButton
                className="px-6"
                type="submit"
                disabled={props.savingDisabled}
              >
                Save
              </DecreeButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
