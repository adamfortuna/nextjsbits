import Link from "next/link"
import styles from './HeaderNavigation.module.css'
import list from "@/styles/modules/list.module.css"
import Container from "../Container"

export default function HeaderNavigation() {
  return (
    <Container>
      <div className={styles.nav}>
        <Link href="/" className={styles.title}>
          Next.js Bits
        </Link>
        
        <nav>
          <nav>
            <ul className={list.inline}>
              <li>
                <Link href="/levels" className={styles.navLink}>Levels</Link>
              </li>
              <li>
                <Link href="/" className={styles.navLink}>Toolbox</Link>
              </li>
            </ul>
            <button type="button" className={styles.search}>
              Search
            </button>
          </nav>
        </nav>
      </div>
    </Container>
  )
}
