import { Md5 } from 'ts-md5'

export const fetchClient = ({
  url,
  auth,
  query,
  variables = {},
}: {
  url: string
  auth: string
  query: string
  variables?: any
}) => {
  const hash = Md5.hashStr(
    JSON.stringify({
      ...{
        url,
        query,
        auth,
      },
      ...variables,
    }),
  )
  return fetch(`${url}#${hash})}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json())
}

export const wordpressClient = ({ query, variables = {} }: { query: string; variables?: any }) => {
  return fetchClient({
    url: String(process.env.WP_NEXTBITS_GRAPHQL_URL),
    auth: `Basic ${String(process.env.WP_NEXTBITS_TOKEN)}`,
    query,
    variables,
  })
}