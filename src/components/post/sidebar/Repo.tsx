
import { LevelRepositoryType, PostType } from "@/types";
import styles from '@/styles/modules/Sidebar.module.css'
import { extractRepo } from "@/lib/wordpress/utils";
import { GitHubIcon } from "@/components/svgs/icons";

function Repository({repository}:{repository:LevelRepositoryType}) {
  const repoPair = extractRepo(repository.url)

  return (
    <li className={styles.linkWrapper}>
      <a className={styles.link} href={repository.url}>
        <GitHubIcon />
        <span>
          <span>{repository.title}</span>
          <span>{repoPair}</span>
        </span>
      </a>
    </li>
  )
}
export default function Repos({post}:{post:PostType}) {
  const { repositories } = post.levelInformation
  if(!repositories || repositories.length === 0) {
    return false
  }

  return (
    <aside className={styles.info}>
      <h3 className={styles.infoHeader}>Code Repository</h3>
      <ul className={styles.linkList}>
        {repositories.map((repository) => (
          <Repository repository={repository} key={repository.url} />
        ))}
      </ul>
    </aside>
  )
}