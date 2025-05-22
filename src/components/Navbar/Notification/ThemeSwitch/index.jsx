import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeSwither = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant="ghost"
      className="bg-transparent p-0 hover:bg-transparent"
      onClick={handleThemeToggle}
    >
      <Sun className="block size-5 transition-all hover:text-yellow-500 dark:hidden" />
      <Moon className="hidden size-5 transition-all hover:text-blue-600 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeSwither
