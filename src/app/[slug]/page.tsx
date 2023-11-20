import '@/styles/code.css'
import PostPage from "@/components/post/PostPage";
import { getPost } from "@/queries/posts/loadPost";
import { getPosts } from "@/queries/posts/loadPosts";
import { notFound, redirect } from "next/navigation";

export const revalidate = 3600
export const dynamic = 'force-static'

export interface PageProps {
  params: {
    slug: string
  }
}

export default async function SinglePostPage({ params: { slug } }: PageProps) {
  let post = await getPost(slug);

  if (post && post?.slug !== slug) {
    redirect(`/${post.slug}`)
  }

  if(!post) {
    notFound()
  }

  return <PostPage post={post} />
}

export async function generateStaticParams() {
  const { posts } = await getPosts({ offset: 0 });

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
