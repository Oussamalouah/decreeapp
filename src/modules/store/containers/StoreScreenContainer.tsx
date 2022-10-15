import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {
  PACKAGES_QUERY,
  PRODUCTS_QUERY,
} from '../../../api/operations/queries/store';
import {routes} from '../../../route-list';
import {isRouteValid} from '../../../utils/route-checker';
import {getProducts_products_edges} from '../../../api/operations/queries/__generated__/getProducts';
import {getPackages_collections_edges} from '../../../api/operations/queries/__generated__/getPackages';
import {useSearchParams} from '../../../utils/hooks/use-search-params';
import {StationeryTypes} from '../../../utils/constants/stationery-type.constants';
import {getProductTags} from './helpers/get-product-tags';
import {getProductCategories} from './helpers/get-product-categories';
import {getSortedProducts} from './helpers/get-sorted-products';
import {getFilteredCollections} from './helpers/get-filtered-collections';
import {weddingCategories} from '../../../utils/constants/store.contants';
import {getProductStationeryType} from '../../../utils/get-product-stationery-type';

type Collection = getProducts_products_edges | getPackages_collections_edges;

type ProductCollection = {
  type: 'product';
  items: getProducts_products_edges[] | [];
};

type PackageCollection = {
  type: 'package';
  items: getPackages_collections_edges[] | [];
};

export type QueryProps = {
  products?: {edges: ProductEdges};
  collections?: {edges: CollectionEdges};
};

export type ProductEdges = getProducts_products_edges[];

export type CollectionEdges = getPackages_collections_edges[];

export type Category = {
  id: string;
  text: string;
};

export type StoreScreenProps = {
  loading: boolean;
  isProductMenuVisible: boolean;
  isTagMenuVisible: boolean;
  collection: ProductCollection | PackageCollection;
  selectedProduct: Collection | null;
  currentProductType: string;
  stationeryType: StationeryTypes | undefined;
  tags: Category[];
  products: Category[];

  userClickedPreview: (item: Collection) => void;
  userClickedPersonalize: (item: Collection) => void;
  userClickedCancel: () => void;
  userClickedMenuItem: (
    productId: string,
    filters?: {tagIds?: string; paperColors?: string; sortType?: string}
  ) => void;
  userClickedProductMenu: (isVisible: boolean) => void;
  userClickedTagMenu: (isVisible: boolean) => void;
};

export const StoreScreenContainer =
  (Screen: React.FC<StoreScreenProps>) => () => {
    const [isTagMenuVisible, setIsTagMenuVisible] = useState<boolean>(false);
    const [isProductMenuVisible, setIsProductMenuVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] =
      useState<Collection | null>(null);

    const {productId: productTypeId} = useParams<{productId: string}>();
    const history = useHistory();
    const searchParams = useSearchParams();
    const stationeryType = getProductStationeryType(productTypeId);

    const tagTypeIdSearch = searchParams.get('tagIds');
    const tagTypeIds = tagTypeIdSearch?.split('|') || [];

    const paperColorSearch = searchParams.get('paperColors');
    const paperColors = paperColorSearch?.split('|') || [];

    const isPackages = productTypeId === 'packages';

    // Gets list of categories and tags based on stationery type
    const products = getProductCategories(stationeryType);
    const tags = getProductTags(stationeryType, productTypeId);

    const {loading, data} = useQuery<QueryProps>(
      isPackages ? PACKAGES_QUERY : PRODUCTS_QUERY,
      {
        variables: {
          query:
            isPackages || tagTypeIds.length <= 0
              ? `${`product_type:${productTypeId}`}`
              : `${`product_type:${productTypeId} tag:${tagTypeIds.join(
                  ' AND '
                )}`}`,
        },
        fetchPolicy: 'cache-and-network',
      }
    );

    // Redirects user if path is invalid
    useEffect(() => {
      const isValidProduct = isRouteValid(
        productTypeId,
        products.map(i => i.id)
      );

      if (!isValidProduct) {
        history.push(routes.STORE__VIEW(weddingCategories[0]?.id));
      }
    }, []);

    const collectionMap = {
      packages: {
        type: 'package',
        items: getFilteredCollections(
          tags,
          tagTypeIds,
          paperColors,
          data?.collections?.edges
        ),
      } as PackageCollection,
      products: {
        type: 'product',
        items: getSortedProducts(
          stationeryType,
          data?.products?.edges,
          paperColors
        ),
      } as ProductCollection,
    };

    return (
      <Screen
        collection={collectionMap[isPackages ? 'packages' : 'products']}
        loading={loading}
        selectedProduct={selectedProduct}
        isProductMenuVisible={isProductMenuVisible}
        isTagMenuVisible={isTagMenuVisible}
        currentProductType={productTypeId}
        stationeryType={stationeryType}
        tags={tags}
        products={products}
        /* FUNCTIONS */
        userClickedMenuItem={(productId, filters) => {
          setIsProductMenuVisible(false);
          setIsTagMenuVisible(false);
          history.push(routes.STORE__VIEW(productId, filters));
        }}
        userClickedPreview={setSelectedProduct}
        userClickedCancel={() => setSelectedProduct(null)}
        userClickedPersonalize={product => {
          if (product) {
            history.push(
              routes.STORE__VIEW__PRODUCT_CUSTOMIZATION(
                productTypeId,
                product.node.id
              )
            );
          }
        }}
        userClickedTagMenu={isVisible => setIsTagMenuVisible(isVisible)}
        userClickedProductMenu={isVisible => setIsProductMenuVisible(isVisible)}
      />
    );
  };
