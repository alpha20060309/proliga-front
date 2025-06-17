import Image from 'next/image'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

const PromotionCompete = ({ t }) => {
  return (
    <Card className="border-border relative h-full flex-1">
      <CardContent className="flex w-full flex-col-reverse justify-start gap-6 md:flex-row md:items-center md:justify-between md:gap-4 lg:gap-8">
        <div className="w-full flex-1 items-center self-center">
          <Image
            src="/images/promotion-stats.png"
            alt="competition"
            className="xs:w-3/4 mx-auto w-full rounded-sm bg-black/50 p-2 md:mx-0 md:size-80 xl:size-96"
            width={400}
            height={400}
            draggable={false}
          />
        </div>
        <div className="flex flex-1 flex-col items-start gap-2 sm:gap-4 md:gap-8">
          <CardTitle className="xs:text-xl text-lg font-bold uppercase md:text-2xl xl:text-3xl">
            {t('Raqobatlashing')}
          </CardTitle>
          <CardDescription className="xs:text-base max-w-lg text-sm md:text-lg lg:text-lg xl:text-xl">
            {t('Boshqa foydalanuvchilar')}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}

export default PromotionCompete
