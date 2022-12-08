import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Link href='/test/it' prefetch={false} className={styles.link}>
          This will return 404 (<code>/test/it</code>)
        </Link>
        <Link href='/test/it' prefetch={false} className={styles.link}>
          This will render this page (<code>/test/en</code>)
        </Link>
      </main>
    </div>
  )
}