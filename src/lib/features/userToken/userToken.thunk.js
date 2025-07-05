import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchUserToken = createAsyncThunk(
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

        return { data }
    }
)