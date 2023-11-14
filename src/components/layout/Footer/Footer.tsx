import Link from "next/link"
import list from "@/styles/modules/list.module.css"
import Container from "../Container"

export default function Footer() {
  return (
    <Container>
      <p>
        Made with ♥️ by{' '}
        <a href="https://adamfortuna.com" target="_blank">
          Adam Fortuna.
        </a>
      </p>
      
      <nav>
        <nav>
          <ul className={list.inline}>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/sponsor">Sponsor</Link>
            </li>
            <li>
              <Link href="/showcase">Showcase</Link>
            </li>
          </ul>
        </nav>
      </nav>
    </Container>
  )
}
