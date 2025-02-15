import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { LANGUAGE } from 'app/utils/languages.util'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserLanguage } from 'app/hooks/user/useUpdateUserLanguage/useUpdateUserLanguage'
import { setLanguage } from 'app/lib/features/systemLanguage/systemLanguage.slice'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

const ChangeLanguageDropdown = () => {
  const dispatch = useDispatch()
  const { lang } = useSelector((store) => store.systemLanguage)
  const userTable = useSelector(selectUserTable)
  const { t, i18n } = useTranslation()
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
    <Select
      onValueChange={(value) => handleChange(value)}
      defaultValue={userTable?.language ?? lang}
      key={userTable?.language ?? lang}
    >
      <SelectTrigger
        aria-label="Change Language"
        className="h-8 w-16 border-none bg-red-400 bg-transparent px-2 md:w-24 xl:w-24"
      >
        <SelectValue placeholder={t('Til')} />
      </SelectTrigger>
      <SelectContent
        aria-label="Language Options: RU, UZ"
        className="w-min rounded-lg"
        align="end"
      >
        <SelectItem value={LANGUAGE.uz}>
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
        </SelectItem>
        <SelectItem value={LANGUAGE.ru}>
          <div className="flex items-center justify-center md:gap-1 xl:gap-2">
            <Image
              src="/icons/russia.svg"
              alt="uzbekistan"
              width={24}
              className="size-6"
              height={24}
            />
            <p className="hidden md:block">РУ</p>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ChangeLanguageDropdown
