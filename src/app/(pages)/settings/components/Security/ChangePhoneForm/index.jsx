'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EditIcon, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import UpdatePhoneNumber from 'components/Modals/UpdatePhoneNumber'

export default function ChangePhoneForm() {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)

  const [updateModalOpen, setUpdateModalOpen] = useState(false)

  return (
    <div className="space-y-1 sm:max-w-96">
      <UpdatePhoneNumber
        isModalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
      <Label
        className="block text-sm font-bold text-neutral-300"
        htmlFor="phone"
      >
        {t('Telefon raqam')}:
      </Label>
      <div className="group relative">
        <Input
          id="phone"
          name="phone"
          type="tel"
          className="h-10 cursor-pointer pr-10"
          placeholder={'99-999-99-99'}
          value={userTable?.phone}
          readOnly
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => setUpdateModalOpen(true)}
          className="absolute bottom-0 right-0 bg-transparent transition-all group-hover:bg-neutral-950"
        >
          <EditIcon className="h-5 w-5 text-neutral-200" />
        </Button>
      </div>
      <div className="relative space-y-1 sm:max-w-96">
        <Label
          className="block text-sm font-bold text-neutral-300"
          htmlFor="confirmPassword"
        >
          {t('Yangi parolni qayta kiriting')}
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          className="h-10 pr-10"
          // type={showConfirmPassword ? 'text' : 'password'}
          // value={confirmPassword}
          // onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute bottom-0 right-0 hover:bg-transparent"
          // onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {true ? (
            <EyeOff className="h-5 w-5 text-neutral-200" />
          ) : (
            <Eye className="h-5 w-5 text-neutral-200" />
          )}
        </Button>
      </div>
      <Button
        className="h-10 w-full rounded border border-black bg-primary/75 text-sm font-semibold text-neutral-900 transition-all hover:bg-primary hover:bg-opacity-100 xs:max-w-48"
        type="submit"
      >
        {false ? (
          <Image
            src="/icons/loading.svg"
            width={24}
            height={24}
            alt="loading"
            className="filter-black mx-auto size-5 animate-spin"
          />
        ) : (
          t('Saqlash')
        )}
      </Button>
    </div>
  )
}
