import Gutter from 'components/Gutter'
import Image from 'next/image'

export default function PrizesLayout({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden pt-24 pb-12">
      <div aria-hidden="true" className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/images/Hero.png"
          alt="Hero background"
          fill
          priority
          className="animate-in fade-in object-cover duration-500"
          quality={100}
        />
        <div className="animate-in fade-in absolute inset-0 bg-black/30 duration-500 dark:bg-black/60" />
      </div>
      <Gutter>{children}</Gutter>
    </main>
  )
}
