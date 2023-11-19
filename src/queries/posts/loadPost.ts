import { gql } from 'graphql-request'
import { PostType, WordpressPostType } from '@/types'
import { parsePost } from "@/lib/wordpress/parser"
import { wordpressClient } from "@/lib/wordpress/client"
import { PostFragment } from "./fragments"
import { unstable_cache } from "next/cache"
import { getPosts } from "./loadPosts"

export const findPost = gql`
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


const loadPostByLevelNumber = async (levelNumber: number): Promise<PostType | null> => {
  const { posts } = await getPosts({
    filterBy: (post:PostType) => (post.levelInformation.levelNumber === levelNumber)
  })

  return posts[0]  
}

export const loadPost = async (slug: string): Promise<PostType | null> => {
  let number = parseInt(slug)
  if(number.toString().length === slug.length) {
    return loadPostByLevelNumber(number)
  }

  const response = await wordpressClient.request<FindPostsType>(findPost, {
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
  if (Boolean(process.env.USE_CACHE)) {
    return getCachedPost(slug)
  } else {
    return loadPost(slug)
  }
}