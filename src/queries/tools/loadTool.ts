import { gql } from 'graphql-request'
import { ToolType, WordpressToolType } from '@/types'
import { parseTool } from "@/lib/wordpress/parser"
import { wordpressClient } from "@/lib/wordpress/client"
import { ToolFragment } from "./fragments"
import { PostListFragment } from "../posts/fragments"

export const findTool = gql`
${ToolFragment}
${PostListFragment}
query GetTool($slug: String!) {
  tool: toolBy(slug: $slug) {
    ...ToolFragment
  }
}
`

interface FindToolsType {
  tool: WordpressToolType
}

export const loadTool = async (slug: string): Promise<ToolType | null> => {
  const response = await wordpressClient.request<FindToolsType>(findTool, {
    slug,
  })
  return response.tool ? parseTool(response.tool) : null
}

export const getTool = (slug: string) => {
  return loadTool(slug)
}