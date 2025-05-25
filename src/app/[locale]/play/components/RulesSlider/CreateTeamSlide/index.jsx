import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const CreateTeamSlide = () => {
  const { t } = useTranslation()

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:gap-0 lg:gap-0">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col flex-wrap justify-center gap-2 self-center md:gap-4 md:self-start lg:pl-8">
          <h2 className="carousel-header font-bold uppercase">
            {t("jamoa yig'ing")}
          </h2>
          <p className="carousel-text text-muted-foreground max-w-lg">
            {t('promotion_text')}
          </p>
          <div className="relative hidden h-full w-full self-start md:block">
            <Image
              width={200}
              height={200}
              alt="footballers images"
              className="h-64 w-auto xl:h-80"
              src="/images/footballers-tile.png"
              unoptimized
            />
          </div>
        </div>
      </div>
      <div className="xs:w-4/5 h-auto max-h-144 w-full flex-1 items-end self-center md:w-auto">
        <Image
          src="/images/promotion-1.png"
          width={380}
          priority={false}
          height={380}
          className="mx-auto aspect-[1/1.025] h-80 w-min lg:h-96 xl:h-128 2xl:h-140"
          alt="interactive stadium"
          unoptimized
        />
      </div>
    </div>
  )
}

export default CreateTeamSlide
