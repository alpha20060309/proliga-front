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
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

const ChangeLanguageDropdown = () => {
  const dispatch = useDispatch()
  const { lang } = useSelector((store) => store.systemLanguage)
  const userTable = useSelector(selectUserTable)
  const { i18n } = useTranslation()
  const { updateUserLanguage } = useUpdateUserLanguage()

  const handleChange = async (lang) => {
    if (userTable?.id) {
      return await updateUserLanguage({ lang, userTable })
    } else {
      dispatch(
        setLanguage({
          lang,
          cb: (lang) => i18n.changeLanguage(lang),
        })
      )
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change Language"
        className="border-none bg-transparent"
      >
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-accent dark:hover:text-accent relative bg-transparent p-0 hover:bg-transparent dark:hover:bg-transparent"
        >
          <Globe className="text-foreground size-5" />
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
        </Button>
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
