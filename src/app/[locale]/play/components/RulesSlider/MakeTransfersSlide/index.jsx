import Image from 'next/image'
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
      <div className="mx-auto mt-10 flex w-full flex-1 items-center justify-center gap-6 md:w-auto md:flex-row">
          <Image src='/images/transfer-from.png' quality={100} alt='transfer field' className='rounded-full size-48' width={540} height={200} />
          <ArrowRightLeft className='size-12 text-foreground' />
          <Image src='/images/transfer-to.png' quality={100} alt='transfer field' className='rounded-full size-48' width={540} height={200} />
        </div>
    </article>
  )
}

export default MakeTransfersSlide
