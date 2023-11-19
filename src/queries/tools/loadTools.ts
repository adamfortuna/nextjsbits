import { gql } from 'graphql-request'
import { ToolType, WordpressToolType } from '@/types'
import { parseTool, sortByTitleAsc } from "@/lib/wordpress/parser"
import { wordpressClient } from "@/lib/wordpress/client"
import { unstable_cache } from "next/cache"
import { ToolListFragment } from "./fragments"

export const findTools = gql`
${ToolListFragment}
query GetTools {
  tools(first: 1000) {
    nodes {
      ...ToolListFragment
    }
  }
}
`

interface FindToolsType {
  tools: {
    nodes: WordpressToolType[]
  }
}

interface LoadToolType {
  count: number
  tools: ToolType[]
  totalPages: number
}
export interface loadPostsType {
  count?: number
  offset?: number
  sortBy?: (a: ToolType, b:ToolType) => number
  filterBy?: (tools: ToolType) => boolean
}
export const loadTools = async ({
  count = 1000,
  offset = 0,
  sortBy = sortByTitleAsc,
  filterBy = (a: ToolType) => true,
}: loadPostsType): Promise<LoadToolType> => {
  // Get evey episode
  const response = await wordpressClient.request<FindToolsType>(findTools, {
    variables: { count, offset },
  });

  // Converts every episode from Wordpress Format to local type
  const allTools:ToolType[] = response.tools.nodes.map((wordpressTool: WordpressToolType) => parseTool(wordpressTool))

  // Filter and sort these to the given parameters
  const matchingTools = allTools.filter(filterBy).sort(sortBy)

  // Get the current page worth of Episodes
  const tools = [...matchingTools.slice(offset, offset + count)]

  return {
    count: matchingTools.length,
    tools,
    totalPages: Math.ceil(matchingTools.length / count),
  }
}


export const getCachedTools = unstable_cache(
  async (params?: LoadToolType) => loadTools(params || {}),
  ["tools"],
  {
    tags: ["tools"],
  }
);

export const getTools = (params?: LoadToolType) => {
  if (Boolean(process.env.USE_CACHE)) {
    return getCachedTools(params)
  } else {
    return loadTools(params || {})
  }
}