-- =============================================
-- Boss BangRak — Supabase Database Schema
-- =============================================

-- 1. Create the amulets table
CREATE TABLE amulets (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    timestamptz DEFAULT now() NOT NULL,
  name          text NOT NULL,
  temple        text NOT NULL,
  tier          text NOT NULL CHECK (tier IN ('Masterpiece', 'Premium', 'Standard')),
  description   text,
  images        text[] DEFAULT '{}',       -- array of storage paths (max 4)
  has_certificate       boolean DEFAULT false,
  has_competition_award boolean DEFAULT false
);

-- 2. Enable Row Level Security (read-only public access)
ALTER TABLE amulets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
  ON amulets
  FOR SELECT
  USING (true);

-- 3. Storage bucket (run in Supabase Dashboard → Storage → New Bucket)
-- Bucket name: amulet-images
-- Public: true

-- 4. Sample data
INSERT INTO amulets (name, temple, tier, description, has_certificate, has_competition_award) VALUES
  ('หลวงพ่อโสธร รุ่นแรก',   'วัดโสธรวรารามวรวิหาร',         'Masterpiece', 'พระเครื่องรุ่นแรก หล่อด้วยโลหะผสมโบราณ พุทธคุณเด่นทางด้านโชคลาภ เมตตามหานิยม', true, true),
  ('สมเด็จวัดระฆัง พิมพ์ใหญ่', 'วัดระฆังโฆสิตาราม',          'Masterpiece', 'สมเด็จพิมพ์ใหญ่ แม่พิมพ์คมชัด ผิวเนื้อแกร่ง สีเหลืองอมน้ำตาล', true, false),
  ('หลวงปู่ทวด วัดช้างให้',    'วัดช้างให้',                   'Premium',     'พระหลวงปู่ทวดเนื้อว่าน พุทธคุณเด่นด้านแคล้วคลาด คงกระพัน', true, false),
  ('พระปิดตา หลวงพ่อเงิน',    'วัดบางคลาน',                  'Premium',     'พระปิดตาเนื้อทองผสม พิมพ์มือ พุทธคุณเด่นด้านมหาลาภ', false, true),
  ('สมเด็จเนื้อผง พิมพ์สังฆาฏิ', 'วัดใหม่อมตรส',             'Standard',    'พระสมเด็จเนื้อผงพุทธคุณ พิมพ์สังฆาฏิ สภาพสวย', false, false);
