'use client'

import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLogOut } from 'app/hooks/auth/useLogOut'

const SettingsSidebarLogOut = () => {
  const { logOut } = useLogOut()
  const { t } = useTranslation()

  return (
    <button
      onClick={logOut}
      className="bg-destructive/80 hover:bg-destructive text-secondary-foreground hover:bg-opacity-35 flex h-auto w-full cursor-pointer items-center justify-center gap-2 rounded-md p-2 transition-colors lg:mt-auto lg:h-min lg:w-auto lg:justify-start lg:px-8"
    >
      <LogOut className="size-5" />
      <p className="hidden text-nowrap lg:block lg:text-sm">
        {t('Tizimdan chiqish')}
      </p>
    </button>
  )
}

export default SettingsSidebarLogOut
