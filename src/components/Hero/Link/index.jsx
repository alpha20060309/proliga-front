'use client'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import Link from 'next/link'

const HeroLink = () => {
  const userTable = useSelector(selectUserTable)
  const { t } = useTranslation()

  return userTable?.id ? (
    <Link
      href="/settings"
      className="border-primary bg-primary hover:bg-primary/50 text-primary-foreground animate-fade-in flex h-16 w-full max-w-64 -skew-x-15 items-center justify-center rounded-sm border-2 font-bold uppercase transition-all duration-300"
    >
      {t('Sozlamalar')}
    </Link>
  ) : (
    <Link
      href="/auth"
      className="border-primary bg-primary hover:bg-primary/50 text-primary-foreground animate-fade-in flex h-16 w-full max-w-64 -skew-x-15 items-center justify-center rounded-sm border-2 font-bold uppercase transition-all duration-300"
    >
      {t("Ro'yxatdan otish")}
    </Link>
  )
}

export default HeroLink
