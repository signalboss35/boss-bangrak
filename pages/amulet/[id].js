import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getAmuletById, getAmulets, getImageUrl } from '../../lib/supabase'
import styles from './[id].module.css'

// Demo data fallback
const DEMO_AMULETS = {
  '1': {
    id: '1',
    name: 'หลวงพ่อโสธร รุ่นแรก',
    temple: 'วัดโสธรวรารามวรวิหาร',
    tier: 'Masterpiece',
    has_certificate: true,
    has_competition_award: true,
    description: 'พระเครื่องรุ่นแรก หล่อด้วยโลหะผสมโบราณ พุทธคุณเด่นทางด้านโชคลาภ เมตตามหานิยม และคุ้มครองภัย ผ่านการตรวจสอบจากผู้เชี่ยวชาญ มีใบรับรองพร้อม',
    images: [],
  },
}

export default function AmuletDetail({ amulet: serverAmulet }) {
  const router = useRouter()
  const { id } = router.query

  // Fallback to demo data
  const amulet = serverAmulet || DEMO_AMULETS[id] || null
  const [activeIdx, setActiveIdx] = useState(0)

  if (router.isFallback) {
    return <div className={styles.loading}>กำลังโหลด...</div>
  }

  if (!amulet) {
    return (
      <div className={styles.notFound}>
        <p>ไม่พบรายการนี้</p>
        <Link href="/" className={styles.backLink}>← กลับหน้าหลัก</Link>
      </div>
    )
  }

  const images = (amulet.images || []).filter(Boolean)
  const hasImages = images.length > 0

  const tierColor = {
    Masterpiece: styles.tierMasterpiece,
    Premium: styles.tierPremium,
    Standard: styles.tierStandard,
  }[amulet.tier] || styles.tierStandard

  return (
    <>
      <Head>
        <title>{amulet.name} — บอส บางรัก</title>
        <meta name="description" content={amulet.description} />
      </Head>

      <div className={styles.page}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">คลังพระ</Link>
          <span>›</span>
          <span>{amulet.tier}</span>
          <span>›</span>
          <span>{amulet.name}</span>
        </div>

        <div className={styles.layout}>
          {/* Image gallery */}
          <div className={styles.gallery}>
            <div className={`${styles.mainImage} ${amulet.tier === 'Masterpiece' ? styles.masterpieceFrame : ''}`}>
              {hasImages ? (
                <Image
                  src={getImageUrl(images[activeIdx])}
                  alt={amulet.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span>✦</span>
                  <p>ไม่มีรูปภาพ</p>
                </div>
              )}
            </div>

            {/* Thumbnails (show if > 1 image) */}
            {images.length > 1 && (
              <div className={styles.thumbRow}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === activeIdx ? styles.thumbActive : ''}`}
                    onClick={() => setActiveIdx(i)}
                  >
                    <Image
                      src={getImageUrl(img)}
                      alt={`รูปที่ ${i + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className={styles.info}>
            {/* Tier + badges */}
            <div className={styles.topMeta}>
              <span className={`${styles.tierLabel} ${tierColor}`}>{amulet.tier}</span>
              {amulet.has_certificate && (
                <span className={styles.metaBadge}>🏅 บัตรรับรอง</span>
              )}
              {amulet.has_competition_award && (
                <span className={`${styles.metaBadge} ${styles.metaBadgeAward}`}>🏆 ใบประกาศ</span>
              )}
            </div>

            <h1 className={styles.name}>{amulet.name}</h1>
            <p className={styles.temple}>{amulet.temple}</p>

            <div className={styles.divider} />

            <p className={styles.description}>{amulet.description}</p>

            <div className={styles.divider} />

            {/* Price */}
            <div className={styles.priceBox}>
              <span className={styles.priceLabel}>ราคา</span>
              <span className={styles.priceValue}>ติดต่อสอบถาม</span>
            </div>

            {/* CTA */}
            <Link href="/contact" className={styles.ctaBtn}>
              สอบถามรายละเอียด
            </Link>

            <p className={styles.ctaNote}>
              ติดต่อผ่าน Line · Facebook · โทรศัพท์
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  try {
    const amulets = await getAmulets()
    const paths = (amulets || []).map(a => ({ params: { id: String(a.id) } }))
    return { paths, fallback: true }
  } catch {
    return { paths: [], fallback: true }
  }
}

export async function getStaticProps({ params }) {
  try {
    const amulet = await getAmuletById(params.id)
    return { props: { amulet }, revalidate: 60 }
  } catch {
    return { props: { amulet: null }, revalidate: 60 }
  }
}
