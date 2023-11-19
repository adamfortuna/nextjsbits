import { PostType } from "@/types";
import styles from '@/styles/modules/Sidebar.module.css'
import { FlagSharpSolid } from "@/components/svgs/icons";


export default function LevelNumber({post}:{post:PostType}) {
  const { levelNumber } = post.levelInformation

  return (
    <aside className={styles.levelNumber}>
      <FlagSharpSolid />
      <span>{levelNumber}</span>
    </aside>
  )
}