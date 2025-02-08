import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'

export const fetchTeamPlayers = createAsyncThunk(
  'teamPlayers/fetchTeamPlayers',
  async ({ team_id, tour_id, competition_id }) => {
    const { data, error } = await supabase
      .from('team_player')
      .select('*, club_id(name, id, slug), player(name, name_ru)')
      .eq('team_id', team_id)
      .eq('tour_id', tour_id)
      .eq('competition_id', competition_id)
      .limit(11)
      .is('deleted_at', null)
      .order('id')

    return { data, error }
  }
)
