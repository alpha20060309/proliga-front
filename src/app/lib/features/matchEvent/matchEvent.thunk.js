import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'
import { MATCH_EVENTS } from 'app/utils/match.util'

export const fetchMatchEvents = createAsyncThunk(
  'matchEvent/fetchMatchEvents',
  async ({ match_id }) => {
    const matchEvents = Object.keys(MATCH_EVENTS).map(
      (key) => MATCH_EVENTS[key]
    )

    const { data, error } = await supabase
      .from('match_event')
      .select(
        'id, match_id, event_type, minute, player_id(id, name, name_ru, club(id)), second_player_id(id, name, name_ru, club(id))'
      )
      .eq('match_id', match_id)
      .in('event_type', matchEvents)
      .is('deleted_at', null)
      .order('minute')

    return { data, error }
  }
)
