import { PostType } from "@/types"
import styles from './sidebar/Sidebar.module.css'
import Demo from "./sidebar/Demo"
import Tools from "./sidebar/Tools"
import Links from "./sidebar/Links"
import LevelNumber from "./sidebar/LevelNumber"

export default function PostSidebar({post}:{post:PostType}) {
  return (
    <div className={styles.sidebar}>
      <h2 className="sr-only">More Information</h2>
      <LevelNumber post={post} />
      <Demo post={post} />
      <Tools post={post} />
      <Links post={post} />
    </div>
  )
}