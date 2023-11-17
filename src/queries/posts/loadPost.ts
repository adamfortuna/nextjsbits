import { gql } from 'graphql-request'
import { PostType, WordpressPostType } from '@/types'
import { parsePost } from "@/lib/wordpress/parser"
import { wordpressClient } from "@/lib/wordpress/client"
import { PostFragment } from "./fragments"
import { unstable_cache } from "next/cache"

export const findPosts = gql`
${PostFragment}
query GetPost($slug: String!) {
  post: postBy(slug: $slug) {
    ...PostFragment
  }
}
`

interface FindPostsType {
  post: WordpressPostType
}

export const loadPost = async (slug: string): Promise<PostType | null> => {
  const response = await wordpressClient.request<FindPostsType>(findPosts, {
    slug,
  })

  return response.post ? parsePost(response.post) : null
}


export const getCachedPost = unstable_cache(
  async (slug: string) => loadPost(slug),
  ["posts"],
  {
    tags: ["posts"],
  }
);

export const getPost = (slug: string) => {
  if (process.env.NODE_ENV === "production") {
    return getCachedPost(slug)
  } else {
    return loadPost(slug)
  }
}