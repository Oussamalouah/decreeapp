/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCollectionProductsByHandle
// ====================================================

export interface getCollectionProductsByHandle_collectionByHandle_products_edges_node_subtitle {
  __typename: "Metafield";
  /**
   * The value of a metafield.
   */
  value: string;
}

export interface getCollectionProductsByHandle_collectionByHandle_products_edges_node_media_edges_node_previewImage {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface getCollectionProductsByHandle_collectionByHandle_products_edges_node_media_edges_node {
  __typename: "ExternalVideo" | "MediaImage" | "Model3d" | "Video";
  /**
   * The preview image for the media.
   */
  previewImage: getCollectionProductsByHandle_collectionByHandle_products_edges_node_media_edges_node_previewImage | null;
}

export interface getCollectionProductsByHandle_collectionByHandle_products_edges_node_media_edges {
  __typename: "MediaEdge";
  /**
   * The item at the end of MediaEdge.
   */
  node: getCollectionProductsByHandle_collectionByHandle_products_edges_node_media_edges_node;
}

export interface getCollectionProductsByHandle_collectionByHandle_products_edges_node_media {
  __typename: "MediaConnection";
  /**
   * A list of edges.
   */
  edges: getCollectionProductsByHandle_collectionByHandle_products_edges_node_media_edges[];
}

export interface getCollectionProductsByHandle_collectionByHandle_products_edges_node {
  __typename: "Product";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product’s title.
   */
  title: string;
  /**
   * Stripped description of the product, single line with HTML tags removed.
   */
  description: string;
  /**
   * A comma separated list of tags that have been added to the product.
   * Additional access scope required for private apps: unauthenticated_read_product_tags.
   */
  tags: string[];
  /**
   * A categorization that a product can be tagged with, commonly used for filtering and searching.
   */
  productType: string;
  /**
   * Returns a metafield found by namespace and key.
   */
  subtitle: getCollectionProductsByHandle_collectionByHandle_products_edges_node_subtitle | null;
  /**
   * The media associated with the product.
   */
  media: getCollectionProductsByHandle_collectionByHandle_products_edges_node_media;
}

export interface getCollectionProductsByHandle_collectionByHandle_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: getCollectionProductsByHandle_collectionByHandle_products_edges_node;
}

export interface getCollectionProductsByHandle_collectionByHandle_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: getCollectionProductsByHandle_collectionByHandle_products_edges[];
}

export interface getCollectionProductsByHandle_collectionByHandle {
  __typename: "Collection";
  /**
   * Stripped description of the collection, single line with HTML tags removed.
   */
  description: string;
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The collection’s name. Limit of 255 characters.
   */
  title: string;
  /**
   * List of products in the collection.
   */
  products: getCollectionProductsByHandle_collectionByHandle_products;
}

export interface getCollectionProductsByHandle {
  /**
   * Find a collection by its handle.
   */
  collectionByHandle: getCollectionProductsByHandle_collectionByHandle | null;
}

export interface getCollectionProductsByHandleVariables {
  collectionHandle: string;
  productsCount: number;
}
