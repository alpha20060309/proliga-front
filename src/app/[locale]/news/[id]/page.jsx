import prisma from 'lib/prisma'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cache } from 'react'

export async function generateStaticParams() {
  try {
    const newsItems = await prisma.news.findMany({
      select: {
        id: true,
      },
      take: 10
    })

    if (!newsItems) return []

    const locales = ['ru', 'uz']

    return newsItems.flatMap((item) =>
      locales.map((locale) => ({
        id: String(item.id),
        locale,
      }))
    )
  } catch (error) {
    console.error('Failed to generate static params for news:', error)
    return []
  }
}

const getNews = cache(async (id) => {
  // Validate id: must be a string or number that can be converted to a valid integer
  const parsedId = Number(id)
  if (!id || isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
    // Return null data and a validation error
    return { data: null, error: new Error('Invalid news id') }
  }
  try {
    const newsItem = await prisma.news.findUnique({
      where: {
        id: parsedId,
      },
    })
    return { data: newsItem, error: null }
  } catch (error) {
    console.error(`Failed to fetch news with id "${id}":`, error)
    return { data: null, error }
  }
})

export async function generateMetadata({ params }) {
  const { id, locale } = await params
  const { data: news } = await getNews(id)

  if (!news) {
    return {
      title: 'News not found',
    }
  }

  const title = getCorrectName({
    lang: locale,
    ru: news.name_ru,
    uz: news.name,
  })

  const metadata = {
    title,
  }


  return metadata
}

export default async function NewsPage({ params }) {
  const { id, locale } = await params
  const { data: news, error } = await getNews(id)

  if (error || !news) {
    notFound()
  }

  const title = getCorrectName({
    lang: locale,
    ru: news.name_ru,
    uz: news.name,
  })
  const content = getCorrectName({
    lang: locale,
    ru: news.desc_ru,
    uz: news.desc,
  })

  return (
    <Card className="border-border my-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </CardContent>
    </Card>
  )
}
