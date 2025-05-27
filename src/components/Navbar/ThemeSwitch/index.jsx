'use client'

import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="relative size-8 bg-transparent p-0 hover:bg-transparent dark:hover:bg-transparent"
        size={'icon'}
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="block size-5 transition-all dark:hidden" />
        <Moon className="hidden size-5 transition-all dark:block" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        'text-foreground relative size-8 bg-transparent p-0 hover:bg-transparent dark:hover:bg-transparent',
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
