import EpisodeCard from "@/components/Episode/EpisodeCard"
import Pagination from "@/components/Episode/Pagination"
import Container from "@/components/layout/Container"
import { PER_PAGE } from "@/constants"
import { loadEpisodes } from "@/queries/episodes/loadEpisodes"
import { unstable_cache } from "next/cache"

export interface PageProps {
  params: {
    page?: string
  }
}

const getCachedEpisodes = unstable_cache(
  async (start) => loadEpisodes({ offset: start }),
  ['episodes'],
  {
    tags: ["episode", "episodes"],
  }
);

export default async function EpisodeIndexPage({ params: { page } }: PageProps) {
  const pageNumber = page ? Number(page) : 1
  const start = (pageNumber - 1) * PER_PAGE
  const { episodes, totalPages } = await getCachedEpisodes(start);

  return (
    <Container>
      {episodes.map((episode) => <EpisodeCard episode={episode} key={episode.title} /> )}

      <Pagination page={pageNumber} totalPages={totalPages} url="/episodes" />
    </Container>
  )
}