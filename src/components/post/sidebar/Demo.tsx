import { LevelDemoType, LevelToolType, PostType } from "@/types";
import styles from './Sidebar.module.css'
import { extractHost } from "@/lib/wordpress/utils";


function Link({demo}:{demo:LevelDemoType}) {
  const linkDomain = extractHost(demo.url)

  return (
    <li className={styles.Wrapper}>
      <a className={`${styles.linkLink} ${styles.linkFeatured}`} href={demo.url}>
        <span className={styles.linkText}>{demo.title}</span>
        <span className={styles.linkUrl}>
          {linkDomain}
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