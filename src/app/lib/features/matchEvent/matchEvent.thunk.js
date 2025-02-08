import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'
import { MATCH_EVENTS } from 'app/utils/players.util'

export const fetchMatchEvents = createAsyncThunk(
  'matchEvent/fetchMatchEvents',
  async ({ match_id }) => {
    const { data, error } = await supabase
      .from('match_event')
      .select(
        'id, match_id, event_type, minute, player_id(id, name, name_ru, club(id)), second_player_id(id, name, name_ru, club(id))'
      )
      .eq('match_id', match_id)
      .in('event_type', [
        MATCH_EVENTS.FIRST_TIME_START,
        MATCH_EVENTS.FIRST_TIME_END,
        MATCH_EVENTS.GOAL,
        MATCH_EVENTS.RED_CARD,
        MATCH_EVENTS.TRANSFER,
        MATCH_EVENTS.YELLOW_CARD,
        MATCH_EVENTS.HIT_PENALTY,
        MATCH_EVENTS.MISSED_PENALTY,
        MATCH_EVENTS.SECOND_TIME_START,
        MATCH_EVENTS.SECOND_TIME_END,
      ])
      .is('deleted_at', null)
      .order('minute')

    return { data, error }
  }
)
