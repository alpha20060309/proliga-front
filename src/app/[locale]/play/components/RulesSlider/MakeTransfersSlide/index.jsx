import { useTranslation } from 'react-i18next'
import { ArrowRightLeft } from 'lucide-react'

const MakeTransfersSlide = () => {
  const { t } = useTranslation()
  return (
    <article className="align-center flex flex-col">
      <h2 className="carousel-header xs:justify-start xs:text-start self-center text-center font-bold uppercase">
        {t('Transferlarni amalga oshiring')}
      </h2>
      <p className="xs:text-sm text-muted-foreground mt-4 self-center text-center text-xs md:w-3/4 lg:text-base xl:mt-8 xl:text-lg">
        {t('Agar sizning jamoangizdagi')}
      </p>
      <div className="mx-auto flex w-full flex-1 items-center justify-center gap-6 md:w-auto md:flex-row">
        <img src='/images/transfer-from.png' alt='transfer field' className='rounded-full size-30 xs:size-40 md:size-48' />
        <ArrowRightLeft className='size-6 md:size-12 text-foreground' />
        <img src='/images/transfer-to.png' alt='transfer field' className='rounded-full size-30 xs:size-40 md:size-48' />
      </div>
    </article>
  )
}

export default MakeTransfersSlide
