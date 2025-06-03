import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Palette } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RefreshCw, Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { toast } from 'sonner'
import { setDefaultTheme } from 'app/lib/features/theme/theme.slice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Switch } from '@/components/ui/switch'
import CreateThemeModal from './components/CreateThemeModal'
import { useResetUserThemes } from 'app/hooks/theme/useResetUserThemes/useResetUserThemes'
import ColorModifier from './components/ColorModifier'
import FontModifier from './components/FontModifer'
import GlobalModifier from './components/GlobalModifier'
import ShadowModifier from './components/ShadowsModifier'
import SelectTheme from './components/SelectTheme'

const ThemeCustomizer = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const user = useSelector(selectUserTable)
  const { t } = useTranslation()
  const [isDefault, setIsDefault] = useState(false)
  const [isGlobal, setIsGlobal] = useState(false)
  const { resetUserThemes, isLoading } = useResetUserThemes()

  const handleReset = async () => {
    if (user?.id) {
      try {
        await resetUserThemes({
          user_id: user.id,
          cb: () => {
            toast.success(t('Successfully saved the default theme'))
          },
        })
      } catch (error) {
        toast.error(error)
      }
    } else {
      dispatch(setDefaultTheme())
      toast.success(t('Theme is reset to default'))
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="relative flex size-8 items-center justify-center bg-transparent p-0 font-sans font-medium hover:bg-transparent">
        <Palette className="text-foreground hover:text-accent size-5 select-none" />
      </SheetTrigger>
      <SheetContent
        className={
          'xs:min-w-md min-w-full gap-0 overflow-y-auto border-l border-[#4A4A4A] bg-transparent'
        }
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          letterSpacing: '0.025em',
          borderRadius: '0px',
          padding: '1rem 1.5rem',
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
        <SheetHeader className={'px-0 py-4'}>
          <SheetTitle className="text-[#E0E0E0]">
            {t('Theme Customizer')}
          </SheetTitle>
        </SheetHeader>
        <SelectTheme />
        <Tabs defaultValue="color" className="mt-4">
          <TabsList className="w-full rounded-[6px] bg-[#333333] p-1 dark:bg-[#212121]">
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
        <section className="mt-2 flex items-center justify-center gap-2">
          <CreateThemeModal
            isDefault={isDefault}
            isGlobal={isGlobal}
            open={open}
            setOpen={setOpen}
          />
          <button
            onClick={handleReset}
            disabled={isLoading}
            className="group flex w-1/2 items-center justify-center gap-2 rounded-md bg-[#555555] px-4 py-2.5 text-sm font-medium text-[#E0E0E0] shadow-sm transition-colors hover:bg-[#656565] focus:ring-2 focus:ring-[#757575] focus:ring-offset-2 focus:ring-offset-[#232323] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            aria-label="Reset theme to default"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <RefreshCw className="size-4 transition-transform group-hover:rotate-180" />
            )}
            {t('Tozalash')}
          </button>
        </section>
        {user?.id && user?.is_admin && (
          <div className="my-4 flex flex-col gap-3 rounded-md border border-[#4A4A4A] bg-[#1A1A1A] p-4">
            <Switch
              aria-readonly
              checked={isDefault}
              onCheckedChange={setIsDefault}
            />
            <label htmlFor="theme-switch">{t('Tema asosiy qilish')}</label>
            <Switch
              aria-readonly
              checked={isGlobal || isDefault}
              onCheckedChange={setIsGlobal}
            />
            <label htmlFor="theme-switch">{t('Temani global qilish')}</label>
          </div>
        )}
        <SheetDescription className={'sr-only'}>
          {t('Theme Customizer')}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default ThemeCustomizer
