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
    toast.info(t('Buferga muvaffaqiyatli nusxalandi!'), { theme: 'dark' })
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
    <section className="relative h-auto w-full lg:w-full">
      <Image
        src="/icons/stadium.svg"
        alt="stadium"
        width={700}
        height={600}
        draggable={false}
        priority
        className="w-full select-none rounded-xs"
      />
      {!hideShareButton && (
        <Button
          onClick={handleShare}
          className={cn(
            'absolute bottom-3 right-4 z-20 size-6 cursor-pointer border border-primary bg-transparent p-0 xs:bottom-4 xs:right-5 sm:bottom-5 sm:right-7 md:size-7'
          )}
          aria-label="Share"
        >
          <Share2 className="size-3.5 text-primary md:size-4" />
        </Button>
      )}
      {children}
    </section>
  )
}

export default StadiumContainer
