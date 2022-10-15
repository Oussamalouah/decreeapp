import clsx from 'clsx';
import _ from 'lodash';
import React from 'react';
import {isMobile} from 'react-device-detect';
import tw from 'tailwind-styled-components/dist/tailwind';
import {
  getPackages_collections_edges,
  getPackages_collections_edges_node,
} from '../../../api/operations/queries/__generated__/getPackages';
import {
  getProducts_products_edges,
  getProducts_products_edges_node,
} from '../../../api/operations/queries/__generated__/getProducts';
import {ArrowDownIcon} from '../../../assets/svg';
import {formatPrice} from '../../../utils/format-price';
import {DecreeCardPreview} from '../../core/DecreeCardPreview';
import {DecreeCtaButton} from '../../core/DecreeCtaButton';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import {DecreeSpinner} from '../../core/DecreeSpinner';
import {StoreScreenProps} from '../containers/StoreScreenContainer';
import {DecreeLanding} from '../../core/DecreeLanding';
import {Menu} from './shared/Menu';
import {MobileProductMenuModal} from './shared/MobileProductMenuModal';
import {ProductPreviewModal} from './shared/ProductPreviewModal';
import {StationeryTypes} from '../../../utils/constants/stationery-type.constants';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../route-list';
import {DecreeText} from '../../core/DecreeText';
import {weddingProductTypes} from '../../../utils/constants/store.contants';
import {HandleWindowResize} from '../../core/HandleWindowResize';
import {laptopWidth} from '../../../utils/constants/screen-width.constants';
import {pageSubtitles} from '../../../utils/constants/page-subtitles.constants';

export const StoreScreen: React.FC<StoreScreenProps> = props => {
  const history = useHistory();

  return (
    <>
      <HandleWindowResize
        onResize={() => {
          if (window.innerWidth >= laptopWidth) {
            props.userClickedProductMenu(false);
          }
        }}
      />
      <DecreePageWrapper
        color={
          'white'
          // props.stationeryType !== StationeryTypes.WEDDING || isMobile
          //   ? 'white'
          //   : 'blue'
        }
      >
        {/* MODALS */}
        <ProductPreviewModal
          isOpen={!!props.selectedProduct}
          product={props.selectedProduct}
          onCancel={props.userClickedCancel}
          onPersonalize={() => {
            if (!props.selectedProduct) return;
            props.userClickedPersonalize(props.selectedProduct);
          }}
        />
        <MobileProductMenuModal
          isOpen={props.isProductMenuVisible}
          products={props.products}
          userClickedMenuItem={props.userClickedMenuItem}
          currentStationeryType={props.stationeryType}
          currentProductType={props.currentProductType}
          onClose={() => {
            props.userClickedProductMenu(false);
          }}
        />
        <DecreeLanding
          type={props.stationeryType}
          subtitle={props.stationeryType && pageSubtitles[props.stationeryType]}
        />
        {props.products.length > 1 && (
          <Menu
            currentProductType={props.currentProductType}
            currentStationeryType={props.stationeryType}
            userClickedMenuItem={props.userClickedMenuItem}
            products={props.products}
          />
        )}
        <div className="my-6 text-sm mx-7 text-blue-dark laptop:hidden">
          <span onClick={() => history.push(routes.HOME)}>Home</span> /{' '}
          {_.startCase(props.stationeryType)}
        </div>
        {props.loading && (
          <div className="my-16">
            <DecreeSpinner type="primary" size={40} />
          </div>
        )}
        {!props.loading && !!props.collection?.items.length && (
          <ProductList
            className={clsx({
              'laptop:grid-cols-2': props.currentProductType === 'packages',
              'laptop:grid-cols-3': props.currentProductType !== 'packages',
            })}
          >
            {props.collection.items.map(
              (
                item: getProducts_products_edges | getPackages_collections_edges
              ) => {
                const node = item.node;
                const product = item.node as getProducts_products_edges_node;
                const bundle = item.node as getPackages_collections_edges_node;
                const isPackage =
                  props.currentProductType === weddingProductTypes.PACKAGE;

                // start: image url
                // determine the featured image shown in the preview
                // featured images vary based on whether the product is a simple product
                // or a package (collection of products)
                let imageURL: string;

                if (!isPackage) {
                  // override product image if there's an existing featured image
                  if (product.images?.edges[0]?.node?.originalSrc) {
                    imageURL = product.images?.edges[0]?.node?.originalSrc;
                  } else {
                    // display SVG found in the description field (resource location)
                    imageURL = product.description;
                  }
                } else {
                  imageURL = bundle.image?.originalSrc;
                }
                // end: image url

                let packagePrice = 0;
                if (isPackage) {
                  bundle.products.edges.forEach(product => {
                    packagePrice += parseInt(
                      product.node.priceRange.minVariantPrice.amount
                    );
                  });
                }

                return (
                  <DecreeCardPreview
                    key={node.id}
                    imageURL={imageURL}
                    footerDirection="horizontal"
                    title={node.title}
                    subtitle={
                      isPackage
                        ? formatPrice(packagePrice)
                        : formatPrice(
                            product.priceRange?.minVariantPrice.amount || 0
                          )
                    }
                    thumbnailOrientation={isPackage ? 'landscape' : 'portrait'}
                    onEditClick={() => props.userClickedPersonalize(item)}
                    onPreviewClick={() => props.userClickedPreview(item)}
                  />
                );
              }
            )}
          </ProductList>
        )}
        {!props.loading && !props.collection.items?.length && (
          <div className="my-4 text-base text-center">No items available</div>
        )}
        {/* Sticky button group */}
        <MobileButtonGroup
          $hasNoItems={props.products.length <= 1 && props.tags.length <= 1}
        >
          <DecreeCtaButton
            className="w-full border-r-2 border-beige"
            onClick={() => props.userClickedProductMenu(true)}
          >
            <div className="relative">
              <DecreeText size={18} className="text-left font-serif font-bold">
                Products Filter
              </DecreeText>
              <ArrowDownIcon className="absolute object-contain m-auto top-0 bottom-0 right-0 h-1/3" />
            </div>
          </DecreeCtaButton>
        </MobileButtonGroup>
      </DecreePageWrapper>
    </>
  );
};

const ProductList = tw.div`
  max-w-screen-figma mx-auto
  grid gap-7 laptop:gap-10 mb-8 laptop:my-16 px-7 laptop:px-16 fhd:px-0
  grid-cols-1 tablet:grid-cols-2
`;

const MobileButtonGroup = tw.div<{$hasNoItems: boolean}>`
  sticky bottom-0 flex h-11 laptop:hidden
  ${p => (p.$hasNoItems ? 'hidden' : '')}
`;
