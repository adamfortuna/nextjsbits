import { EpisodeType, WordpressEpisodeType } from '@/types'
import { PER_PAGE } from "@/constants"
import { parseEpisode, sortByEpisodesNumberDesc } from "@/lib/wordpress/parser"
import { wordpressClient } from "@/lib/wordpress/client"
import EpisodeListFragment from "@/queries/fragments/EpisodeListFragment"

export const findEpisodes = `
${EpisodeListFragment}
query GetEpisodes($where: RootQueryToEpisodeConnectionWhereArgs) {
  episodes(first: 1000, where: $where) {
    nodes {
      ...EpisodeListFragment
    }
  }
}
`

interface LoadEpisodeType {
  count: number
  episodes: EpisodeType[]
  totalPages: number
  
}
export const loadEpisodes = async ({
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
  // Gets evey episode
  const result = await wordpressClient({
    query: findEpisodes,
    variables: { count, offset },
  });

  console.log(result.errors)

  // Converts every episode from Wordpress Format to local type
  const allEpisodes:EpisodeType[] = result.data.episodes.nodes.map((wordpressEpisode: WordpressEpisodeType) => parseEpisode(wordpressEpisode))

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
