import { ToolType } from "@/types";
import styles from "@/styles/modules/list.module.css"
import ToolCard from "./ToolCard";

export default function ToolCards({tools}:{tools:ToolType[]}) {
  return (
    <ul className={styles.linkList}>
      {tools.map((tool) => (
        <ToolCard tool={tool} key={tool.slug} />
      ))}
    </ul>
  )
}