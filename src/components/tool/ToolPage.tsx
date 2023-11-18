import { ToolType } from "@/types";
import Container from "../layout/Container";
import PostCards from "../posts/PostCards";

export default function ToolPage({tool}:{tool:ToolType}) {
  return (
    <Container>
      <h1>{tool.title}</h1>

      <PostCards posts={tool.levels} />
    </Container>
  )
}