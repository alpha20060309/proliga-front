import Image from 'next/image'

const PromotionCompete = ({ t }) => {
  return (
    <div className="flex w-full flex-col-reverse justify-start gap-6 md:flex-row md:items-center md:justify-between md:gap-4 lg:gap-8">
      <div className="w-full flex-1 items-center self-center">
        <Image
          src="/images/promotion-stats.png"
          alt="competition"
          className="xs:w-3/4 bg-accent-foreground mx-auto w-full rounded-sm p-2 md:mx-0 md:size-80 xl:size-96"
          width={400}
          height={400}
          draggable={false}
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2 sm:gap-4 md:gap-8">
        <h2 className="promotion-header font-bold uppercase">
          {t('Raqobatlashing')}
        </h2>
        <p className="promotion-text max-w-lg">
          {t('Boshqa foydalanuvchilar')}
        </p>
      </div>
    </div>
  )
}

export default PromotionCompete
