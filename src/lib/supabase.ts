import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  wallet_address: string
  username?: string
  email?: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  user_id: string
  username: string
  contract_address?: string
  is_published: boolean
  metadata: {
    token_data?: any
    social_links?: {
      twitter?: string
      discord?: string
      telegram?: string
    }
    custom_overrides?: {
      description?: string
      name?: string
    }
  }
  created_at: string
  updated_at: string
}