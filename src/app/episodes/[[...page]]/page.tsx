import EpisodeCard from "@/components/Episode/EpisodeCard"
import Pagination from "@/components/Episode/Pagination"
import Container from "@/components/layout/Container"
import { PER_PAGE } from "@/constants"
import { parseEpisode, sortByEpisodesNumberDesc } from "@/lib/wordpress/parser"
import { findEpisodes } from "@/queries/episodes/loadEpisodes"
import { EpisodeType, WordpressEpisodeType } from "@/types"
// import { loadEpisodes } from "@/queries/episodes/loadEpisodes"

export const revalidate = 3600

export interface PageProps {
  params: {
    page?: string
  }
}

interface LoadEpisodeType {
  count: number
  episodes: EpisodeType[]
  totalPages: number
}

interface FindEpisodesType {
  data: {
    episodes: {
      nodes: WordpressEpisodeType[]
    }
  }
}

// Testing to see if `fetch` directly in a page.tsx route will cause it to cache correctly
const loadEpisodes = async ({
  count = PER_PAGE,
  offset = 0,
  sortBy = sortByEpisodesNumberDesc,
  filterBy = (a: EpisodeType) => a,
}: {
  count?: number
  offset?: number
  sortBy?: any
  filterBy?: any
}): Promise<LoadEpisodeType> => {
  // Get evey episode
  const response: FindEpisodesType = await fetch(String(process.env.WP_NEXTBITS_GRAPHQL_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${String(process.env.WP_NEXTBITS_TOKEN)}`,
    },
    next: {
      revalidate: 3600
    },
    body: JSON.stringify({
      query: findEpisodes,
      variables: {
        count, offset
      },
    }),
  }).then((res) => res.json())

  // Converts every episode from Wordpress Format to local type
  const allEpisodes:EpisodeType[] = response.data.episodes.nodes.map((wordpressEpisode: WordpressEpisodeType) => parseEpisode(wordpressEpisode))

  // Filter and sort these to the given parameters
  const matchingEpisodes = allEpisodes.filter(filterBy).sort(sortBy)

  // Get the current page worth of Episodes
  const episodes = [...matchingEpisodes.slice(offset, offset + count)]

  return {
    count: matchingEpisodes.length,
    episodes,
    totalPages: Math.ceil(matchingEpisodes.length / count),
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