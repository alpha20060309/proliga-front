import { Separator } from '@/components/ui/separator'
import { CONFIG_KEY } from 'app/utils/config.util'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import SocialLink from './SocialLink'
import GradientButton from 'components/Button/GradientButton'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'

const Footer = () => {
  const path = usePathname()
  const { t } = useTranslation()
  const config = useSelector(selectSystemConfig)

  const link_email = config[CONFIG_KEY.link_email]?.value ?? ''
  const link_instagram = config[CONFIG_KEY.link_instagram]?.value ?? ''
  const link_telegram = config[CONFIG_KEY.link_telegram]?.value ?? ''

  const navigation = [
    { href: '/about-us', label: t('Biz haqimizda') },
    { href: '/packages', label: t('Paketlar') },
  ]

  const legal = [
    { href: '/regulation', label: t('Qoidalar') },
    { href: '/user-agreement', label: t('Foydalanuvchi shartnomasi') },
  ]

  if (
    path.includes('auth') ||
    path.includes('reset-password') ||
    path.includes('confirm-otp')
  ) {
    return <></>
  }

  return (
    <footer className="w-full border-t border-neutral-700 bg-black text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('Navigatsiya')}</h3>
            <nav className="flex flex-col space-y-2">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('Huquqiy')}</h3>
            <nav className="flex flex-col space-y-2">
              {legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              {t('Bizning ijtimoiy tarmoqlarimiz')}
            </h3>
            <div className="flex space-x-4">
              <SocialLink
                href={link_instagram}
                icon="instagram"
                alt="Instagram"
              />
              <SocialLink href={link_email} icon="mail" alt="Email" />
              <SocialLink href={link_telegram} icon="telegram" alt="Telegram" />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <GradientButton
              href="/prizes"
              className={'w-full max-w-56'}
              variant="solid"
            >
              {t("Sovgalarni ko'rish")}
            </GradientButton>

            <GradientButton
              className={'w-full'}
              href="/championships"
              variant="gradient"
            >
              {t("Chempionatlarga o'tish")}
            </GradientButton>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-muted-foreground b text-center text-sm">
          © {new Date().getFullYear()} {t('Barcha huquqlar himoyalangan')}
        </div>
      </div>
    </footer>
  )
}

export default Footer
