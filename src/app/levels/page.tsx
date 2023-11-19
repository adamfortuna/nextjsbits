import PostsPage from "@/components/posts/PostsPage";
import { getPosts } from "@/queries/posts/loadPosts"

export const revalidate = 3600
export const dynamic = 'force-static'

export default async function PostIndexPage() {
  const { posts } = await getPosts({ offset: 0, count: 1000 });

  return <PostsPage posts={posts} />
}