import { GraphQLClient } from "graphql-request"
import { cache } from "react"

export const wordpressClient = new GraphQLClient(String(process.env.WP_NEXTBITS_GRAPHQL_URL), {
  headers: {
    authorization: `Basic ${String(process.env.WP_NEXTBITS_TOKEN)}`,
  },
  fetch: cache(async (url: any, params: RequestInit | undefined) =>
    fetch(url, { ...params, cache: "force-cache", next: { revalidate: 600 } })
  ),
})
