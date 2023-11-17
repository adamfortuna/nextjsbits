import { PostType } from "@/types";
import styles from './PostCard.module.css'
import Demo from "./sidebar/Demo";

export default function PostSidebar({post}:{post:PostType}) {
  return (
    <div className={styles.sidebar}>
      <Demo post={post} />
    </div>
  )
}