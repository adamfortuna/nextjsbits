import { PostType } from "@/types"
import styles from '@/styles/modules/Posts.module.css'
import Container from "../layout/Container"
import PostCards from "./PostCards"

export default function PostsPage({posts}:{posts:PostType[]}) {
  
  return (
    <Container className={styles.container}>
      <div className={styles.levels}>
        <h1>Al Levels</h1>
        <PostCards posts={posts} />
      </div>
      <div className={styles.filter}>
        <h2>Filter Levels</h2>
      </div>
    </Container>
  )
}