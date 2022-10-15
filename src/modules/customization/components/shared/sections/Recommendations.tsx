import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {getProductRecommendations_productRecommendations} from '../../../../../api/operations/queries/__generated__/getProductRecommendations';
import {images} from '../../../../../assets/images';
import {routes} from '../../../../../route-list';
import {DecreeCardPreview} from '../../../../core/DecreeCardPreview';
import {DecreeText} from '../../../../core/DecreeText';
import {ProductPreviewModal} from '../../../../store/components/shared/ProductPreviewModal';

type Props = {
  productRecommendations: getProductRecommendations_productRecommendations[];
};

export const Recommendations = (props: Props) => {
  const history = useHistory();

  // Ephemeral state.
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<getProductRecommendations_productRecommendations | null>(null);

  const [page, setPage] = useState<number>(1);

  const navigateToProductCustomization = (
    product: getProductRecommendations_productRecommendations
  ) =>
    history.push(
      routes.STORE__VIEW__PRODUCT_CUSTOMIZATION(product.productType, product.id)
    );

  return (
    <div>
      <ProductPreviewModal
        isOpen={!!selectedRecommendation}
        product={selectedRecommendation}
        onCancel={() => setSelectedRecommendation(null)}
        onPersonalize={() => {
          if (!selectedRecommendation) return;
          navigateToProductCustomization(selectedRecommendation);
        }}
        isProductRecommendations={true}
      />

      <DecreeText
        size={30}
        className="mb-8 font-serif font-bold text-center text-blue-dark laptop:text-left"
      >
        You may also like
      </DecreeText>
      <div className="hidden grid-cols-3 gap-8 tablet:grid mb-9">
        {props?.productRecommendations?.map((product, index) => {
          const productCount = index + 1;

          if (productCount > page * 3) return null;

          return (
            <div key={index} className="flex justify-center">
              <DecreeCardPreview
                title={product.title}
                subtitle={product?.subtitle?.value || ''}
                imageURL={
                  product.media.edges?.[0].node.previewImage?.originalSrc
                }
                hasShadow={true}
                onEditClick={() => {
                  navigateToProductCustomization(product);
                }}
                onPreviewClick={() => {
                  setSelectedRecommendation(product);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-8 tablet:hidden">
        <CarouselProvider
          naturalSlideWidth={233}
          naturalSlideHeight={297}
          totalSlides={props.productRecommendations.length}
        >
          <Slider className="px-[15%]">
            {props.productRecommendations.map((product, i) => (
              <Slide key={product.id} index={i} innerClassName="px-3">
                <DecreeCardPreview
                  title={product.title}
                  subtitle=""
                  imageURL={
                    product.media.edges?.[0].node.previewImage?.originalSrc
                  }
                  hasShadow={true}
                  hoverButtonsDirection="vertical"
                  onEditClick={() => {
                    navigateToProductCustomization(product);
                  }}
                />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
      {props.productRecommendations.length > 3 &&
        page * 3 < props.productRecommendations.length && (
          <DecreeText
            size={23}
            onClick={() => setPage(prev => prev + 1)}
            className="hidden cursor-pointer font-serif font-bold text-center underline text-gold laptop:block"
          >
            see more
          </DecreeText>
        )}
    </div>
  );
};
