import { LevelToolType, PostType } from "@/types";
import styles from './Sidebar.module.css'
import Link from "next/link";

function Tool({tool}:{tool:LevelToolType}) {
  return (
    <div className={styles.tool}>
      <Link href={`/tool/${tool.tool.slug}`} className={styles.toolTitle}>
        {tool.tool.title}
      </Link>
      <span className={styles.toolSpacer}></span>
      <p className={styles.toolVersion}>
        {tool.version}
      </p>
    </div>
  )
}
export default function Tools({post}:{post:PostType}) {
  const { tools } = post.levelInformation
  if(!tools || tools.length === 0) {
    return false
  }

  return (
    <aside className={styles.info}>
      <h3 className={styles.infoHeader}>Tools</h3>
      {tools.map((tool) => (
        <Tool tool={tool} key={tool.tool.slug} />
      ))}
    </aside>
  )
}