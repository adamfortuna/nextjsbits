import { LevelLinkType, PostType } from "@/types";
import styles from '@/styles/modules/Sidebar.module.css'
import { extractHost } from "@/lib/wordpress/utils";
import { LinkSolid } from "@/components/svgs/icons";

function Link({link}:{link:LevelLinkType}) {
  const linkDomain = extractHost(link.url)

  return (
    <li className={styles.linkWrapper}>
      <a className={styles.link} href={link.url}>
        <LinkSolid  />
        <span>
          <span className="text">{link.title}</span>
          <span className="url">
            {linkDomain}
          </span>
        </span>
      </a>
    </li>
  )
}
export default function Links({post}:{post:PostType}) {
  const { links } = post.levelInformation
  if(!links || links.length === 0) {
    return false
  }

  return (
    <aside className={styles.info}>
      <h3 className={styles.infoHeader}>Links</h3>
      <ul className={styles.linkList}>
        {links.map((link) => (
          <Link link={link} key={link.url} />
        ))}
      </ul>
    </aside>
  )
}