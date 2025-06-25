
import { getCorrectName } from 'app/utils/getCorrectName.util'
import Prize from '../Prize'
import { getUrl } from 'app/utils/static.util'
import prisma from 'lib/prisma'
import { cache } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const fetchPrizesByCompetition = cache(async (competitionId) => {
  try {
    const prizes = await prisma.prize.findMany({
      where: {
        is_active: true,
        competition_id: competitionId,
        deleted_at: null,
      },
      orderBy: {
        order: 'asc',
      },
    })
    return { data: prizes }
  } catch (error) {
    return { error: error.message }
  }
})

const PrizeContainer = async ({ competition, locale, t }) => {
  const { data: prizes, error } = await fetchPrizesByCompetition(competition.id)
  if (error || prizes.length === 0) return <></>

  const orderedPrizes = [prizes[1], prizes[0], prizes[2]]

  return (
    <Card className="w-full border-border">
      <CardHeader className="flex border-border  mb-4 items-center gap-2 border-b">
        <img
          src={getUrl(competition.flag)}
          loading="lazy"
          alt={competition.title}
          className="bg-white z-10 size-10 rounded-full p-1 select-none"
          draggable={false}
        />
        <CardTitle>
          {getCorrectName({
            lang: locale,
            uz: competition?.name,
            ru: competition?.name_ru,
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='lg:grid grid-cols-1 grid-rows-3 lg:grid-rows-1 gap-2 lg:grid-cols-3 hidden'>
          {orderedPrizes.map(
            (prize) =>
              <Prize prize={prize} key={prize.id} locale={locale} t={t} />
          )}
        </div>
        <div className='lg:hidden grid-cols-1 grid-rows-3 lg:grid-rows-1 gap-2 lg:grid-cols-3 grid'>
          {prizes.map(
            (prize) =>
              <Prize prize={prize} key={prize.id} locale={locale} t={t} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PrizeContainer
