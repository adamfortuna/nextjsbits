import { LevelContents, PostType } from "@/types";
import styles from '@/styles/modules/Sidebar.module.css'

function Content({content, index}:{index:number, content:LevelContents}) {

  return (
    <li className={styles.linkWrapper}>
      <a className={styles.tocLink} href={content.anchor}>
        <span className={styles.tocNumber}>{index}.</span>
        <span>{content.title}</span>
      </a>
    </li>
  )
}
export default function TableOfContents({post}:{post:PostType}) {
  const { tableOfContents } = post.levelInformation
  if(!tableOfContents || tableOfContents.length === 0) {
    return false
  }

  return (
    <aside className={`${styles.info} ${styles.toc}`}>
      <h3 className={styles.infoHeader}>Table of Contents</h3>
      <ul className={styles.linkList}>
        {tableOfContents.map((content, index) => (
          <Content content={content} index={index+1} key={content.anchor} />
        ))}
      </ul>
    </aside>
  )
}