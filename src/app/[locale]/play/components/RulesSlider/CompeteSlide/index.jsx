import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const CompeteSlide = () => {
  const { t } = useTranslation()

  return (
    <section className="flex w-full flex-col-reverse justify-start gap-8 md:flex-row md:items-center md:justify-between md:gap-4">
      <div className="w-full flex-1 items-center self-center">
        <Image
          src="/images/promotion-stats.png"
          alt="competition"
          width={400}
          height={400}
          className="xs:size-80 bg-accent-foreground mx-auto size-72 rounded p-2 md:mx-0 md:size-88 xl:size-112"
          unoptimized
        />
      </div>
      <div className="text-muted-foreground flex flex-1 flex-col items-start gap-4 md:gap-8">
        <h2 className="carousel-header font-bold uppercase">
          {t('Raqobatlashing')}
        </h2>
        <p className="xs:text-sm text-muted-foreground max-w-lg text-xs lg:text-base xl:text-lg">
          {t('Boshqa foydalanuvchilar')}
        </p>
      </div>
    </section>
  )
}

export default CompeteSlide
