import Container from "@/components/layout/Container"
import ToolCards from "@/components/tools/ToolCards"
import { getTools } from "@/queries/tools/loadTools"

export const revalidate = 3600
export const dynamic = 'force-static'

export default async function ToolboxIndexPage() {
  const { tools } = await getTools()

  return (
    <Container>
      <h1>Tools</h1>

      <ToolCards tools={tools} />
    </Container>
  )
}