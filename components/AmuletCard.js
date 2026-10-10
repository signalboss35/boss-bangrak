import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '../lib/supabase'
import styles from './AmuletCard.module.css'

const TIER_LABELS = {
  Masterpiece: { label: 'Masterpiece', className: styles.tierMasterpiece },
  Premium:     { label: 'Premium',     className: styles.tierPremium },
  Standard:    { label: 'Standard',    className: styles.tierStandard },
}

export default function AmuletCard({ amulet }) {
  const imageUrl = amulet.images?.[0] ? getImageUrl(amulet.images[0]) : null
  const tierInfo = TIER_LABELS[amulet.tier] || TIER_LABELS.Standard

  return (
    <Link
      href={`/amulet/${amulet.id}`}
      className={`${styles.card} ${amulet.tier === 'Masterpiece' ? styles.cardMasterpiece : ''}`}
    >
      {amulet.tier === 'Masterpiece' && <div className={styles.shimmerBorder} />}

      {/* รูปภาพ */}
      <div className={styles.imageWrap}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={amulet.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>✦</div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className={styles.overlay} />

      {/* Tier badge */}
      <div className={`${styles.tierBadge} ${tierInfo.className}`}>
        {tierInfo.label}
      </div>

      {/* ข้อมูลซ้อนล่าง */}
      <div className={styles.body}>
        <h3 className={styles.name}>{amulet.name}</h3>
        <p className={styles.temple}>{amulet.temple}</p>
        {(amulet.has_certificate || amulet.has_competition_award) && (
          <div className={styles.badges}>
            {amulet.has_certificate && (
              <span className={styles.badge}>🏅 บัตรรับรอง</span>
            )}
            {amulet.has_competition_award && (
              <span className={`${styles.badge} ${styles.badgeAward}`}>🏆 ใบประกาศ</span>
            )}
          </div>
        )}
        <p className={styles.price}>ติดต่อสอบถาม</p>
      </div>
    </Link>
  )
}