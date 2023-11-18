import { ToolType } from "@/types";
import Link from "next/link";

export default function ToolCard({tool}:{tool:ToolType}) {
  return (
    <li>
      <Link href={`/tool/${tool.slug}`}>
        {tool.title}{' '}
        { tool.levelsCount > 0 ? (
          <>({tool.levelsCount})</>
        ) : false}
      </Link>
    </li>
  )
}