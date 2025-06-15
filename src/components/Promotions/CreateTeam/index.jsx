import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const PromotionCreateTeam = ({ t }) => {
  return (
    <Card className="border-border relative h-full flex-1">
      <CardHeader className="bg-primary ml-6 w-full max-w-72 -skew-x-12 self-start rounded-xs sm:max-w-[24rem] md:max-w-lg">
        <CardTitle className="promotion-header text-primary-foreground text-center font-bold capitalize">
          {t('Umumiy qoidalar')}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-full max-h-[40rem] w-full flex-col gap-4 p-6 lg:grid lg:grid-cols-2 lg:grid-rows-1">
        <div className="flex h-full flex-col space-y-4">
          <h2 className="promotion-header font-bold uppercase">
            {t("jamoa yig'ing")}
          </h2>
          <p className="text-muted-foreground xs:text-base max-w-xl text-sm lg:text-lg xl:text-xl">
            {t('promotion_text')}
          </p>
          <Image
            width={200}
            height={200}
            alt="footballers images"
            className="hidden h-full w-full max-w-[420px] object-contain lg:block"
            src="/images/footballers-tile.png"
            draggable={false}
            unoptimized
          />
        </div>
        <div className="relative flex w-full lg:h-full">
          <Image
            src="/images/promotion-1.png"
            priority={false}
            height={400}
            width={400}
            draggable={false}
            className="mx-auto lg:ml-auto h-full w-full max-w-[32rem] object-contain"
            alt="interactive stadium"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PromotionCreateTeam
