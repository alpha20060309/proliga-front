import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'
import { BANNER, BANNER_SERVICE_TYPE } from 'app/utils/banner.util'

export const fetchBanners = createAsyncThunk('banner/fetchBanner', async () => {
  const bannerPositions = Object.keys(BANNER).map((key) => BANNER[key])
  const bannerTypes = Object.keys(BANNER_SERVICE_TYPE).map(
    (key) => BANNER_SERVICE_TYPE[key]
  )

  const { data, error } = await supabase
    .from('banner')
    .select('*')
    .is('deleted_at', null)
    .in('banner_type', bannerPositions)
    .in('type', bannerTypes)

  return { data, error }
})
