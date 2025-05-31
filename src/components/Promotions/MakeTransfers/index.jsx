import Image from 'next/image'

const PromotionMakeTransfers = ({ t }) => {
  return (
    <div className="bg-custom-image align-center flex flex-col bg-cover">
      <h2 className="promotion-header xs:justify-start xs:text-start self-center text-center font-bold uppercase">
        {t('Transferlarni amalga oshiring')}
      </h2>
      <p className="promotion-text text-muted-foreground mt-2 self-center text-center md:w-3/4 lg:mt-6 xl:mt-10">
        {t('Agar sizning jamoangizdagi')}
      </p>
      <div className="mx-auto mt-4 w-full flex-1 md:w-auto md:items-center md:justify-center lg:mt-10">
        <Image
          width={540}
          height={200}
          src="/images/promotion-transfer.png"
          alt="transfer players"
          className="mx-auto h-full w-full md:mx-0"
          unoptimized
          draggable={false}
        />
      </div>
    </div>
  )
}

export default PromotionMakeTransfers
