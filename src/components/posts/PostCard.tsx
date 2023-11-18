import { PostType } from "@/types";
import Link from "next/link";
import styles from '@/styles/modules/Posts.module.css'
import utils from "@/styles/modules/utilities.module.css"


export default function PostCard({post}:{post:PostType}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <p>level {post.levelInformation.levelNumber}</p>
        <div className={utils.flexGrow}>
          <p>
            <Link href={post.url}>
              {post.title}
            </Link>
          </p>
          <p>{post.excerpt}</p>
          <ul>
            {post.tags.map((tag) => <li key={`${post.slug}-${tag.slug}`}>#{tag.name}</li>)}
          </ul>
        </div>
        <p className="footer">{post.modifedDate.toLocaleString()}</p>
      </div>
    </div>
  )
}