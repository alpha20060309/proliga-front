'use client'

import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLogOut } from 'app/hooks/auth/useLogOut'
import { Button } from '@/components/ui/button'

const SettingsSidebarLogOut = () => {
  const { logOut } = useLogOut()
  const { t } = useTranslation()

  return (
    <Button
      onClick={logOut}
      variant={'destructive'}
      className="hover:bg-opacity-50 flex h-auto w-full cursor-pointer items-center justify-center gap-2 p-2 transition-colors lg:mt-auto lg:h-min lg:w-auto lg:justify-start lg:px-8"
    >
      <LogOut className="size-5" />
      <p className="hidden text-nowrap lg:block lg:text-sm">
        {t('Tizimdan chiqish')}
      </p>
    </Button>
  )
}

export default SettingsSidebarLogOut
