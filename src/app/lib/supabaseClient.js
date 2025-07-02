import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  } catch (error) {
    console.error('Error getting session:', error.message)
    return null
  }
}

export const SUPABASE_EVENT_TYPE = {
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
}

export const SUPABASE_PROVIDERS = {
  EMAIL: 'email',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  YANDEX: 'yandex',
}
