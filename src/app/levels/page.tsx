import PostsPage from "@/components/posts/PostsPage";
import { getPosts } from "@/queries/posts/loadPosts"



export default async function PostIndexPage() {
  const { posts } = await getPosts({ offset: 0, count: 1000 });

  return <PostsPage posts={posts} />
}