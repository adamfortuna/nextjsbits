import { PostType } from "@/types"
import PostCard from "./PostCard"
import styles from '@/styles/modules/Posts.module.css'
import Container from "../layout/Container"

export default function PostsPage({posts}:{posts:PostType[]}) {
  
  return (
    <Container className={styles.container}>
      <div className={styles.levels}>
        <h1>Al Levels</h1>
        <div className={styles.cards}>
          {posts.map((post) => <PostCard post={post} key={post.slug} /> )}
        </div>
      </div>
      <div className={styles.filter}>
        <h2>Filter Levels</h2>
      </div>
    </Container>
  )
}