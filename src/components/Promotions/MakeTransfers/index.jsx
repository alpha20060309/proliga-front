import Image from 'next/image'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { ArrowRightLeft } from 'lucide-react'

const PromotionMakeTransfers = ({ t }) => {
  return (
    <Card className="relative h-full flex-1 rounded-none border-x-0 border-t-0 border-inherit shadow-none">
      <CardContent className="align-center flex flex-col gap-2 bg-cover px-0 sm:gap-4 md:gap-8">
        <CardTitle className="xs:text-xl self-center text-lg font-bold uppercase md:text-2xl xl:text-3xl">
          {t('Transferlarni amalga oshiring')}
        </CardTitle>
        <CardDescription className="xs:text-base w-full max-w-xl self-center text-center text-sm md:text-lg lg:text-lg xl:max-w-2xl xl:text-xl">
          {t('Agar sizning jamoangizdagi')}
        </CardDescription>
        <div className="mx-auto flex w-full flex-1 items-center justify-center gap-6 md:w-auto md:flex-row">
          <Image src='/images/transfer-from.png' quality={100} alt='transfer field' className='rounded-full size-48' width={540} height={200} />
          <ArrowRightLeft className='size-12 text-foreground' />
          <Image src='/images/transfer-to.png' quality={100} alt='transfer field' className='rounded-full size-48' width={540} height={200} />
        </div>
      </CardContent>
    </Card>
  )
}

export default PromotionMakeTransfers
