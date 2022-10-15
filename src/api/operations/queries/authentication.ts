import {gql} from '@apollo/client';

/**
 * Query cache for access token. This is reactive.
 */
export const AUTHENTICATION = gql`
  query authentication {
    accessToken @client
  }
`;
