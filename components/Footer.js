import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.name}>บอส บางรัก</span>
          <span className={styles.sub}>Boss BangRak · พระเครื่องคัดคุณภาพ</span>
        </div>
        <p className={styles.copy}>© {new Date().getFullYear()} Boss BangRak. สงวนลิขสิทธิ์ทุกประการ</p>
      </div>
    </footer>
  )
}
