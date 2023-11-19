import Link from "next/link"
import styles from '@/styles/modules/HeaderNavigation.module.css'
import utils from "@/styles/modules/utilities.module.css"
import Container from "./Container"
import ThemeSwitcher from "./ThemeSwitcher"

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
                <Link href="/tools" className={styles.navLink}>Tools</Link>
              </li>
              <li>
                <ThemeSwitcher />
              </li>
            </ul>
          </nav>
        </nav>
      </div>
    </Container>
  )
}
