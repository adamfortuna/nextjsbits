import { PostType } from "@/types";
import styles from './Sidebar.module.css'
import { MushroomSharpSolid } from "@/components/svgs/icons";


export default function LevelNumber({post}:{post:PostType}) {
  const { levelNumber } = post.levelInformation

  return (
    <aside className={styles.levelNumber}>
      <MushroomSharpSolid className={styles.levelIcon} />
      <span className={styles.levelNumberNumber}>{levelNumber}</span>
    </aside>
  )
}