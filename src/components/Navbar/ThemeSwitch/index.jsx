import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const ThemeSwither = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        'text-secondary-foreground relative bg-transparent p-0 hover:bg-transparent dark:hover:bg-transparent',
        theme === 'dark'
          ? 'hover:text-blue-500 dark:hover:text-blue-400'
          : 'hover:text-yellow-500 dark:hover:text-yellow-400'
      )}
      onClick={handleThemeToggle}
      size={'icon'}
    >
      <Sun className="block size-5 transition-all dark:hidden" />
      <Moon className="hidden size-5 transition-all dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeSwither
