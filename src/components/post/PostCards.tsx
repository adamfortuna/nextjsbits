import { PostType } from "@/types";
import PostCard from "./PostCard";
import styles from './PostCard.module.css'

export default function PostCards({posts}:{posts:PostType[]}) {
  
  return (
    <div className={styles.cards}>
      {posts.map((post) => <PostCard post={post} key={post.slug} /> )}
    </div>
  )
}