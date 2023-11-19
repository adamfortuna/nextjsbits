import { PostType } from "@/types";
import Link from "next/link";
import styles from '@/styles/modules/Posts.module.css'
import { FlagSharpSolid } from "../svgs/icons";


export default function PostCard({post}:{post:PostType}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <p className={styles.level}>
          <FlagSharpSolid />
          <span>{post.levelInformation.levelNumber}</span>
        </p>
        <div className={styles.main}>
          <p>
            <Link href={post.url} className={styles.link}>
              {post.title}
            </Link>
          </p>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <ul className={styles.tags}>
            {post.tags.map((tag) => <li key={`${post.slug}-${tag.slug}`}>#{tag.name}</li>)}
          </ul>
        </div>
        <p className={styles.footer}>
          {post.modifedDate.toLocaleDateString(undefined, {
          dateStyle: "medium",
        })}
        </p>
      </div>
    </div>
  )
}
