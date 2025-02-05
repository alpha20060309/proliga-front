import Image from 'next/image'
import Gutter from '../../Gutter'
import { useTranslation } from 'react-i18next'

const PromotionCreateTeam = () => {
  const { t } = useTranslation()
  return (
    <section className="bg-neutral-800 py-6 md:py-8 xl:py-10 2xl:py-12">
      <Gutter>
        <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:gap-4 lg:gap-0">
          <div className="flex flex-1 flex-col flex-wrap">
            <div className="mb-2 w-5/6 max-w-72 -skew-x-12 self-start rounded-sm bg-primary sm:max-w-[24rem] md:mb-4 md:max-w-[32rem] lg:mb-6">
              <h3 className="promotion-header text-center font-bold capitalize text-black">
                {t('Umumiy qoidalar')}
              </h3>
            </div>
            <div className="flex flex-col flex-wrap justify-center gap-4 self-center md:self-start lg:pl-8">
              <h2 className="promotion-header font-bold uppercase">
                {t("jamoa yig'ing")}
              </h2>
              <p className="max-w-xl text-sm text-neutral-300 xs:text-base lg:text-lg xl:text-xl">
                {t('promotion_text')}
              </p>
              <div className="relative hidden h-full w-full self-start md:block">
                <Image
                  width={300}
                  height={300}
                  alt="footballers images"
                  className="h-full w-full"
                  src="/images/footballers-tile.png"
                  draggable={false}
                  unoptimized
                />
              </div>
            </div>
          </div>
          <div className="w-full flex-1 items-end self-center xs:w-4/5 md:w-auto">
            <Image
              src="/images/promotion-1.png"
              width={600}
              height={600}
              priority={false}
              className="aspect-[1/1.025] h-full w-full"
              draggable={false}
              alt="interactive stadium"
            />
          </div>
        </div>
      </Gutter>
    </section>
  )
}

export default PromotionCreateTeam
