import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useTheme } from 'next-themes'
import { Link } from 'next-view-transitions'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const Hero = () => {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const { theme } = useTheme()
  const [key, setKey] = useState(0)

  // Animation variants
  const bgVariants = {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: 1.05,
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
    exit: {
      scale: 1,
      opacity: 0,
      transition: { duration: 0.6, ease: 'easeIn' },
    },
  }
  const contentVariants = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { duration: 0.45, ease: 'easeIn' },
    },
  }

  useEffect(() => {
    setKey((prev) => prev + 1)
  }, [theme])

  return (
    <section className="relative h-svh w-full overflow-hidden md:h-screen">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          aria-hidden="true"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={bgVariants}
          className="absolute inset-0 -z-10 h-full w-full"
        >
          <Image
            src="/images/Hero.png"
            alt="Hero background"
            fill
            priority
            className="object-cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-background/25 dark:bg-background/60" />
        </motion.div>
      </AnimatePresence>
      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
          className="text-secondary-foreground mx-1 flex h-svh flex-col items-center justify-center gap-6 md:h-screen"
        >
          <div className="xs:gap-1 flex flex-col gap-0 text-center uppercase md:gap-2">
            <h2 className="xs:text-3xl text-2xl font-semibold sm:text-4xl 2xl:text-5xl">
              {t("O'z futbol jamoangizni")}
            </h2>
            <h2 className="xs:text-4xl text-3xl font-bold sm:text-5xl lg:text-6xl 2xl:text-7xl">
              {t('Biz bilan yarating')}
            </h2>
          </div>
          <span className="bg-primary block h-3.5 w-4/5 -skew-x-45 rounded-sm md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3" />
          <section className="flex w-full flex-col items-center justify-center gap-2 text-lg font-bold sm:flex-row">
            {userTable?.id ? (
              <Link
                href="/settings"
                className="border-primary bg-primary hover:bg-primary-foreground text-accent-foreground flex h-16 w-full max-w-64 -skew-x-15 items-center justify-center rounded-sm border-2 font-bold uppercase transition-all"
              >
                {t('Sozlamalar')}
              </Link>
            ) : (
              <Link
                href="/auth"
                className="border-primary bg-primary hover:bg-primary/50 text-accent-foreground flex h-16 w-full max-w-64 -skew-x-15 items-center justify-center rounded-sm border-2 font-bold uppercase transition-all"
              >
                {t("Ro'yxatdan otish")}
              </Link>
            )}
            <Link
              href="/championships"
              className="border-primary text-primary hover:bg-primary/50 text-shadow hover:text-accent-foreground text-shadow-accent-foreground/50 flex h-16 w-full max-w-64 -skew-x-15 items-center justify-center rounded-sm border-2 bg-transparent font-bold uppercase transition-all hover:text-shadow-none dark:text-shadow-none"
            >
              {t("O'yinga kirish")}
            </Link>
          </section>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

export default Hero
