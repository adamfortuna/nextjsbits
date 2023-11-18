import { LevelDemoType, LevelToolType, PostType } from "@/types";
import styles from './Sidebar.module.css'
import { extractDomain } from "@/lib/wordpress/utils";
import { LinkSolid } from "@/components/svgs/icons";


function Link({demo}:{demo:LevelDemoType}) {
  const linkDomain = extractDomain(demo.url)

  return (
    <li className={styles.linkWrapper}>
      <a className={`${styles.linkLink} ${styles.linkFeatured}`} href={demo.url} target="_blank">
        <LinkSolid className={styles.linkIcon} />
        <span className={styles.linkLinkText}>
          <span className={styles.linkText}>{demo.title}</span>
          <span className={`${styles.linkUrl} ${styles.linkUrlFeatured}`}>
            {linkDomain}
          </span>
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
      <h3 className={styles.infoHeader}>Demo</h3>
      <ul className={styles.linkList}>
        {demos.map((demo) => (
          <Link demo={demo} key={demo.url} />
        ))}
      </ul>
    </aside>
  )
}