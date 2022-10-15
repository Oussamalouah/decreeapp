/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CurrencyCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CoreProductFields
// ====================================================

export interface CoreProductFields_options {
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

export interface CoreProductFields_subtitle {
  __typename: "Metafield";
  /**
   * The value of a metafield.
   */
  value: string;
}

export interface CoreProductFields_priceRange_maxVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface CoreProductFields_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface CoreProductFields_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The highest variant's price.
   */
  maxVariantPrice: CoreProductFields_priceRange_maxVariantPrice;
  /**
   * The lowest variant's price.
   */
  minVariantPrice: CoreProductFields_priceRange_minVariantPrice;
}

export interface CoreProductFields_metafields_edges_node {
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

export interface CoreProductFields_metafields_edges {
  __typename: "MetafieldEdge";
  /**
   * The item at the end of MetafieldEdge.
   */
  node: CoreProductFields_metafields_edges_node;
}

export interface CoreProductFields_metafields {
  __typename: "MetafieldConnection";
  /**
   * A list of edges.
   */
  edges: CoreProductFields_metafields_edges[];
}

export interface CoreProductFields_images_edges_node {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface CoreProductFields_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: CoreProductFields_images_edges_node;
}

export interface CoreProductFields_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: CoreProductFields_images_edges[];
}

export interface CoreProductFields_media_edges_node_previewImage {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface CoreProductFields_media_edges_node {
  __typename: "ExternalVideo" | "MediaImage" | "Model3d" | "Video";
  /**
   * The preview image for the media.
   */
  previewImage: CoreProductFields_media_edges_node_previewImage | null;
}

export interface CoreProductFields_media_edges {
  __typename: "MediaEdge";
  /**
   * The item at the end of MediaEdge.
   */
  node: CoreProductFields_media_edges_node;
}

export interface CoreProductFields_media {
  __typename: "MediaConnection";
  /**
   * A list of edges.
   */
  edges: CoreProductFields_media_edges[];
}

export interface CoreProductFields_variants_edges_node_priceV2 {
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

export interface CoreProductFields_variants_edges_node_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface CoreProductFields_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product variant’s price.
   */
  priceV2: CoreProductFields_variants_edges_node_priceV2;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: CoreProductFields_variants_edges_node_image | null;
}

export interface CoreProductFields_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: CoreProductFields_variants_edges_node;
}

export interface CoreProductFields_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: CoreProductFields_variants_edges[];
}

export interface CoreProductFields {
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
  options: CoreProductFields_options[];
  /**
   * Returns a metafield found by namespace and key.
   */
  subtitle: CoreProductFields_subtitle | null;
  /**
   * The price range.
   */
  priceRange: CoreProductFields_priceRange;
  /**
   * A paginated list of metafields associated with the resource.
   */
  metafields: CoreProductFields_metafields;
  /**
   * List of images associated with the product.
   */
  images: CoreProductFields_images;
  /**
   * The media associated with the product.
   */
  media: CoreProductFields_media;
  /**
   * List of the product’s variants.
   */
  variants: CoreProductFields_variants;
}
