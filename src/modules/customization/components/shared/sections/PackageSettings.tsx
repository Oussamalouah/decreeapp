import clsx from 'clsx';
import React from 'react';
import {formatPrice} from '../../../../../utils/format-price';
import {DecreeText} from '../../../../core/DecreeText';
import {PackageProduct} from '../../../models/PackageProduct';

type Props = {
  /** The next product to edit (starts at 0)  */
  currentProductIndex?: number;
  /** The products of the current package  */
  items: PackageProduct[];
  /** The indices of the products where "Edit" is shown */
  shownProductEditButtonIndices?: Set<number>;
  /** A handler for when the user clicks "Edit" on a product */
  onProductEditClick: (productIndex: number) => void;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * The list of products in a package.
 * @param {Props} props
 * @returns
 */
export const PackageSettings = (props: Props) => {
  return (
    <div className={props.className}>
      {props.items.map((item, i) => {
        const isLast = props.items.length === i + 1;
        const isTouched =
          i < (props.shownProductEditButtonIndices?.size || 0) - 1;
        const isSolidLine =
          i < (props.shownProductEditButtonIndices?.size || 0) - 2;
        const isEditButtonShown = props.shownProductEditButtonIndices?.has(i);
        const product = item.node;
        const price =
          parseInt(item.quantityPreset?.value || '1') *
          product.variants.edges[item.productVariantIndex || 0]?.node.priceV2
            .amount;

        return (
          <div key={product.id} className="relative grid grid-cols-5">
            <div className="col-span-1 ">
              <div
                className={clsx(
                  'flex items-center justify-center w-8 h-8  border rounded',
                  {
                    'bg-white border-gray-suva': !isTouched,
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
              {/* Dashed vertical line */}
              {!isLast && (
                <div
                  className={clsx('absolute h-full border-l left-4', {
                    'border-gray-suva border-dashed': !isSolidLine,
                    'border-blue-dark': isSolidLine,
                  })}
                />
              )}
            </div>
            <div className={clsx('col-span-3', {'pb-8': !isLast})}>
              <DecreeText
                size={23}
                className="font-serif font-bold text-blue-dark"
              >
                {product.title}
              </DecreeText>
              {!!item.quantityPreset && (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-3">
                    <DecreeText size={16} className="text-blue-dark">
                      Quantity:
                    </DecreeText>
                    <DecreeText size={16} className="col-span-2">
                      {item.quantityPreset.name}
                    </DecreeText>
                  </div>
                  <div className="grid grid-cols-3">
                    <DecreeText size={16} className="text-blue-dark">
                      Total:
                    </DecreeText>
                    <DecreeText size={16} className="col-span-2">
                      {formatPrice(price)}
                    </DecreeText>
                  </div>
                </div>
              )}
            </div>
            {isEditButtonShown && (
              <div className="col-span-1">
                <button
                  className="my-1.5 focus:outline-none"
                  onClick={() => props.onProductEditClick(i)}
                >
                  <DecreeText size={16} className="underline">
                    Edit
                  </DecreeText>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
