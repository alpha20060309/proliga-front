'use server'

import { cache } from 'react'
import { supabase } from 'lib/supabaseClient'

export const getHTMLPage = async (name) => {
  if (!name) {
    return { error: 'Name is required' }
  }

  try {
    const { data: page, error } = await supabase
      .from('system_language')
      .select('*')
      .eq('name', name)
      .is('deleted_at', null)
      .single()

    if (error) {
      return { error: error?.message }
    }

    if (!page) {
      return { error: `${error?.message} with name '${name}' not found` }
    }

    return { data: page, error: null }
  } catch (error) {
    return {
      error,
    }
  }
}

export const getPage = cache(async (name) => {
  return await getHTMLPage(name)
})
