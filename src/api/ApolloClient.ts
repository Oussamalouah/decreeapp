import {ApolloClient, InMemoryCache} from '@apollo/client';

export const decreeBaseURL = 'https://decree-co.myshopify.com';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {},
  },
});

export const client = new ApolloClient({
  uri: `${decreeBaseURL}/api/2021-07/graphql.json`,
  headers: {
    // Storefront API access tokens are not secret.
    // You can place them in a JavaScript file or any public HTML document.
    'X-Shopify-Storefront-Access-Token': 'c12419cb83b462de441542675a8da367',
    Accept: 'application/graphql',
  },
  cache: cache,
});
