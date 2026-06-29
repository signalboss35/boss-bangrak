# บอส บางรัก — Boss BangRak 🏺
เว็บแคตตาล็อกพระเครื่อง Light Luxury

## Tech Stack (ทั้งหมด Free / Open Source)

| Layer       | Tool           | เหตุผล                          |
|-------------|----------------|--------------------------------|
| Frontend    | Next.js 14     | SSG/ISR รวดเร็ว SEO ดี          |
| Backend/API | Supabase       | Postgres + Auth + Storage ฟรี  |
| Storage     | Supabase Storage | CDN รูปภาพ ฟรี 1GB             |
| Deploy      | Vercel         | Auto-deploy จาก GitHub ฟรี     |

---

## วิธีติดตั้งและ Deploy

### 1. สร้าง Supabase Project
1. ไปที่ [supabase.com](https://supabase.com) → New Project
2. ไปที่ **SQL Editor** แล้ว run ไฟล์ `supabase-schema.sql`
3. ไปที่ **Storage** → New Bucket ชื่อ `amulet-images` ตั้งเป็น **Public**
4. คัดลอก **Project URL** และ **anon public key** จาก Settings → API

### 2. ตั้งค่า Environment Variables
```bash
cp .env.local.example .env.local
```
แก้ไขไฟล์ `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### 3. รันในเครื่อง
```bash
npm install
npm run dev
```
เปิด [http://localhost:3000](http://localhost:3000)

### 4. Deploy บน Vercel
1. Push โค้ดขึ้น GitHub
2. ไปที่ [vercel.com](https://vercel.com) → New Project → Import จาก GitHub
3. ใส่ Environment Variables ทั้ง 2 ตัวใน Vercel Dashboard
4. กด Deploy — เสร็จ! ได้ URL ฟรีทันที

---

## วิธีเพิ่มสินค้า

### ผ่าน Supabase Dashboard
1. ไปที่ **Table Editor** → `amulets`
2. กด Insert Row
3. กรอกข้อมูล:
   - `name` — ชื่อพระ
   - `temple` — วัด
   - `tier` — `Masterpiece` / `Premium` / `Standard`
   - `description` — รายละเอียด
   - `has_certificate` — true/false (มีบัตรรับรอง)
   - `has_competition_award` — true/false (ใบประกาศ)
   - `images` — array ของ storage path เช่น `["folder/image1.jpg", "folder/image2.jpg"]`

### อัปโหลดรูป
1. ไปที่ **Storage** → `amulet-images`
2. อัปโหลดไฟล์รูป (รองรับ 1-4 รูปต่อองค์)
3. คัดลอก path แล้วใส่ใน field `images` ของ amulet

---

## โครงสร้างไฟล์

```
boss-bangrak/
├── components/
│   ├── Navbar.js          # Navigation bar
│   ├── AmuletCard.js      # Card สินค้าแต่ละชิ้น
│   └── Footer.js          # Footer
├── pages/
│   ├── index.js           # หน้าหลัก (catalog + filter)
│   ├── contact.js         # หน้าติดต่อ
│   └── amulet/[id].js     # หน้าแสดงรายละเอียดสินค้า
├── lib/
│   └── supabase.js        # Supabase client + queries
├── styles/
│   └── globals.css        # Global styles + CSS variables
├── supabase-schema.sql    # SQL สำหรับสร้าง database
└── .env.local.example     # ตัวอย่าง environment variables
```

---

## ปรับแต่งข้อมูลติดต่อ

แก้ไขไฟล์ `pages/contact.js`:
- Line: เปลี่ยน `@bossbangrak` และ URL Line
- Tel: เปลี่ยน `08X-XXX-XXXX` และ `+66XXXXXXXXX`  
- Facebook: เปลี่ยน URL และชื่อเพจ

---

## Features

✅ Grid catalog พร้อม filter ตาม tier  
✅ แบ่งหมวด Masterpiece / Premium / Standard  
✅ Shimmer gold border สำหรับ Masterpiece  
✅ Badge บัตรรับรอง และใบประกาศงานประกวด  
✅ หน้า Detail รองรับ 1-4 รูป พร้อม thumbnail  
✅ ราคาแสดงเป็น "ติดต่อสอบถาม"  
✅ หน้า Contact พร้อม Line / Tel / Facebook  
✅ Responsive mobile-first  
✅ Demo data เมื่อยังไม่ต่อ Supabase  
✅ ISR (Incremental Static Regeneration) revalidate 60 วินาที
