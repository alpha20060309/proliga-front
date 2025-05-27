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
import { Save, Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useUpdateUserThemes } from 'app/hooks/user/useUpdateUserThemes/useUpdateUserThemes'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { toast } from 'sonner'

const ThemeCustomizer = () => {
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
          className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-green-500 p-2 text-white"
        >
          {isLoading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <Save className="size-6" />
          )}
          Save
        </button>
      </SheetContent>
    </Sheet>
  )
}

export default ThemeCustomizer
