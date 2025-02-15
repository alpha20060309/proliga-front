import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'
import { CONFIG_KEY } from 'app/utils/config.util'
import { toast } from 'react-toastify'

export const fetchSystemConfig = createAsyncThunk(
  'systemConfig/fetchSystemConfig',
  async () => {
    try {
      const configKeys = Object.keys(CONFIG_KEY).map((key) => key)

      const { data, error } = await supabase
        .from('system_config')
        .select('key, value, type')
        .in('key', configKeys)

      return { data, error }
    } catch (error) {
      toast.error(error.message)
    }
  }
)
