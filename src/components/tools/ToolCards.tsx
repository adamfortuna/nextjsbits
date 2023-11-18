import { ToolType } from "@/types";
import Link from "next/link";
import styles from "@/styles/modules/list.module.css"

function ToolCard({tool}:{tool:ToolType}) {
  return (
    <li>
      <Link href={`/tools/${tool.slug}`}>
        {tool.title}{' '}
        { tool.levelsCount > 0 ? (
          <>({tool.levelsCount})</>
        ) : false}
      </Link>
    </li>
  )
}

export default function ToolCards({tools}:{tools:ToolType[]}) {
  return (
    <ul className={styles.linkList}>
      {tools.map((tool) => (
        <ToolCard tool={tool} key={tool.slug} />
      ))}
    </ul>
  )
}