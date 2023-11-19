import { gql } from 'graphql-request'
import { PostType, WordpressPostType } from '@/types'
import { PER_PAGE } from "@/constants"
import { parsePost, sortByLevelNumberDesc } from "@/lib/wordpress/parser"
import { wordpressClient } from "@/lib/wordpress/client"
import { PostListFragment } from "./fragments"
import { unstable_cache } from "next/cache"

export const findPosts = gql`
${PostListFragment}
query GetPosts($where: RootQueryToPostConnectionWhereArgs) {
  posts(first: 1000, where: $where) {
    nodes {
      ...PostListFragment
    }
  }
}
`

interface FindPostsType {
  posts: {
    nodes: WordpressPostType[]
  }
}

interface LoadPostType {
  count: number
  posts: PostType[]
  totalPages: number
}
export interface loadPostsType {
  count?: number
  offset?: number
  sortBy?: any
  filterBy?: any
}
export const loadPosts = async ({
  count = PER_PAGE,
  offset = 0,
  sortBy = sortByLevelNumberDesc,
  filterBy = (a: PostType) => a,
}: loadPostsType): Promise<LoadPostType> => {
  // Get evey episode
  const response = await wordpressClient.request<FindPostsType>(findPosts, {
    variables: { count, offset },
  });

  // Converts every episode from Wordpress Format to local type
  const allPosts:PostType[] = response.posts.nodes.map((wordpressEpisode: WordpressPostType) => parsePost(wordpressEpisode))

  // Filter and sort these to the given parameters
  const matchingPosts = allPosts.filter(filterBy).sort(sortBy)

  // Get the current page worth of Episodes
  const posts = [...matchingPosts.slice(offset, offset + count)]

  return {
    count: matchingPosts.length,
    posts,
    totalPages: Math.ceil(matchingPosts.length / count),
  }
}


export const getCachedPosts = unstable_cache(
  async (params: loadPostsType) => loadPosts(params),
  ["getCachedPosts"],
  {
    tags: ["posts"],
  }
);

export const getPosts = (params: loadPostsType) => {
  if (Boolean(process.env.USE_CACHE)) {
    return getCachedPosts(params)
  } else {
    return loadPosts(params)
  }
}