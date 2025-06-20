import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'

export const fetchThemes = createAsyncThunk('theme/fetchThemes', async () => {
  const { data, error } = await supabase
    .from('theme')
    .select('*')
    .eq('is_global', true)
    .is('deleted_at', null)

  return { data, error }
})

export const fetchUserThemes = createAsyncThunk(
  'theme/fetchUserThemes',
  async (user_id) => {
    const { data, error } = await supabase
      .from('theme')
      .select('*')
      .eq('is_global', false)
      .eq('user_id', user_id)
      .is('deleted_at', null)

    return { data, error }
  }
)
