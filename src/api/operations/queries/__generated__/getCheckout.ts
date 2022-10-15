/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CurrencyCode } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCheckout
// ====================================================

export interface getCheckout_node_Article {
  __typename: "Article" | "Metafield" | "Blog" | "Collection" | "Product" | "ProductOption" | "ProductVariant" | "Location" | "MailingAddress" | "AppliedGiftCard" | "CheckoutLineItem" | "Order" | "Page" | "ShopPolicy" | "Comment" | "Payment" | "ExternalVideo" | "MediaImage" | "Model3d" | "Video";
}

export interface getCheckout_node_Checkout_lineItems_edges_node_customAttributes {
  __typename: "Attribute";
  /**
   * Key or name of the attribute.
   */
  key: string;
  /**
   * Value of the attribute.
   */
  value: string | null;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_options {
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

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_subtitle {
  __typename: "Metafield";
  /**
   * The value of a metafield.
   */
  value: string;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_priceRange_maxVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The highest variant's price.
   */
  maxVariantPrice: getCheckout_node_Checkout_lineItems_edges_node_variant_product_priceRange_maxVariantPrice;
  /**
   * The lowest variant's price.
   */
  minVariantPrice: getCheckout_node_Checkout_lineItems_edges_node_variant_product_priceRange_minVariantPrice;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_metafields_edges_node {
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

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_metafields_edges {
  __typename: "MetafieldEdge";
  /**
   * The item at the end of MetafieldEdge.
   */
  node: getCheckout_node_Checkout_lineItems_edges_node_variant_product_metafields_edges_node;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_metafields {
  __typename: "MetafieldConnection";
  /**
   * A list of edges.
   */
  edges: getCheckout_node_Checkout_lineItems_edges_node_variant_product_metafields_edges[];
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_images_edges_node {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: getCheckout_node_Checkout_lineItems_edges_node_variant_product_images_edges_node;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: getCheckout_node_Checkout_lineItems_edges_node_variant_product_images_edges[];
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_media_edges_node_previewImage {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_media_edges_node {
  __typename: "ExternalVideo" | "MediaImage" | "Model3d" | "Video";
  /**
   * The preview image for the media.
   */
  previewImage: getCheckout_node_Checkout_lineItems_edges_node_variant_product_media_edges_node_previewImage | null;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_media_edges {
  __typename: "MediaEdge";
  /**
   * The item at the end of MediaEdge.
   */
  node: getCheckout_node_Checkout_lineItems_edges_node_variant_product_media_edges_node;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_media {
  __typename: "MediaConnection";
  /**
   * A list of edges.
   */
  edges: getCheckout_node_Checkout_lineItems_edges_node_variant_product_media_edges[];
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_variants_edges_node_priceV2 {
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

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_variants_edges_node_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product variant’s price.
   */
  priceV2: getCheckout_node_Checkout_lineItems_edges_node_variant_product_variants_edges_node_priceV2;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: getCheckout_node_Checkout_lineItems_edges_node_variant_product_variants_edges_node_image | null;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: getCheckout_node_Checkout_lineItems_edges_node_variant_product_variants_edges_node;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: getCheckout_node_Checkout_lineItems_edges_node_variant_product_variants_edges[];
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_product {
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
  options: getCheckout_node_Checkout_lineItems_edges_node_variant_product_options[];
  /**
   * Returns a metafield found by namespace and key.
   */
  subtitle: getCheckout_node_Checkout_lineItems_edges_node_variant_product_subtitle | null;
  /**
   * The price range.
   */
  priceRange: getCheckout_node_Checkout_lineItems_edges_node_variant_product_priceRange;
  /**
   * A paginated list of metafields associated with the resource.
   */
  metafields: getCheckout_node_Checkout_lineItems_edges_node_variant_product_metafields;
  /**
   * List of images associated with the product.
   */
  images: getCheckout_node_Checkout_lineItems_edges_node_variant_product_images;
  /**
   * The media associated with the product.
   */
  media: getCheckout_node_Checkout_lineItems_edges_node_variant_product_media;
  /**
   * List of the product’s variants.
   */
  variants: getCheckout_node_Checkout_lineItems_edges_node_variant_product_variants;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_priceV2 {
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

export interface getCheckout_node_Checkout_lineItems_edges_node_variant_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: any;
}

export interface getCheckout_node_Checkout_lineItems_edges_node_variant {
  __typename: "ProductVariant";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product object that the product variant belongs to.
   */
  product: getCheckout_node_Checkout_lineItems_edges_node_variant_product;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku: string | null;
  /**
   * The product variant’s price.
   */
  priceV2: getCheckout_node_Checkout_lineItems_edges_node_variant_priceV2;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: getCheckout_node_Checkout_lineItems_edges_node_variant_image | null;
}

export interface getCheckout_node_Checkout_lineItems_edges_node {
  __typename: "CheckoutLineItem";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * Extra information in the form of an array of Key-Value pairs about the line item.
   */
  customAttributes: getCheckout_node_Checkout_lineItems_edges_node_customAttributes[];
  /**
   * The quantity of the line item.
   */
  quantity: number;
  /**
   * Title of the line item. Defaults to the product's title.
   */
  title: string;
  /**
   * Product variant of the line item.
   */
  variant: getCheckout_node_Checkout_lineItems_edges_node_variant | null;
}

export interface getCheckout_node_Checkout_lineItems_edges {
  __typename: "CheckoutLineItemEdge";
  /**
   * The item at the end of CheckoutLineItemEdge.
   */
  node: getCheckout_node_Checkout_lineItems_edges_node;
}

export interface getCheckout_node_Checkout_lineItems {
  __typename: "CheckoutLineItemConnection";
  /**
   * A list of edges.
   */
  edges: getCheckout_node_Checkout_lineItems_edges[];
}

export interface getCheckout_node_Checkout_lineItemsSubtotalPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface getCheckout_node_Checkout_subtotalPriceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface getCheckout_node_Checkout_totalPriceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: any;
}

export interface getCheckout_node_Checkout {
  __typename: "Checkout";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The email attached to this checkout.
   */
  email: string | null;
  /**
   * The date and time when the checkout was created.
   */
  createdAt: any;
  /**
   * A list of line item objects, each one containing information about an item in the checkout.
   */
  lineItems: getCheckout_node_Checkout_lineItems;
  /**
   * The sum of all the prices of all the items in the checkout. Duties, taxes, shipping and discounts excluded.
   */
  lineItemsSubtotalPrice: getCheckout_node_Checkout_lineItemsSubtotalPrice;
  /**
   * The note associated with the checkout.
   */
  note: string | null;
  /**
   * Price of the checkout before duties, shipping and taxes.
   */
  subtotalPriceV2: getCheckout_node_Checkout_subtotalPriceV2;
  /**
   * The date and time when the checkout was last updated.
   */
  updatedAt: any;
  /**
   * The url pointing to the checkout accessible from the web.
   */
  webUrl: any;
  /**
   * The currency code for the Checkout.
   */
  currencyCode: CurrencyCode;
  /**
   * The sum of all the prices of all the items in the checkout, duties, taxes and discounts included.
   */
  totalPriceV2: getCheckout_node_Checkout_totalPriceV2;
  /**
   * The date and time when the checkout was completed.
   */
  completedAt: any | null;
}

export type getCheckout_node = getCheckout_node_Article | getCheckout_node_Checkout;

export interface getCheckout {
  /**
   * Returns a specific node by ID.
   */
  node: getCheckout_node | null;
}

export interface getCheckoutVariables {
  id: string;
}
