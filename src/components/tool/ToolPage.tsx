import { ToolType } from "@/types";
import Container from "../layout/Container";
import PostCards from "../posts/PostCards";
import utils from "@/styles/modules/utilities.module.css";
import Link from "next/link";

export default function ToolPage({tool}:{tool:ToolType}) {
  return (
    <Container>
      <Link href="/tools" className={utils.secondary}>← Back to Tools</Link>
      <h1>{tool.title}</h1>
      <PostCards posts={tool.levels} />
    </Container>
  )
}