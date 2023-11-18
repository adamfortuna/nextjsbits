import '@/styles/prose.css'
import { PostType } from "@/types";
import styles from '@/styles/modules/Post.module.css'

export default function PostContent({post}:{post:PostType}) {
  return (
    <main className={styles.content}>
      <h1 className={styles.contentHeader}>{post.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: String(post.content)}} />
    </main>
  )
}