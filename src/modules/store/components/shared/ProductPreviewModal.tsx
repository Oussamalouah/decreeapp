import React, {useEffect} from 'react';
import {getPackages_collections_edges} from '../../../../api/operations/queries/__generated__/getPackages';
import {getProductRecommendations_productRecommendations} from '../../../../api/operations/queries/__generated__/getProductRecommendations';
import {getProducts_products_edges} from '../../../../api/operations/queries/__generated__/getProducts';
import {images} from '../../../../assets/images';
import {DecreeButton} from '../../../core/DecreeButton';
import {DecreeModal} from '../../../core/DecreeModal';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import {ArrowLeftIcon, ArrowRightIcon} from '../../../../assets/svg';
import _ from 'lodash';

type Props = {
  isOpen: boolean;
  product:
    | getProducts_products_edges
    | getPackages_collections_edges
    | getProductRecommendations_productRecommendations
    | null;
  onPersonalize?: () => void;
  onCancel: () => void;
  isProductRecommendations?: boolean;
};

export const ProductPreviewModal = (props: Props) => {
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  const collection = {
    packages: props.product as getPackages_collections_edges,
    products: props.product as getProducts_products_edges,
    product: props.product as getProductRecommendations_productRecommendations,
  };

  useEffect(() => {
    if (
      (collection.packages || collection.products) &&
      !props.isProductRecommendations
    ) {
      const isPackage = collection.packages.node?.__typename === 'Collection';

      const mappedImages =
        (isPackage &&
          [
            collection.packages.node.image?.originalSrc,
            ...collection.packages.node.products.edges.flatMap(product =>
              product.node.media.edges.map(
                edge => edge.node?.previewImage?.originalSrc
              )
            ),
          ].filter(src => !!src)) ||
        collection.products.node.media.edges
          .map(img => img.node.previewImage?.originalSrc)
          .filter(src => !!src);

      setPreviewImages(() => {
        return mappedImages.length
          ? _.uniq(mappedImages)
          : [images.decree_no_image];
      });
    }
  }, [collection.packages, collection.products]);

  useEffect(() => {
    if (collection.product && props.isProductRecommendations) {
      const mappedImages = collection.product.media.edges
        .map(img => img.node.previewImage?.originalSrc)
        .filter(src => !!src);

      setPreviewImages(() => {
        return mappedImages.length
          ? _.uniq(mappedImages)
          : [images.decree_no_image];
      });
    }
  }, [props.isProductRecommendations, collection.product]);

  return (
    <DecreeModal
      isOpen={props.isOpen}
      onRequestClose={props.onCancel}
      contentStyle={{minWidth: '60%'}}
    >
      <div className="py-6 space-y-4 border bg-offwhite">
        <div className="flex justify-end px-4">
          <DecreeButton onClick={props.onPersonalize}>Customize</DecreeButton>
          <DecreeButton mode="text" onClick={props.onCancel}>
            Cancel
          </DecreeButton>
        </div>
        <CarouselProvider
          totalSlides={previewImages.length}
          naturalSlideWidth={16}
          naturalSlideHeight={9}
          infinite
        >
          <div className="relative min-w-[600px] ">
            <Slider>
              {previewImages.map((imgSrc, idx) => {
                return (
                  <Slide index={idx} key={idx}>
                    <div className="h-full flex justify-center items-center">
                      <img
                        src={imgSrc}
                        className="filter drop-shadow-card object-contain w-full h-full"
                      />
                    </div>
                  </Slide>
                );
              })}
            </Slider>
            {previewImages.length > 1 && (
              <>
                <ButtonBack className="absolute left-4 transform -translate-y-1/2 top-1/2">
                  <ArrowLeftIcon fill="#fff" className="w-2 laptop:w-7" />
                </ButtonBack>
                <ButtonNext className="absolute right-4 transform -translate-y-1/2 top-1/2">
                  <ArrowRightIcon fill="#fff" className="w-2 laptop:w-7" />
                </ButtonNext>
              </>
            )}
          </div>
        </CarouselProvider>
      </div>
    </DecreeModal>
  );
};
