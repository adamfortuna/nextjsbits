import { LevelDemoType, PostType } from "@/types";
import styles from '@/styles/modules/Sidebar.module.css'
import { extractDomain } from "@/lib/wordpress/utils";
import { LinkSolid } from "@/components/svgs/icons";


function Link({demo}:{demo:LevelDemoType}) {
  const linkDomain = extractDomain(demo.url)

  return (
    <li className={styles.linkWrapper}>
      <a className={`${styles.link} ${styles.linkFeatured}`} href={demo.url} target="_blank">
        <LinkSolid />
        <span>
          <span>{demo.title}</span>
          <span>{linkDomain}</span>
        </span>
      </a>
    </li>
  )
}

export default function Demos({post}:{post:PostType}) {
  const { demos } = post.levelInformation
  if(!demos || demos?.length === 0) {
    return false
  }

  return (
    <aside className={styles.info}>
      <h3>Demo</h3>
      <ul className={styles.linkList}>
        {demos.map((demo) => (
          <Link demo={demo} key={demo.url} />
        ))}
      </ul>
    </aside>
  )
}