import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yxmejjsjdxxcnzlyoezx.supabase.co'

// Anon key Supabase Dashboard → Settings → API → anon/public key'den alınır.
// Vercel env vars'a NEXT_PUBLIC_SUPABASE_ANON_KEY olarak eklenmeli.
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'anon-key-not-configured'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
