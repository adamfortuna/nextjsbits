import { gql } from 'graphql-request'
import { PostType, WordpressPostType } from '@/types'
import { parsePost } from "@/lib/wordpress/parser"
import { wordpressClient } from "@/lib/wordpress/client"
import { PostFragment } from "./fragments"
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


export const getPost = (slug: string) => {
  return loadPost(slug)
}