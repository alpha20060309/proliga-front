import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Palette } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ColorModifier from './ColorModifier'
import FontModifier from './FontModifer'
import GlobalModifier from './GlobalModifier'
import ShadowModifier from './ShadowsModifier'
import { Save, Loader2, RefreshCw } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserThemes } from 'app/hooks/user/useUpdateUserThemes/useUpdateUserThemes'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { toast } from 'sonner'
import SelectTheme from './SelectTheme'
import {
  setDarkTheme,
  setLightTheme,
} from 'app/lib/features/systemConfig/systemConfig.slice'
import {
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
} from 'app/utils/default-theme.util'
import { setSelectedTheme } from 'app/lib/features/systemConfig/systemConfig.slice'
import { useState } from 'react'
import { fetchThemes } from 'app/lib/features/systemConfig/systemConfig.thunk'
import { useTranslation } from 'react-i18next'
const ThemeCustomizer = () => {
  const dispatch = useDispatch()
  const [presetName, setPresetName] = useState('')
  const [savePreset, setSavePreset] = useState(false)
  const { darkTheme, lightTheme } = useSelector((state) => state.systemConfig)
  const user = useSelector(selectUserTable)
  const { updateUserThemes, isLoading } = useUpdateUserThemes()
  const { t } = useTranslation()

  const handleSave = async () => {
    try {
      if (!user?.id) {
        toast.error(t('Please Login to save your theme'))
        return
      }
      await updateUserThemes({
        darkTheme,
        lightTheme,
        userTable: user,
        savePreset,
        presetName,
        cb: () => {
          dispatch(fetchThemes())
          setSavePreset(false)
          setPresetName('')
        },
      })
      toast.success(t('Theme saved successfully'))
    } catch (error) {
      toast.error(error)
    }
  }

  const handleReset = async () => {
    if (user?.id) {
      try {
        await updateUserThemes({
          darkTheme: null,
          lightTheme: null,
          userTable: user,
        })
        toast.success(t('Successfully saved the default theme'))
      } catch (error) {
        toast.error(error)
      }
    }
    const themeTypes = ['colors', 'shadows', 'global', 'font']

    themeTypes.forEach((type) => {
      dispatch(setLightTheme({ type, data: DEFAULT_LIGHT_THEME[type] }))
      dispatch(setDarkTheme({ type, data: DEFAULT_DARK_THEME[type] }))
    })

    dispatch(setSelectedTheme(''))

    !user?.id && toast.success(t('Theme is reset to default'))
  }

  return (
    <Sheet>
      <SheetTrigger className="relative flex size-8 items-center justify-center bg-transparent p-0 font-sans font-medium hover:bg-transparent">
        <Palette className="text-foreground hover:text-primary size-5 select-none" />
      </SheetTrigger>
      <SheetContent
        className={
          'xs:min-w-96 min-w-full overflow-y-auto border-l border-[#4A4A4A]'
        }
        style={{
          backgroundColor: '#232323',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          letterSpacing: '0.025em',
          borderRadius: '0px',
          padding: '16px',
          color: '#E0E0E0',
          '--spacing': '0.25rem',
          '--letter-spacing': '0.025em',
          '--radius': '0.25rem',
          '--shadow-color': '#000000',
          '--shadow-opacity': '0.5',
          '--shadow-blur': '10px',
          '--shadow-offset-x': '0px',
          '--shadow-offset-y': '0px',
        }}
      >
        <SheetHeader>
          <SheetTitle className="text-[#E0E0E0]">
            {t('Theme Customizer')}
          </SheetTitle>
        </SheetHeader>
        <button
          onClick={handleReset}
          className="group mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#555555] px-4 py-2.5 text-sm font-medium text-[#E0E0E0] shadow-sm transition-colors hover:bg-[#656565] focus:ring-2 focus:ring-[#757575] focus:ring-offset-2 focus:ring-offset-[#232323] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          aria-label="Reset theme to default"
        >
          <RefreshCw className="size-4 transition-transform group-hover:rotate-180" />
          {t('Reset to Default')}
        </button>
        <SelectTheme />
        <Tabs defaultValue="color" className="mt-4">
          <TabsList className="w-full rounded-[6px] bg-[#333333] p-1">
            <TabsTrigger
              value="color"
              className="w-full rounded-[4px] px-3 py-1.5 text-sm font-medium text-[#A0A0A0] focus-visible:bg-[#fffbe6] focus-visible:text-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#757575] focus-visible:ring-offset-2 focus-visible:ring-offset-[#333333] data-[state=active]:bg-[#4A4A4A] data-[state=active]:text-[#FFFFFF] data-[state=active]:shadow-sm"
            >
              {t('Color')}
            </TabsTrigger>
            <TabsTrigger
              value="font"
              className="w-full rounded-[4px] px-3 py-1.5 text-sm font-medium text-[#A0A0A0] focus-visible:bg-[#fffbe6] focus-visible:text-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#757575] focus-visible:ring-offset-2 focus-visible:ring-offset-[#333333] data-[state=active]:bg-[#4A4A4A] data-[state=active]:text-[#FFFFFF] data-[state=active]:shadow-sm"
            >
              {t('Font')}
            </TabsTrigger>
            <TabsTrigger
              value="global"
              className="w-full rounded-[4px] px-3 py-1.5 text-sm font-medium text-[#A0A0A0] focus-visible:bg-[#fffbe6] focus-visible:text-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#757575] focus-visible:ring-offset-2 focus-visible:ring-offset-[#333333] data-[state=active]:bg-[#4A4A4A] data-[state=active]:text-[#FFFFFF] data-[state=active]:shadow-sm"
            >
              {t('Global')}
            </TabsTrigger>
            <TabsTrigger
              value="shadow"
              className="w-full rounded-[4px] px-3 py-1.5 text-sm font-medium text-[#A0A0A0] focus-visible:bg-[#fffbe6] focus-visible:text-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#757575] focus-visible:ring-offset-2 focus-visible:ring-offset-[#333333] data-[state=active]:bg-[#4A4A4A] data-[state=active]:text-[#FFFFFF] data-[state=active]:shadow-sm"
            >
              {t('Shadow')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="color" className="mt-4">
            <ColorModifier />
          </TabsContent>
          <TabsContent value="font" className="mt-4">
            <FontModifier />
          </TabsContent>
          <TabsContent value="global" className="mt-4">
            <GlobalModifier />
          </TabsContent>
          <TabsContent value="shadow" className="mt-4">
            <ShadowModifier />
          </TabsContent>
        </Tabs>
        <button
          disabled={isLoading}
          onClick={handleSave}
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#ffdd00] px-4 py-2.5 text-sm font-medium text-[#1A1A1A] shadow-sm transition-colors hover:bg-[#ebcb00] focus:ring-2 focus:ring-[#ffdd00] focus:ring-offset-2 focus:ring-offset-[#232323] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          aria-label="Save theme changes"
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4 transition-transform group-hover:scale-110" />
          )}
          {isLoading ? t('Saving...') : t('Save Changes')}
        </button>
        {user?.id && user?.is_admin && (
          <div className="my-4 flex flex-col gap-3 rounded-md border border-[#4A4A4A] bg-[#333333] p-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="save-preset"
                name="save-preset"
                className="h-4 w-4 rounded border-[#666666] bg-[#4A4A4A] text-[#ffdd00] accent-[#ffdd00] focus:ring-2 focus:ring-[#ffdd00] focus:ring-offset-1 focus:ring-offset-[#333333]"
                onChange={(e) => setSavePreset(e.target.checked)}
              />
              <label htmlFor="save-preset" className="text-sm text-[#E0E0E0]">
                {t('Save as a preset')}
              </label>
            </div>

            <input
              type="text"
              placeholder={t('Enter preset name')}
              className="w-full rounded-md border border-[#4A4A4A] bg-[#2D2D2D] px-3 py-2 text-sm text-[#E0E0E0] placeholder:text-[#757575] focus:border-[#ffdd00] focus:ring-1 focus:ring-[#ffdd00] focus:outline-none"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              disabled={!savePreset}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default ThemeCustomizer
