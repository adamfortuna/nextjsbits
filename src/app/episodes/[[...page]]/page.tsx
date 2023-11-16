import EpisodeCard from "@/components/Episode/EpisodeCard"
import Pagination from "@/components/Episode/Pagination"
import Container from "@/components/layout/Container"
import { PER_PAGE } from "@/constants"
import { loadEpisodes } from "@/queries/episodes/loadEpisodes"

export const revalidate = 3600

export interface PageProps {
  params: {
    page?: string
  }
}

export default async function EpisodeIndexPage({ params: { page } }: PageProps) {
  const pageNumber = page ? Number(page) : 1
  const start = (pageNumber - 1) * PER_PAGE
  const { episodes, totalPages } = await loadEpisodes({ offset: start });

  return (
    <Container>
      {episodes.map((episode) => <EpisodeCard episode={episode} key={episode.title} /> )}

      <Pagination page={pageNumber} totalPages={totalPages} url="/episodes" />
    </Container>
  )
}