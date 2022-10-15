import React from 'react';
import {useManyQueries} from '../../../utils/hooks/query-hooks';
import {
  getCollectionProductsByHandle,
  getCollectionProductsByHandle_collectionByHandle,
  getCollectionProductsByHandle_collectionByHandle_products_edges_node,
} from '../../../api/operations/queries/__generated__/getCollectionProductsByHandle';
import {GET_COLLECTION_PRODUCTS_BY_HANDLE} from '../../../api/operations/queries/collection';
import {routes} from '../../../route-list';
import {useHistory} from 'react-router-dom';

export type FavoritesContainerProps = {
  userClickedViewDetails: (
    item: getCollectionProductsByHandle_collectionByHandle_products_edges_node
  ) => void;
  loading: boolean;
  favoritesCollections: (
    | getCollectionProductsByHandle_collectionByHandle
    | null
    | undefined
  )[];
};

/**
 * @typedef {Object} FavoritesContainerOptions
 * @property {string[]} collectionHandles - an array of collection handles that are considered as "favorites"
 */
export type FavoritesContainerOptions = {
  collectionHandles: string[];
};

/**
 * A higher order component that provides stateful information to a presentational
 * component that displays a tab section of the merchant's favorite stationeries
 *
 * @param Component {React.Component<FavoritesContainerProps>} - presentational component
 * @param options {FavoritesContainerOptions} - options such as for the static collection handles in Shopify
 *
 */
export const FavoritesContainer = (
  Component: React.ComponentType<FavoritesContainerProps>,
  options: FavoritesContainerOptions
) => {
  return () => {
    const history = useHistory();

    // variable name 'favorites' is intentional
    const favoritesCollectionsQueries =
      useManyQueries<getCollectionProductsByHandle>(
        options.collectionHandles.map(collectionHandle => {
          return [
            GET_COLLECTION_PRODUCTS_BY_HANDLE,
            {
              variables: {
                collectionHandle: collectionHandle,
                productsCount: 3,
              },
              fetchPolicy: 'cache-and-network',
            },
          ];
        })
      );

    return (
      <Component
        userClickedViewDetails={item => {
          history.push(
            routes.STORE__VIEW__PRODUCT_CUSTOMIZATION(item.productType, item.id)
          );
        }}
        loading={favoritesCollectionsQueries.some(query => query.loading)}
        favoritesCollections={favoritesCollectionsQueries.map(query => {
          return query.data?.collectionByHandle;
        })}
      />
    );
  };
};
