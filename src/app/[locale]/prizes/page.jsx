import initTranslations from 'app/lib/i18n'
import prisma from 'lib/prisma'
import { cache } from 'react'

const fetchPrizes = cache(async () => {
  try {
    const prizes = await prisma.prize.findMany({
      where: {
        is_active: true,
      },
    })
    return { data: prizes }
  } catch (error) {
    return { error: error.message }
  }
})

const Prizes = async ({ params }) => {
  const { locale } = await params
  const { t } = await initTranslations(locale)
  const { data: prizes, error } = await fetchPrizes()

  if (error || prizes.length === 0) {
    return (
      <h1 className="text-foreground text-center text-2xl">
        {t('Hozircha yutuqlar yoq')}
      </h1>
    )
  }

  return (
    <>
      <h1 className="text-foreground mb-6 text-2xl font-bold">
        {t('Yutuqlar')}
      </h1>

      {JSON.stringify(prizes)}
      {/* <section className="flex flex-col items-center justify-center gap-2">
        {competition?.map((competition, index) => (
          <PrizeCompetition competition={competition} key={index} />
        ))}
      </section> */}
    </>
  )
}

export default Prizes
