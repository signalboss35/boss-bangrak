import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ถ้ายังไม่ตั้งค่า Supabase ให้ใช้ dummy client (เว็บจะใช้ demo data แทน)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function getAmulets(tier = null) {
  if (!supabase) return []
  let query = supabase.from('amulets').select('*').order('created_at', { ascending: false })
  if (tier) query = query.eq('tier', tier)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getAmuletById(id) {
  if (!supabase) return null
  const { data, error } = await supabase.from('amulets').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export function getImageUrl(path) {
  if (!path || !supabase) return null
  if (path.startsWith('http')) return path
  const { data } = supabase.storage.from('amulet-images').getPublicUrl(path)
  return data.publicUrl
}