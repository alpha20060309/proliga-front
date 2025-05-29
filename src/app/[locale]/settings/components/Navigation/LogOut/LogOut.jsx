'use client'

import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'

const SettingsSidebarLogOut = () => {
  const { logOut } = useLogOut()
  const { t } = useTranslation()

  return (
    <button
      onClick={logOut}
      className="bg-destructive/80 hover:bg-destructive text-secondary-foreground hover:bg-opacity-35 lg:mt-auto flex lg:h-min w-full cursor-pointer items-center h-auto justify-center gap-2 rounded-md p-2 transition-colors lg:w-auto lg:justify-start lg:px-8"
    >
      <LogOut className="size-5" />
      <p className="hidden text-nowrap lg:block lg:text-sm">
        {t('Tizimdan chiqish')}
      </p>
    </button>
  )
}

export default SettingsSidebarLogOut
