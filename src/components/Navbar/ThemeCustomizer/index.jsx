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

const ThemeCustomizer = () => {
  const dispatch = useDispatch()
  const { darkTheme, lightTheme } = useSelector((state) => state.systemConfig)
  const user = useSelector(selectUserTable)
  const { updateUserThemes, isLoading } = useUpdateUserThemes()

  const handleSave = async () => {
    try {
      if (!user?.id) {
        toast.error('Please Login to save your theme')
        return
      }
      await updateUserThemes({
        darkTheme,
        lightTheme,
        userTable: user,
      })
      toast.success('Theme saved successfully')
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
        toast.success('Successfully saved the default theme')
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

    !user?.id && toast.success('Theme is reset to default')
  }

  return (
    <Sheet>
      <SheetTrigger className="relative flex size-8 items-center justify-center bg-transparent p-0 font-sans font-medium hover:bg-transparent">
        <Palette className="size-5 text-[#000] select-none hover:text-[#ffdd00] dark:text-[#fff] dark:hover:text-[#ffdd00]" />
      </SheetTrigger>
      <SheetContent
        style={{
          backgroundColor: '#232323',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 'medium',
          letterSpacing: '0.025em',
          borderRadius: '4px',
          padding: '16px',
          color: '#fff',
          '--spacing': '0.25rem',
          '--letter-spacing': '0.025em',
          '--radius': '0.25rem',
        }}
      >
        <SheetHeader>
          <SheetTitle className="text-[#fff] dark:text-[#fff]">
            Theme Customizer
          </SheetTitle>
        </SheetHeader>
        <button
          onClick={handleReset}
          className="group bg-destructive/90 text-destructive-foreground hover:bg-destructive focus:ring-destructive mb-4 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          aria-label="Reset theme to default"
        >
          <RefreshCw className="size-4 transition-transform group-hover:rotate-180" />
          Reset to Default
        </button>
        <SelectTheme />
        <Tabs defaultValue="color">
          <TabsList className="w-full rounded-[4px] bg-[#f5f5f5]">
            <TabsTrigger
              value="color"
              className="rounded-[4px] text-[#1a1a1a] data-[state=active]:bg-[#ffdd00] data-[state=active]:text-[#1a1a1a] dark:text-[#1a1a1a] dark:data-[state=active]:bg-[#ffdd00] dark:data-[state=active]:text-[#1a1a1a]"
            >
              Color
            </TabsTrigger>
            <TabsTrigger
              value="font"
              className="rounded-[4px] text-[#1a1a1a] data-[state=active]:bg-[#ffdd00] data-[state=active]:text-[#1a1a1a] dark:text-[#1a1a1a] dark:data-[state=active]:bg-[#ffdd00] dark:data-[state=active]:text-[#1a1a1a]"
            >
              Font
            </TabsTrigger>
            <TabsTrigger
              value="global"
              className="rounded-[4px] text-[#1a1a1a] data-[state=active]:bg-[#ffdd00] data-[state=active]:text-[#1a1a1a] dark:text-[#1a1a1a] dark:data-[state=active]:bg-[#ffdd00] dark:data-[state=active]:text-[#1a1a1a]"
            >
              Global
            </TabsTrigger>
            <TabsTrigger
              value="shadow"
              className="rounded-[4px] text-[#1a1a1a] data-[state=active]:bg-[#ffdd00] data-[state=active]:text-[#1a1a1a] dark:text-[#1a1a1a] dark:data-[state=active]:bg-[#ffdd00] dark:data-[state=active]:text-[#1a1a1a]"
            >
              Shadow
            </TabsTrigger>
          </TabsList>
          <TabsContent value="color">
            <ColorModifier />
          </TabsContent>
          <TabsContent value="font">
            <FontModifier />
          </TabsContent>
          <TabsContent value="global">
            <GlobalModifier />
          </TabsContent>
          <TabsContent value="shadow">
            <ShadowModifier />
          </TabsContent>
        </Tabs>
        <button
          disabled={isLoading}
          onClick={handleSave}
          className="group bg-primary/90 text-primary-foreground hover:bg-primary focus:ring-primary mt-4 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          aria-label="Save theme changes"
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4 transition-transform group-hover:scale-110" />
          )}
          {isLoading ? 'Saving Changes...' : 'Save Changes'}
        </button>
        {user?.id && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <input
              type="checkbox"
              name="theme-customizer"
              id="theme-customizer"
            />
            <label htmlFor="theme-customizer">Save as a preset</label>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default ThemeCustomizer
