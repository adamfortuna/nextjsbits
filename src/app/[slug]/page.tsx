import Container from "@/components/layout/Container";
import { getPost } from "@/queries/posts/loadPost";
import { getPosts } from "@/queries/posts/loadPosts";
import { notFound } from "next/navigation";

export interface PageProps {
  params: {
    slug: string
  }
}

export default async function SinglePostPage({ params: { slug } }: PageProps) {
  const post = await getPost(slug);

  if(!post) {
    notFound()
  }

  return (
    <Container>
      <main>
        <p>{post.title}</p>

        <div dangerouslySetInnerHTML={{ __html: String(post.content)}}>

        </div>
      </main>
    </Container>
  )
}

export async function generateStaticParams() {
  const { posts } = await getPosts({ offset: 0 });

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
