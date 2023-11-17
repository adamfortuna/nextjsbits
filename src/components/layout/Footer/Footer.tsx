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
      
      <nav style={{display: "none"}}>
        <nav>
          <ul className={list.inline}>
            <li>
              <Link href="/" className={styles.link}>About</Link>
            </li>
            <li>
              <Link href="/" className={styles.link}>Sponsor</Link>
            </li>
            <li>
              <Link href="/" className={styles.link}>Showcase</Link>
            </li>
          </ul>
        </nav>
      </nav>
    </Container>
  )
}
