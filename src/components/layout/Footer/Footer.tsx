import Link from "next/link"
import list from "@/styles/modules/list.module.css"
import text from "@/styles/modules/text.module.css"
import styles from "./Footer.module.css";
import Container from "../Container"

export default function Footer() {
  return (
    <Container className={styles.footer}>
      <p className={text.secondary}>
        Made with ♥️ by{' '}
        <a href="https://adamfortuna.com" target="_blank">
          Adam Fortuna.
        </a>
      </p>
      
      <nav>
        <nav>
          <ul className={list.inline}>
            <li>
              <Link href="/about" className={styles.link}>About</Link>
            </li>
            <li>
              <Link href="/sponsor" className={styles.link}>Sponsor</Link>
            </li>
            <li>
              <Link href="/showcase" className={styles.link}>Showcase</Link>
            </li>
          </ul>
        </nav>
      </nav>
    </Container>
  )
}
