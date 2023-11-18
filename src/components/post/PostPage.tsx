import { PostType } from "@/types"
import styles from '@/styles/modules/Post.module.css'
import PostContent from "@/components/post/PostContent"
import PostSidebar from "@/components/post/PostSidebar"


export default function PostPage({post}:{post:PostType}) {
  return (
    <article className={`container ${styles.wrapper}`}>
      <PostSidebar post={post} />
      <PostContent post={post} />
    </article>
  )
}