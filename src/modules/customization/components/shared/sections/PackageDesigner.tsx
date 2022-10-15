/* eslint-disable node/no-unsupported-features/node-builtins */
import clsx from 'clsx';
import React from 'react';
import {images} from '../../../../../assets/images';
import {DecreeText} from '../../../../core/DecreeText';
import {PackageProduct} from '../../../models/PackageProduct';

type Props = {
  /** The next product to edit (starts at 0)  */
  currentProductIndex?: number;
  /** The products of the current package  */
  items: PackageProduct[];
  /** The indices of the products where "Edit" is shown */
  shownProductEditButtonIndices?: Set<number>;
  /** A handler for when the user clicks on a product */
  onProductClick?: (productIndex: number) => void;
};

/**
 * The grid of products in a package
 * @param {Props} props
 * @returns JSX.Element
 */
export const PackageDesigner = (props: Props) => {
  return (
    <div className="w-full px-8 py-5 space-y-6 bg-offwhite">
      <DecreeText size={23} className="font-serif font-bold text-blue-dark">
        Design your package
      </DecreeText>
      <div className="grid grid-cols-3 gap-y-10">
        {props.items.map((item, i) => {
          const isLast = props.items.length === i + 1;
          const isFactorOf3 = (i + 1) % 3 === 0;
          const isTouched =
            i < (props.shownProductEditButtonIndices?.size || 0) - 1;
          const isSolidLine =
            i < (props.shownProductEditButtonIndices?.size || 0) - 2;
          const product = item.node;
          const allowEdit = props.shownProductEditButtonIndices?.has(i);

          return (
            <div key={product.id} className="space-y-5">
              <div className="relative flex items-center justify-center">
                <div
                  className={clsx(
                    'flex items-center justify-center w-8 h-8  border rounded z-10',
                    {
                      'bg-offwhite border-gray-suva': !isTouched,
                      'bg-blue-dark border-blue-dark': isTouched,
                    }
                  )}
                  style={{aspectRatio: '1/1'}}
                >
                  <DecreeText
                    size={16}
                    className={clsx({
                      'text-gray-suva': !isTouched,
                      'text-white font-bold': isTouched,
                    })}
                  >
                    {i + 1}
                  </DecreeText>
                </div>
                {/* Dashed line */}
                {!isLast && !isFactorOf3 && (
                  <div
                    className={clsx(
                      'absolute w-full border-t  left-1/2  top-4',
                      {
                        'border-gray-suva border-dashed': !isSolidLine,
                        'border-blue-dark': isSolidLine,
                      }
                    )}
                  />
                )}
              </div>
              <div className="flex items-center justify-center px-8">
                {/* Description is where we currently the store svg url */}
                <button
                  className={clsx(
                    'focus:outline-none disabled:cursor-default',
                    {
                      'border-4 border-blue-dark':
                        i === props.currentProductIndex,
                    }
                  )}
                  disabled={!props.onProductClick || !allowEdit}
                  onClick={() => props.onProductClick?.(i)}
                >
                  <img
                    src={
                      (item.modifiedSvg
                        ? URL.createObjectURL(item.modifiedSvg)
                        : item.node.description) || images.decree_no_image
                    }
                  />
                </button>
              </div>
              <div className="flex items-center justify-center">
                <DecreeText
                  size={16}
                  className={clsx({
                    'text-gray-suva': !isTouched,
                    'text-blue-dark': isTouched,
                  })}
                >
                  {product.title}
                </DecreeText>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
