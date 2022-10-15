/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CurrencyCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getPackages
// ====================================================

export interface getPackages_collections_edges_node_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface getPackages_collections_edges_node_bundle_type {
  __typename: "Metafield";
  /**
   * The value of a metafield.
   */
  value: string;
}

export interface getPackages_collections_edges_node_subtitle {
  __typename: "Metafield";
  /**
   * The value of a metafield.
   */
  value: string;
}

export interface getPackages_collections_edges_node_collection_type {
  __typename: "Metafield";
  /**
   * The value of a metafield.
   */
  value: string;
}

export interface getPackages_collections_edges_node_metafields_edges_node {
  __typename: "Metafield";
  /**
   * The namespace for a metafield.
   */
  namespace: string;
  /**
   * The key name for a metafield.
   */
  key: string;
}

export interface getPackages_collections_edges_node_metafields_edges {
  __typename: "MetafieldEdge";
  /**
   * The item at the end of MetafieldEdge.
   */
  node: getPackages_collections_edges_node_metafields_edges_node;
}

export interface getPackages_collections_edges_node_metafields {
  __typename: "MetafieldConnection";
  /**
   * A list of edges.
   */
  edges: getPackages_collections_edges_node_metafields_edges[];
}

export interface getPackages_collections_edges_node_products_edges_node_options {
  __typename: "ProductOption";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product option’s name.
   */
  name: string;
  /**
   * The corresponding value to the product option name.
   */
  values: string[];
}

export interface getPackages_collections_edges_node_products_edges_node_subtitle {
  __typename: "Metafield";
  /**
   * The value of a metafield.
   */
  value: string;
}

export interface getPackages_collections_edges_node_products_edges_node_priceRange_maxVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface getPackages_collections_edges_node_products_edges_node_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface getPackages_collections_edges_node_products_edges_node_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The highest variant's price.
   */
  maxVariantPrice: getPackages_collections_edges_node_products_edges_node_priceRange_maxVariantPrice;
  /**
   * The lowest variant's price.
   */
  minVariantPrice: getPackages_collections_edges_node_products_edges_node_priceRange_minVariantPrice;
}

export interface getPackages_collections_edges_node_products_edges_node_metafields_edges_node {
  __typename: "Metafield";
  /**
   * The key name for a metafield.
   */
  key: string;
  /**
   * The value of a metafield.
   */
  value: string;
}

export interface getPackages_collections_edges_node_products_edges_node_metafields_edges {
  __typename: "MetafieldEdge";
  /**
   * The item at the end of MetafieldEdge.
   */
  node: getPackages_collections_edges_node_products_edges_node_metafields_edges_node;
}

export interface getPackages_collections_edges_node_products_edges_node_metafields {
  __typename: "MetafieldConnection";
  /**
   * A list of edges.
   */
  edges: getPackages_collections_edges_node_products_edges_node_metafields_edges[];
}

export interface getPackages_collections_edges_node_products_edges_node_images_edges_node {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface getPackages_collections_edges_node_products_edges_node_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: getPackages_collections_edges_node_products_edges_node_images_edges_node;
}

export interface getPackages_collections_edges_node_products_edges_node_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: getPackages_collections_edges_node_products_edges_node_images_edges[];
}

export interface getPackages_collections_edges_node_products_edges_node_media_edges_node_previewImage {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface getPackages_collections_edges_node_products_edges_node_media_edges_node {
  __typename: "ExternalVideo" | "MediaImage" | "Model3d" | "Video";
  /**
   * The preview image for the media.
   */
  previewImage: getPackages_collections_edges_node_products_edges_node_media_edges_node_previewImage | null;
}

export interface getPackages_collections_edges_node_products_edges_node_media_edges {
  __typename: "MediaEdge";
  /**
   * The item at the end of MediaEdge.
   */
  node: getPackages_collections_edges_node_products_edges_node_media_edges_node;
}

export interface getPackages_collections_edges_node_products_edges_node_media {
  __typename: "MediaConnection";
  /**
   * A list of edges.
   */
  edges: getPackages_collections_edges_node_products_edges_node_media_edges[];
}

export interface getPackages_collections_edges_node_products_edges_node_variants_edges_node_priceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
  /**
   * Currency of the money.
   */
  currencyCode: CurrencyCode;
}

export interface getPackages_collections_edges_node_products_edges_node_variants_edges_node_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface getPackages_collections_edges_node_products_edges_node_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product variant’s price.
   */
  priceV2: getPackages_collections_edges_node_products_edges_node_variants_edges_node_priceV2;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: getPackages_collections_edges_node_products_edges_node_variants_edges_node_image | null;
}

export interface getPackages_collections_edges_node_products_edges_node_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: getPackages_collections_edges_node_products_edges_node_variants_edges_node;
}

export interface getPackages_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: getPackages_collections_edges_node_products_edges_node_variants_edges[];
}

export interface getPackages_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * A comma separated list of tags that have been added to the product.
   * Additional access scope required for private apps: unauthenticated_read_product_tags.
   */
  tags: string[];
  /**
   * The product’s title.
   */
  title: string;
  /**
   * The total quantity of inventory in stock for this Product.
   */
  totalInventory: number | null;
  /**
   * Stripped description of the product, single line with HTML tags removed.
   */
  description: string;
  /**
   * The date and time when the product was created.
   */
  createdAt: any;
  /**
   * A categorization that a product can be tagged with, commonly used for filtering and searching.
   */
  productType: string;
  /**
   * The date and time when the product was last modified.
   * A product's `updatedAt` value can change for different reasons. For example, if an order
   * is placed for a product that has inventory tracking set up, then the inventory adjustment
   * is counted as an update.
   */
  updatedAt: any;
  /**
   * List of product options.
   */
  options: getPackages_collections_edges_node_products_edges_node_options[];
  /**
   * Returns a metafield found by namespace and key.
   */
  subtitle: getPackages_collections_edges_node_products_edges_node_subtitle | null;
  /**
   * The price range.
   */
  priceRange: getPackages_collections_edges_node_products_edges_node_priceRange;
  /**
   * A paginated list of metafields associated with the resource.
   */
  metafields: getPackages_collections_edges_node_products_edges_node_metafields;
  /**
   * List of images associated with the product.
   */
  images: getPackages_collections_edges_node_products_edges_node_images;
  /**
   * The media associated with the product.
   */
  media: getPackages_collections_edges_node_products_edges_node_media;
  /**
   * List of the product’s variants.
   */
  variants: getPackages_collections_edges_node_products_edges_node_variants;
}

export interface getPackages_collections_edges_node_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: getPackages_collections_edges_node_products_edges_node;
}

export interface getPackages_collections_edges_node_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: getPackages_collections_edges_node_products_edges[];
}

export interface getPackages_collections_edges_node {
  __typename: "Collection";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The collection’s name. Limit of 255 characters.
   */
  title: string;
  /**
   * Image associated with the collection.
   */
  image: getPackages_collections_edges_node_image | null;
  /**
   * Returns a metafield found by namespace and key.
   */
  bundle_type: getPackages_collections_edges_node_bundle_type | null;
  /**
   * Returns a metafield found by namespace and key.
   */
  subtitle: getPackages_collections_edges_node_subtitle | null;
  /**
   * Returns a metafield found by namespace and key.
   */
  collection_type: getPackages_collections_edges_node_collection_type | null;
  /**
   * A paginated list of metafields associated with the resource.
   */
  metafields: getPackages_collections_edges_node_metafields;
  /**
   * List of products in the collection.
   */
  products: getPackages_collections_edges_node_products;
}

export interface getPackages_collections_edges {
  __typename: "CollectionEdge";
  /**
   * The item at the end of CollectionEdge.
   */
  node: getPackages_collections_edges_node;
}

export interface getPackages_collections {
  __typename: "CollectionConnection";
  /**
   * A list of edges.
   */
  edges: getPackages_collections_edges[];
}

export interface getPackages {
  /**
   * List of the shop’s collections.
   */
  collections: getPackages_collections;
}
