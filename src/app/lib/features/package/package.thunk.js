import { supabase } from 'app/lib/supabaseClient'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async () => {
    const { data, error } = await supabase
      .from('pay_package')
      .select('*')
      .is('deleted_at', null)

    return { data, error }
  }
)
