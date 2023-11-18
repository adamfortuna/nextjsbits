import Link from "next/link"
import styles from '@/styles/modules/HeaderNavigation.module.css'
import utils from "@/styles/modules/utilities.module.css"
import Container from "./Container"

export default function HeaderNavigation() {
  return (
    <Container>
      <div className={styles.nav}>
        <Link href="/" className={styles.title}>
          Next.js Bits
        </Link>
        
        <nav>
          <nav>
            <ul className={utils.inline}>
              <li>
                <Link href="/levels" className={styles.navLink}>Levels</Link>
              </li>
              <li>
                <Link href="/" className={styles.navLink}>Tools</Link>
              </li>
            </ul>
            {/* <button type="button" className={styles.search}>
              Search
            </button> */}
          </nav>
        </nav>
      </div>
    </Container>
  )
}
