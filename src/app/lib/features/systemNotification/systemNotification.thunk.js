import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'

export const fetchBroadcastNotifications = createAsyncThunk(
  'systemNotification/fetchBroadcastNotifications',
  async () => {
    const { data, error } = await supabase
      .from('system_notification')
      .select('*')
      .eq('is_broadcast', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: true })

    return { data, error }
  }
)

export const fetchPersonalNotifications = createAsyncThunk(
  'systemNotification/fetchPersonalNotifications',
  async ({ user_id }) => {
    const { data, error } = await supabase
      .from('system_notification')
      .select('*')
      .eq('user_id', user_id)
      .is('deleted_at', null)
      .order('created_at', { ascending: true })

    return { data, error }
  }
)
