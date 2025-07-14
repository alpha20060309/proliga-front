import { supabase } from 'lib/supabaseClient'
import { cache } from 'react'

export const getUserById = cache(async (id) => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', Number(id))
    .is('deleted_at', null)
    .single()
  if (error) {
    console.error('Error fetching user by ID:', error)
    return null
  }
  return data || null
})

export const getUserByPhone = cache(async (phone) => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('phone', phone)
    .is('deleted_at', null)
    .single()
  if (error) {
    console.error('Error fetching user by phone:', error)
    return null
  }
  return data || null
})

export const getUserByEmail = cache(async (email) => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', email)
    .is('deleted_at', null)
    .single()
  if (error) {
    console.error('Error fetching user by email:', error)
    return null
  }
  return data || null
})
