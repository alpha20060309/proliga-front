import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

const StadiumContainer = ({ children, hideShareButton = false }) => {
  const { t } = useTranslation()

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value)
    toast.info(t('Buferga muvaffaqiyatli nusxalandi!'))
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Fantasy Football',
        url: window.location.href.replace('play', 'team-view'),
      })
    } else {
      handleCopy(window.location.href.replace('play', 'team-view'))
    }
  }

  return (
    <section className="relative h-auto w-full ">
      <Image
        src="/icons/stadium.svg"
        alt="stadium"
        width={700}
        height={600}
        draggable={false}
        priority
        className="w-full rounded-xl select-none " 
      />
      {!hideShareButton && (
        <Button
          onClick={handleShare}
          variant={'ghost'}
          className={cn(
            'border-primary xs:bottom-4 xs:right-5 absolute right-4 bottom-3 z-20 size-6 cursor-pointer rounded-sm border bg-transparent p-0 sm:right-7 sm:bottom-5 md:size-7'
          )}
          aria-label="Share"
        >
          <Share2 className="text-primary hover:text-secondary-foreground size-3.5 md:size-4" />
        </Button>
      )}
      {children}
    </section>
  )
}

export default StadiumContainer
