import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchGeo = createAsyncThunk('auth/fetchGeo', async () => {
  const response = await fetch('/api/geoip')
  if (!response.ok) {
    throw new Error('Failed to fetch geolocation data')
  }
  const data = await response.json()

  return { data }
})

export const fetchFirebaseToken = createAsyncThunk(
  'auth/fetchFirebaseToken',
  async ({ user_id, fingerprint }) => {
    const { data, error } = await supabase
      .from('user_token')
      .select('*')
      .eq('user_id', user_id)
      .eq('fingerprint', fingerprint)
      .single()

    if (error) {
      throw error
    }

    return data
  }
)