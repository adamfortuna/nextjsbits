import Container from "@/components/layout/Container"
import Image from "next/image"
import styles from "@/styles/modules/home.module.css"
import utils from "@/styles/modules/utilities.module.css";
import Link from "next/link";
import { TriangleSolid } from "@/components/svgs/icons";

export default function Home() {
  return (
    <Container>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>
            Learn Next.js in{' '}<br/>
            <span>
              Bits & Bytes
            </span>
          </h1>
          <p>
            Quick tutorials to the most common Next.js questions.
          </p>

          <div>
            <ul className={styles.select}>
              <li>
                <Link href="/levels">
                  <TriangleSolid />
                  Choose a Level
                </Link>
              </li>
              <li>
                <Link href="/tools">
                  <TriangleSolid />
                  Pick a Tool
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Image src="/images/tree.png" height={500} width={500} className={styles.heroImage} alt="Coder programming under a tree" />
      </main>
    </Container>
  )
}
