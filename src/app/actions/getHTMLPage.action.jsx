'use server'

import prisma from 'lib/prisma'
import { cache } from 'react'

export const getHTMLPage = async (name) => {
  if (!name) {
    return { error: 'Name is required' }
  }

  try {
    const page = await prisma.system_language
      .findUnique({
        where: {
          name,
          deleted_at: null,
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
