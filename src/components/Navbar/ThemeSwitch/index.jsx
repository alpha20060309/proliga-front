import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import Cookies from 'js-cookie'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)

    Cookies.set('currentTheme', newTheme, {
      expires: 365,
      path: '/',
      domain: window.location.hostname,
      sameSite: 'strict',
    })
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        'text-foreground relative bg-transparent p-0 hover:bg-transparent dark:hover:bg-transparent',
        theme === 'dark'
          ? 'hover:text-blue-500 dark:hover:text-blue-400'
          : 'hover:text-yellow-500 dark:hover:text-yellow-400'
      )}
      onClick={handleThemeToggle}
      size={'icon'}
      aria-label="Toggle theme"
    >
      <Sun className="block size-5 transition-all dark:hidden" />
      <Moon className="hidden size-5 transition-all dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeSwitcher
