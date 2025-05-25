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

const ThemeCustomizer = () => {
  return (
    <Sheet>
      <SheetTrigger className="hover:text-accent-foreground dark:hover:text-accent relative flex size-8 items-center justify-center bg-transparent p-0 hover:bg-transparent dark:hover:bg-transparent">
        <Palette className="hover:text-accent text-foreground size-5 select-none" />
      </SheetTrigger>
      <SheetContent className={'px-4'}>
        <SheetHeader>
          <SheetTitle>Theme Customizer</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="color">
          <TabsList className={'w-full'}>
            <TabsTrigger value="color">Color</TabsTrigger>
            <TabsTrigger value="font">Font</TabsTrigger>
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="shadow">Shadow</TabsTrigger>
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
      </SheetContent>
    </Sheet>
  )
}

export default ThemeCustomizer
