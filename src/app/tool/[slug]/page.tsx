import ToolPage from "@/components/tool/ToolPage";
import { getTool } from "@/queries/tools/loadTool";
import { getTools } from "@/queries/tools/loadTools";
import { notFound } from "next/navigation";

export const revalidate = 3600
export const dynamic = 'force-static'

export interface PageProps {
  params: {
    slug: string
  }
}

export default async function SingleToolPage({ params: { slug } }: PageProps) {
  let tool = await getTool(slug)

  if(!tool) {
    notFound()
  }

  return <ToolPage tool={tool} />
}

export async function generateStaticParams() {
  const { tools } = await getTools()

  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}
