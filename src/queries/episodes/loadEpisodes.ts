import { gql } from "graphql-tag"
import { getClient } from "@/lib/apollo/serverClient"
import { EpisodeType, WordpressEpisodeType } from '@/types'
import { PER_PAGE } from "@/contants"
import { parseEpisode, sortByEpisodesNumberDesc } from "@/lib/wordpress/wordpressClient"

export const findEpisodes = gql`
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
  const result = await getClient().query({
    query: findEpisodes,
    variables: { count, offset },
  });

  // Converts every episode from Wordpress Format to local type
  const allEpisodes = result.data.episodes.nodes.map((wordpressEpisode: WordpressEpisodeType) => parseEpisode(wordpressEpisode))

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
