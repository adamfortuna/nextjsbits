import Link from "next/link"
import utils from "@/styles/modules/utilities.module.css"
import Container from "./Container"

export default function Footer() {
  return (
    <Container>
      <p className={utils.secondary}>
        Made with ♥️ by{' '}
        <a href="https://adamfortuna.com" target="_blank">
          Adam Fortuna.
        </a>
      </p>
      
      <nav style={{display: "none"}}>
        <nav>
          <ul className={utils.inline}>
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/">Sponsor</Link>
            </li>
            <li>
              <Link href="/">Showcase</Link>
            </li>
          </ul>
        </nav>
      </nav>
    </Container>
  )
}
