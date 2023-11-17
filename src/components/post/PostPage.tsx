import { PostType } from "@/types";
import styles from './PostCard.module.css'
import PostContent from "@/components/post/PostContent";
import PostSidebar from "@/components/post/PostSidebar";


export default function PostPage({post}:{post:PostType}) {
  return (
    <article className={`container ${styles.wrapper}`}>
      <PostContent post={post} />
      <PostSidebar post={post} />
    </article>
  )
}