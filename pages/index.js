import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import AmuletCard from '../components/AmuletCard'
import { getAmulets } from '../lib/supabase'
import styles from './index.module.css'

const TIERS = ['ทั้งหมด', 'Masterpiece', 'Premium', 'Standard']

// Demo data for when Supabase is not configured
const DEMO_AMULETS = [
  {
    id: '1',
    name: 'หลวงพ่อโสธร รุ่นแรก',
    temple: 'วัดโสธรวรารามวรวิหาร',
    tier: 'Masterpiece',
    has_certificate: true,
    has_competition_award: true,
    description: 'พระเครื่องรุ่นแรก หล่อด้วยโลหะผสมโบราณ พุทธคุณเด่นทางด้านโชคลาภ เมตตามหานิยม',
    images: [],
  },
  {
    id: '2',
    name: 'สมเด็จวัดระฆัง พิมพ์ใหญ่',
    temple: 'วัดระฆังโฆสิตาราม',
    tier: 'Masterpiece',
    has_certificate: true,
    has_competition_award: false,
    description: 'สมเด็จพิมพ์ใหญ่ แม่พิมพ์คมชัด ผิวเนื้อแกร่ง สีเหลืองอมน้ำตาล',
    images: [],
  },
  {
    id: '3',
    name: 'หลวงปู่ทวด วัดช้างให้',
    temple: 'วัดช้างให้',
    tier: 'Premium',
    has_certificate: true,
    has_competition_award: false,
    description: 'พระหลวงปู่ทวดเนื้อว่าน พุทธคุณเด่นด้านแคล้วคลาด คงกระพัน',
    images: [],
  },
  {
    id: '4',
    name: 'พระปิดตา หลวงพ่อเงิน',
    temple: 'วัดบางคลาน',
    tier: 'Premium',
    has_certificate: false,
    has_competition_award: true,
    description: 'พระปิดตาเนื้อทองผสม พิมพ์มือ พุทธคุณเด่นด้านมหาลาภ',
    images: [],
  },
  {
    id: '5',
    name: 'เหรียญหลวงพ่อคูณ รุ่นคูณทวีคูณ',
    temple: 'วัดบ้านไร่',
    tier: 'Premium',
    has_certificate: false,
    has_competition_award: false,
    description: 'เหรียญรุ่นดัง พิมพ์นิยม เนื้อทองแดงรมดำ',
    images: [],
  },
  {
    id: '6',
    name: 'พระสมเด็จ เนื้อผง',
    temple: 'วัดใหม่อมตรส',
    tier: 'Standard',
    has_certificate: false,
    has_competition_award: false,
    description: 'พระสมเด็จเนื้อผงพุทธคุณ พิมพ์สังฆาฏิ',
    images: [],
  },
  {
    id: '7',
    name: 'เหรียญพระพุทธชินราช',
    temple: 'วัดพระศรีรัตนมหาธาตุ',
    tier: 'Standard',
    has_certificate: false,
    has_competition_award: false,
    description: 'เหรียญพระพุทธชินราช เนื้ออัลปาก้า สภาพสวยเดิม',
    images: [],
  },
  {
    id: '8',
    name: 'พระผงสุพรรณ',
    temple: 'กรุวัดพระศรีรัตนมหาธาตุ สุพรรณบุรี',
    tier: 'Standard',
    has_certificate: false,
    has_competition_award: false,
    description: 'พระผงสุพรรณ เนื้อดินผสมว่าน พิมพ์หน้าแก่',
    images: [],
  },
]

export default function HomePage() {
  const router = useRouter()
  const { tier: tierParam } = router.query

  const [activeTier, setActiveTier] = useState('ทั้งหมด')
  const [amulets, setAmulets] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingDemo, setUsingDemo] = useState(false)

  useEffect(() => {
    if (tierParam && TIERS.includes(tierParam)) {
      setActiveTier(tierParam)
    } else if (!tierParam) {
      setActiveTier('ทั้งหมด')
    }
  }, [tierParam])

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const tier = activeTier === 'ทั้งหมด' ? null : activeTier
        const data = await getAmulets(tier)
        if (!data || data.length === 0) {
          // Show demo data if DB is empty or not configured
          const filtered = activeTier === 'ทั้งหมด'
            ? DEMO_AMULETS
            : DEMO_AMULETS.filter(a => a.tier === activeTier)
          setAmulets(filtered)
          setUsingDemo(true)
        } else {
          setAmulets(data)
          setUsingDemo(false)
        }
      } catch {
        const filtered = activeTier === 'ทั้งหมด'
          ? DEMO_AMULETS
          : DEMO_AMULETS.filter(a => a.tier === activeTier)
        setAmulets(filtered)
        setUsingDemo(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [activeTier])

  const handleTier = (tier) => {
    setActiveTier(tier)
    const query = tier === 'ทั้งหมด' ? {} : { tier }
    router.push({ pathname: '/', query }, undefined, { shallow: true })
  }

  // Group by tier for "all" view
  const grouped = {
    Masterpiece: amulets.filter(a => a.tier === 'Masterpiece'),
    Premium: amulets.filter(a => a.tier === 'Premium'),
    Standard: amulets.filter(a => a.tier === 'Standard'),
  }

  return (
    <>
      <Head>
        <title>บอส บางรัก — คลังพระเครื่องคัดคุณภาพ</title>
        <meta name="description" content="พระเครื่องคัดคุณภาพจากร้านบอส บางรัก" />
      </Head>

      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Boss BangRak · คลังพระเครื่อง</p>
        <h1 className={styles.heroTitle}>พระเครื่องคัดสรร<br />เพื่อผู้มีรสนิยม</h1>
        <p className={styles.heroSub}>
          คัดมาเฉพาะพระเครื่องแท้ มีที่มา พร้อมบัตรรับรองคุณภาพ
        </p>
      </section>

      {usingDemo && (
        <div className={styles.demoBanner}>
          ⚠️ กำลังแสดงข้อมูลตัวอย่าง — กรุณาตั้งค่า Supabase เพื่อใช้งานจริง
        </div>
      )}

      {/* Filter tabs */}
      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          {TIERS.map(t => (
            <button
              key={t}
              className={`${styles.filterBtn} ${activeTier === t ? styles.filterActive : ''}`}
              onClick={() => handleTier(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p>กำลังโหลด...</p>
          </div>
        ) : activeTier === 'ทั้งหมด' ? (
          // Grouped sections
          <>
            {['Masterpiece', 'Premium', 'Standard'].map(tier => (
              grouped[tier].length > 0 && (
                <section key={tier} className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{tier}</h2>
                    {tier !== 'Standard' && (
                      <span className={styles.sectionNote}>
                        {tier === 'Masterpiece' ? 'พระชั้นนำ · คัดพิเศษ' : 'คุณภาพสูง · คัดสรร'}
                      </span>
                    )}
                    <div className={styles.sectionLine} />
                  </div>
                  <div className={styles.grid}>
                    {grouped[tier].map(a => <AmuletCard key={a.id} amulet={a} />)}
                  </div>
                </section>
              )
            ))}
          </>
        ) : (
          // Single tier
          <section className={styles.section}>
            <div className={styles.grid}>
              {amulets.length > 0
                ? amulets.map(a => <AmuletCard key={a.id} amulet={a} />)
                : <p className={styles.empty}>ไม่มีรายการในหมวดนี้</p>
              }
            </div>
          </section>
        )}
      </div>
    </>
  )
}
