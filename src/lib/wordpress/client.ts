import { GraphQLClient } from "graphql-request"

export const wordpressClient = new GraphQLClient(String(process.env.WP_NEXTBITS_GRAPHQL_URL), {
  headers: {
    authorization: `Basic ${String(process.env.WP_NEXTBITS_TOKEN)}`,
  }
})
