import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'

export const fetchMatchEvents = createAsyncThunk(
  'matchEvent/fetchMatchEvents',
  async ({ match_id }) => {
    const { data, error } = await supabase
      .from('match_event')
      .select('*')
      .eq('match_id', match_id)
      .is('deleted_at', null)

    return { data, error }
  }
)
