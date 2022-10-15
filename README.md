<img src="icon.png" align="right" width="300px" />

# Decree [![Build Status](https://travis-ci.com/smashingboxes/decree-app.svg?token=XhqG9x8JhqazdqQwRrUe&branch=dev)](https://travis-ci.com/smashingboxes/decree-app) [![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

This repository is the codebase for the Decree frontend application.

## Getting Started

### Installation and Development

Read the instructions below to get started and start contributing.
This project connects to Shopify through the Shopify Storefront API.

#### Prerequisites

- Make sure you have `NodeJS >= 12`. You may use `nvm` for managing `NodeJS` versions.
  - If you have `nvm` installed, you can execute `nvm use [node_version >= 12]`
- This project uses `npm` as the package manager

#### Running the Application

- Install the project dependencies with:

  `npm install`

- Start the development server:

  `npm start`

## Developer Notes

### Shopify Storefront API Playground

##### GraphQL Endpoint

Use this endpoint for testing GraphQL queries and mutations:

```
https://decree-co.myshopify.com/api/2021-07/graphql.json
```

##### HTTP Headers

Add the following HTTP Headers:

```json
{
  "X-Shopify-Storefront-Access-Token": "STOREFRONT_ACCESS_TOKEN"
}
```

_You can get the Storefront Access Token inside the Shopify Admin Panel._

### Adding New Products In the Shopify Admin Panel

Create a normal product. Add the price, product type, quantity, tags
and title. For the media file or svg, upload the image in shopify. Its under **Settings**
and **Files**. Once uploaded, click copy link and paste that into the respective
**Product** in its **description** as Shopify doesn't allow SVG's in the media section.
Do not add variants, that might lead into issues.

After the creation of the product.
Click on More actions on the upper right of your screen and click edit metafields.

Set namespace to **global** and key to the property of the product you wish to add.
A list of all current metafields for products can be found in **SAMPLE_PRODUCT**
back in the products tab.

### How to Add New Metadata Field

If the metadata field is being set for the first time. You will need to expose it
for the storefront api to be able to see it.

Use the endpoint:

```
https://{admin_api_key}:{admin_password}@decree-co.myshopify.com/admin/api/2021-07/graphql.json
```

Place in the body as GraphQL:

```
mutation($input: MetafieldStorefrontVisibilityInput!) {
  metafieldStorefrontVisibilityCreate(
    input: $input
  ) {
    metafieldStorefrontVisibility {
      id
    }
    userErrors {
      field
      message
    }
  }
}
```

Variables:

```
{
  "input": {
    "namespace": "global",
    "key": "YOUR_KEY",
    "ownerType": "OWNER_TYPE"
  }
}
```

[List of available owner types](https://shopify.dev/api/admin/graphql/reference/metafields/metafieldownertype)

### GraphQL Types Codegen & Usage

This project has scripts for generating Typescript types for queries written in `gql` (given a valid GraphQL schema).

```json
// package.json
{
  "name": "decree-app",
  "version": "0.1.0",
  "scripts": {
    ...
    "download-schema": "...",
    "codegen": "..."
  },
  ...
}
```

When updating or writing a new `gql`, to generate types for it:

1. Write a valid `gql`
2. If you have [client-only](https://www.apollographql.com/blog/apollo-client/caching/local-state-management-with-reactive-variables/) types, write it in `local-schema.graphql`
3. `npm run download-schema` to download our shopify GraphQL schema (optional: you don't need to do this if you've already downloaded the schema)
4. `npm run codegen` to generate types for the operations
5. You can then use the generated types like:

   ```tsx
   import {
    customerUpdate,
    customerUpdateVariables,
   } from '{project-root}/api/operations/mutations/__generated__/customerUpdate';
   ...
   // mutation to update an existing customer
   const [customerUpdate, {loading}] = useMutation<
     customerUpdate,
     customerUpdateVariables
   >(CUSTOMER_UPDATE, {
     onCompleted: () => {...},
     onError: e => {...},
   });
   ```

Generated types location:

- `{project-root}/__generated__`
- `{project-root}/src/api/operations/mutations__generated__`
- `{project-root}/src/api/operations/queries__generated__`

## Resources

- [Read more about the Shopify Storefront API](https://shopify.dev/docs/storefront-api/getting-started)
- [Read more about creating new Metadata fields](https://shopify.dev/tutorials/retrieve-metafields-with-storefront-api)
- [Read more about TypeScript GraphQL Code Generator](https://www.apollographql.com/blog/tooling/apollo-codegen/typescript-graphql-code-generator-generate-graphql-types/)
