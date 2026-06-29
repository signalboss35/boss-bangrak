import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '../lib/supabase'
import styles from './AmuletCard.module.css'

const TIER_LABELS = {
  Masterpiece: { label: 'Masterpiece', className: styles.tierMasterpiece },
  Premium: { label: 'Premium', className: styles.tierPremium },
  Standard: { label: 'Standard', className: styles.tierStandard },
}

export default function AmuletCard({ amulet }) {
  const imageUrl = amulet.images?.[0] ? getImageUrl(amulet.images[0]) : null
  const tierInfo = TIER_LABELS[amulet.tier] || TIER_LABELS.Standard
  const hasCertificate = amulet.has_certificate
  const hasCompetition = amulet.has_competition_award

  return (
    <Link href={`/amulet/${amulet.id}`} className={`${styles.card} ${amulet.tier === 'Masterpiece' ? styles.cardMasterpiece : ''}`}>
      {/* Shimmer border for Masterpiece */}
      {amulet.tier === 'Masterpiece' && <div className={styles.shimmerBorder} />}

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
          <div className={styles.placeholder}>
            <span>✦</span>
          </div>
        )}

        {/* Tier badge */}
        <div className={`${styles.tierBadge} ${tierInfo.className}`}>
          {tierInfo.label}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{amulet.name}</h3>
        <p className={styles.temple}>{amulet.temple}</p>

        {/* Certificate & Award badges */}
        {(hasCertificate || hasCompetition) && (
          <div className={styles.badges}>
            {hasCertificate && (
              <span className={styles.badge} title="มีบัตรรับรอง">
                🏅 บัตรรับรอง
              </span>
            )}
            {hasCompetition && (
              <span className={`${styles.badge} ${styles.badgeAward}`} title="ใบประกาศงานประกวด">
                🏆 ใบประกาศ
              </span>
            )}
          </div>
        )}

        <p className={styles.price}>ติดต่อสอบถาม</p>
      </div>
    </Link>
  )
}
