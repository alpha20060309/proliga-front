'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { LANGUAGE } from 'app/utils/languages.util'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserLanguage } from 'app/hooks/user/useUpdateUserLanguage/useUpdateUserLanguage'
import { setLanguage } from 'app/lib/features/systemLanguage/systemLanguage.slice'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { Globe } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import i18nConfig from 'app/lib/i18n.config'
import { useEffect } from 'react'

const ChangeLanguageDropdown = () => {
  const dispatch = useDispatch()
  const { lang } = useSelector((store) => store.systemLanguage)
  const userTable = useSelector(selectUserTable)
  const { updateUserLanguage } = useUpdateUserLanguage()

  const { i18n } = useTranslation()
  const currentLocale = i18n.language
  const router = useRouter()
  const currentPathname = usePathname()

  useEffect(() => {
    if (i18n.language !== lang) {
      dispatch(setLanguage({ lang: i18n.language }))
    }
  }, [i18n.language, dispatch, lang])

  const handleChange = async (newLocale) => {
    console.log(newLocale)
    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname)
      dispatch(setLanguage({ lang: newLocale }))
      if (userTable?.id) {
        return await updateUserLanguage({ lang: newLocale, userTable })
      }
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change Language"
        className="hover:text-accent-foreground dark:hover:text-accent relative flex size-8 items-center justify-center bg-transparent p-0 hover:bg-transparent dark:hover:bg-transparent"
      >
        <Globe className="text-foreground hover:text-accent size-5" />
        <div className="absolute -top-1 -right-1 size-4">
          <Image
            src={
              lang === LANGUAGE.uz
                ? '/icons/uzbekistan.svg'
                : '/icons/russia.svg'
            }
            alt={lang === LANGUAGE.uz ? 'uzbekistan' : 'russia'}
            width={16}
            height={16}
            className="size-4"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        aria-label="Language Options: RU, UZ"
        className="text-foreground w-min rounded"
        align="end"
      >
        <DropdownMenuItem onClick={() => handleChange(LANGUAGE.uz)}>
          <div className="flex items-center justify-center md:gap-1 xl:gap-2">
            <Image
              src="/icons/uzbekistan.svg"
              alt="uzbekistan"
              width={24}
              height={24}
              className="size-6"
            />
            <p className="hidden md:block">UZ</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange(LANGUAGE.ru)}>
          <div className="flex items-center justify-center md:gap-1 xl:gap-2">
            <Image
              src="/icons/russia.svg"
              alt="russia"
              width={24}
              className="size-6"
              height={24}
            />
            <p className="hidden md:block">РУ</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ChangeLanguageDropdown
