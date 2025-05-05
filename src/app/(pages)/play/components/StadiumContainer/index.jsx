import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const StadiumContainer = ({ children }) => {
  return (
    <section className="relative h-auto w-full lg:w-full">
      <Image
        src="/icons/stadium.svg"
        alt="stadium"
        width={700}
        height={600}
        draggable={false}
        priority
        className="w-full select-none rounded-sm"
      />

      <Button
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Fantasy Football',
              url: window.location.href,
            })
          }
        }}
        className={cn(
          'absolute right-20 top-4 z-20 size-8 border border-primary bg-transparent p-0'
        )}
        aria-label="Share"
      >
        <Share2 className="size-4 text-primary" />
      </Button>
      {children}
    </section>
  )
}

export default StadiumContainer
