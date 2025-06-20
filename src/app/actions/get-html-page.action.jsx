'use server'

import { db } from 'lib/db'
import { cache } from 'react'

export const getHTMLPage = async (name) => {
  if (!name) {
    return { error: 'Name is required' }
  }

  try {
    const page = await db.system_language
      .findUnique({
        where: {
          name,
        },
        select: {
          id: true,
          name: true,
          ru: true,
          uz: true,
        },
      })
      .then((data) => {
        return data
      })
    if (!page) {
      return { error: `Page with name '${name}' not found` }
    }
    return { data: page }
  } catch (error) {
    return {
      error,
    }
  }
}

export const getPage = cache(async (name) => {
  return await getHTMLPage(name)
})
