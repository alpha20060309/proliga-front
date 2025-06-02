
import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'

export const fetchThemes = createAsyncThunk(
  'theme/fetchThemes',
  async () => {
    const { data, error } = await supabase
      .from('theme')
      .select('id, name, name_ru, dark_theme, light_theme, is_default')
      .eq('is_global', true)
      .is('deleted_at', null)

    return { data, error }
  }
)

export const fetchUserTheme = createAsyncThunk(
  'theme/fetchUserTheme',
  async (user_id) => {
    const { data, error } = await supabase
      .from('theme')
      .select('id, name, name_ru, dark_theme, light_theme, user_id')
      .eq('is_global', false)
      .eq('user_id', user_id)
      .is('deleted_at', null)
      .single()

    return { data, error }
  }
)

