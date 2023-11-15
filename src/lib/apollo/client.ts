import { HttpLink } from "@apollo/client/link/http"
import { setContext } from "@apollo/client/link/context"
import { NextSSRApolloClient } from "@apollo/experimental-nextjs-app-support/ssr"
import cache from "./cache"

export const makeClient = () => {
  const ssrConnection = new HttpLink({
    uri: process.env.WP_NEXTBITS_GRAPHQL_URL
  });

  const ssrLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        ...{ "Authorization": `Basic ${String(process.env.WP_NEXTBITS_TOKEN)}` },
      },
    };
  });

  const link =  ssrLink.concat(ssrConnection)

  return new NextSSRApolloClient({
    ssrMode: true,
    link,
    cache,
  });
};