import { Link } from 'next-view-transitions'
import Image from 'next/image'
import initTranslations from 'app/lib/i18n'
import HeroLink from './Link'

const Hero = async ({ params }) => {
  const { locale } = await params
  const { t } = await initTranslations(locale)

  return (
    <section className="relative h-svh w-full overflow-hidden md:h-screen">
      {/* Background Image */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full">
        <Image
          src="/images/Hero.png"
          alt="Hero background"
          fill
          priority
          className="animate-in fade-in object-cover duration-500"
          quality={100}
        />
        <div className="animate-in fade-in bg-black/30 dark:bg-black/60 absolute inset-0 duration-500" />
      </div>
      <div className="text-secondary-foreground mx-1 flex h-svh flex-col items-center justify-center gap-6 md:h-screen">
        <div className="xs:gap-1 flex flex-col gap-0 text-center uppercase antialiased md:gap-2">
          <h2 className="xs:text-3xl text-2xl font-semibold sm:text-4xl 2xl:text-5xl">
            {t("O'z futbol jamoangizni")}
          </h2>
          <h2 className="xs:text-4xl text-3xl font-bold sm:text-5xl lg:text-6xl 2xl:text-7xl">
            {t('Biz bilan yarating')}
          </h2>
        </div>
        <span className="bg-primary animate-fade-in block h-3.5 w-4/5 -skew-x-45 rounded-sm duration-300 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3" />
        <section className="flex w-full flex-col items-center justify-center gap-2 text-lg font-bold sm:flex-row">
          <HeroLink />
          <Link
            href="/championships"
            className="border-primary text-primary hover:bg-primary/50 text-shadow hover:text-primary-foreground text-shadow-accent-foreground/50 animate-fade-in flex h-16 w-full max-w-64 items-center justify-center rounded-sm border-2 bg-transparent font-bold uppercase transition-all duration-500 hover:text-shadow-none dark:text-shadow-none"
            style={{ transform: 'skewX(-15deg)' }}
          >
            {t("O'yinga kirish")}
          </Link>
        </section>
      </div>
    </section>
  )
}

export default Hero
