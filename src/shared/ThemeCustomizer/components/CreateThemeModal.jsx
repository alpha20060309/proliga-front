import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useCreateUserTheme } from 'app/hooks/theme/useCreateUserTheme/useCreateUserTheme'
import { Loader2, Save } from 'lucide-react'
import { fetchThemes } from 'app/lib/features/theme/theme.thunk'
import {
  selectDarkTheme,
  selectLightTheme,
} from 'app/lib/features/theme/theme.selector'
import { useSaveTheme } from 'app/hooks/theme/useSaveTheme/useSaveTheme'
import { selectThemes } from 'app/lib/features/theme/theme.selector'

const CreateThemeModal = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { selectedTheme } = useSelector((store) => store.theme)

  const [name, setName] = useState('')
  const [nameRu, setNameRu] = useState('')
  const user = useSelector(selectUserTable)
  const { createTheme, isLoading } = useCreateUserTheme()
  const darkTheme = useSelector(selectDarkTheme)
  const lightTheme = useSelector(selectLightTheme)
  const { isModified } = useSelector((store) => store.theme)
  const { saveTheme, saveUserTheme } = useSaveTheme()
  const themes = useSelector(selectThemes)
  const handleSave = async (e) => {
    try {
      e.preventDefault()

      if (!user?.id) {
        toast.error(t('Please Login to save your theme'))
        return
      }
      if (!name || !nameRu) {
        toast.error(t('Please enter a name'))
        return
      }

      await createTheme({
        name,
        name_ru: nameRu,
        user_id: user.id,
        dark_theme: darkTheme,
        light_theme: lightTheme,
        cb: () => {
          dispatch(fetchThemes())
          toast.success(t('Theme saved successfully'))
        },
      })
    } catch (error) {
      toast.error(error)
    }
  }

  const handleSavePreset = () => {
    const theme = themes.find((theme) => +theme.id === +selectedTheme)
    if (!theme?.id) return toast.error(t('Theme not found'))

    if (theme?.is_global) {
      saveTheme({
        theme,
        user_id: user?.id,
        cb: () => {
          toast.success(t('Theme saved successfully'))
        },
      })
    } else {
      saveUserTheme({
        theme,
        user_id: user?.id,
        cb: () => {
          toast.success(t('Theme saved successfully'))
        },
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={isModified ? setOpen : handleSavePreset}>
      <DialogTrigger
        className="group flex w-1/2 items-center justify-center gap-2 rounded-md bg-[#ffdd00] px-4 py-2.5 text-sm font-medium text-[#1A1A1A] shadow-sm transition-colors hover:bg-[#ebcb00] focus:ring-2 focus:ring-[#ffdd00] focus:ring-offset-2 focus:ring-offset-[#232323] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        aria-label="Save theme changes"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Save className="size-4 transition-transform group-hover:scale-110" />
        )}
        {t('Saqlash')}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={'mb-4'}>
          <DialogTitle>{t('Create Theme')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className={'flex flex-col gap-4'}>
          <div className="space-y-2">
            <Label>{t('Name in Uzbek')}</Label>
            <Input
              value={name}
              className="border-border border shadow-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('Name in Russian')}</Label>
            <Input
              value={nameRu}
              className="border-border border shadow-md"
              onChange={(e) => setNameRu(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4 transition-transform group-hover:scale-110" />
            )}
            {t('Saqlash')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateThemeModal
