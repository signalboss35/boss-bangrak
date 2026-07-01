import Head from 'next/head'
import styles from './contact.module.css'

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>ติดต่อ — บอส บางรัก</title>
        <meta name="description" content="ติดต่อร้านบอส บางรัก พระเครื่องคัดคุณภาพ" />
      </Head>

      <div className={styles.page}>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>Contact · ติดต่อ</p>
          <h1 className={styles.title}>สอบถามและติดต่อ</h1>
          <p className={styles.sub}>
            ยินดีให้คำปรึกษา และตอบทุกข้อสงสัย<br />
            ติดต่อเราได้ทุกช่องทาง
          </p>
        </div>

        <div className={styles.cards}>
          {/* LINE */}
          <a
            href="https://line.me/ti/p/signalboss35"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.iconWrap} style={{ background: '#06C755' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardLabel}>LINE</p>
              <p className={styles.cardValue}>signalboss35</p>
              <p className={styles.cardNote}>ติดต่อ · สอบถาม · ส่งรูปพระ</p>
            </div>
            <div className={styles.cardArrow}>→</div>
          </a>

          {/* Tel */}
          <a
            href="tel:+66XXXXXXXXX"
            className={styles.card}
          >
            <div className={styles.iconWrap} style={{ background: 'var(--charcoal)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardLabel}>โทรศัพท์</p>
              <p className={styles.cardValue}>0960909060</p>
              <p className={styles.cardNote}>จันทร์ – เสาร์ · 09.00 – 18.00 น.</p>
            </div>
            <div className={styles.cardArrow}>→</div>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/AmuletBangRak"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.iconWrap} style={{ background: '#1877F2' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardLabel}>Facebook</p>
              <p className={styles.cardValue}>บอส บางรัก</p>
              <p className={styles.cardNote}>ติดตามสินค้าใหม่ · ข่าวสาร</p>
            </div>
            <div className={styles.cardArrow}>→</div>
          </a>
        </div>

        {/* Note */}
        <div className={styles.note}>
          <div className={styles.noteLine} />
          <p className={styles.noteText}>
            ทุกการสอบถามยินดีตอบกลับโดยเร็ว<br />
            มีบริการจัดส่งทั่วประเทศและต่างประเทศ
          </p>
          <div className={styles.noteLine} />
        </div>
      </div>
    </>
  )
}
