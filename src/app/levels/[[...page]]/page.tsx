import Pagination from "@/components/layout/Pagination"
import Container from "@/components/layout/Container"
import { PER_PAGE } from "@/constants"
import { getPosts } from "@/queries/posts/loadPosts"
import PostCards from "@/components/post/PostCards"

export interface PageProps {
  params: {
    page?: string
  }
}

export default async function PostIndexPage({ params: { page } }: PageProps) {
  const pageNumber = page ? Number(page) : 1
  const start = (pageNumber - 1) * PER_PAGE
  const { posts, totalPages } = await getPosts({ offset: start });

  return (
    <Container>
      <PostCards posts={posts} />

      <Pagination page={pageNumber} totalPages={totalPages} url="/levels" />
    </Container>
  )
}