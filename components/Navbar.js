import Link from 'next/link'
import { useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoTh}>บอส บางรัก</span>
          <span className={styles.logoEn}>Boss BangRak</span>
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? styles.lineOpen : styles.line}></span>
          <span className={menuOpen ? styles.lineOpen2 : styles.line}></span>
          <span className={menuOpen ? styles.lineOpen3 : styles.line}></span>
        </button>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <li><Link href="/" onClick={() => setMenuOpen(false)}>คลังพระ</Link></li>
          <li><Link href="/?tier=Masterpiece" onClick={() => setMenuOpen(false)}>Masterpiece</Link></li>
          <li><Link href="/?tier=Premium" onClick={() => setMenuOpen(false)}>Premium</Link></li>
          <li><Link href="/?tier=Standard" onClick={() => setMenuOpen(false)}>Standard</Link></li>
          <li><Link href="/contact" onClick={() => setMenuOpen(false)}>ติดต่อ</Link></li>
        </ul>
      </div>
    </nav>
  )
}
