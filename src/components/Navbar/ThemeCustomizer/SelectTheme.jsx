'use client'

import { useDispatch, useSelector } from 'react-redux'
import {
  setDarkTheme,
  setLightTheme,
  setSelectedTheme,
} from 'app/lib/features/systemConfig/systemConfig.slice'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

const SelectTheme = () => {
  const dispatch = useDispatch()
  const { selectedTheme, themes } = useSelector((store) => store.systemConfig)
  const { t } = useTranslation()
 

  const handleThemeChange = (value) => {
    dispatch(setSelectedTheme(value))
    const selectedThemeData = themes.find((t) => +t.id === +value)

    if (selectedThemeData) {
      const themeTypes = ['colors', 'shadows', 'global', 'font']

      themeTypes.forEach((type) => {
        dispatch(
          setDarkTheme({
            type,
            data: selectedThemeData.dark_theme[type],
          })
        )
        dispatch(
          setLightTheme({
            type,
            data: selectedThemeData.light_theme[type],
          })
        )
      })
    }
  }

  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-white">{t('Select Theme')}</label>
      <Select value={selectedTheme || ''} onValueChange={handleThemeChange}>
        <SelectTrigger
          style={{
            backgroundColor: '#333333',
            color: '#fff',
            border: '1px solid #404040',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '14px',
            width: '100%',
            outline: 'none',
          }}
        >
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent
          style={{
            backgroundColor: '#333333',
            border: '1px solid #404040',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '14px',
          }}
        >
          <SelectGroup>
            {themes.map((theme) => (
              <SelectItem
                key={theme.id}
                value={theme.id.toString()}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  '&:hover': {
                    backgroundColor: '#404040',
                  },
                }}
              >
                <ThemePreview theme={theme} />
                <span className="ml-2">{theme.name}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

const ThemePreview = ({ theme }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Dark Theme Mini-Website Preview */}
      <div
        className="relative flex h-7 w-7 flex-col items-center justify-between overflow-hidden p-0.5"
        style={{
          backgroundColor: theme.dark_theme.colors.card,
          fontFamily: theme.dark_theme?.font,
          borderRadius:
            theme.dark_theme?.global?.radius !== undefined
              ? `${theme.dark_theme.global.radius / 2}rem`
              : undefined,
          letterSpacing:
            theme.dark_theme?.global?.letterSpacing !== undefined
              ? `${theme.dark_theme.global.letterSpacing}px`
              : undefined,
        }}
        title={`Dark Theme Preview (BG: ${theme.dark_theme.colors.background})`}
      >
        {/* Primary Color Element (Header) */}
        <div
          className="h-1.5 w-full shrink-0 rounded-t-xs"
          style={{
            backgroundColor: theme.dark_theme.colors.primary,
          }}
          title={`Primary: ${theme.dark_theme.colors.primary}`}
        ></div>
        {/* Accent Color Element (Button) */}
        <div
          className="my-0.5 h-1.5 w-3 shrink-0 rounded-xs"
          style={{
            backgroundColor: theme.dark_theme.colors.accent,
          }}
          title={`Accent: ${theme.dark_theme.colors.accent}`}
        ></div>
        {/* Foreground Color "Text Lines" */}
        <div className="flex w-full shrink-0 flex-col items-start gap-0.5 px-0.5">
          <div
            className="h-0.5 w-4/5 rounded-full"
            style={{
              backgroundColor: theme.dark_theme.colors.foreground,
            }}
            title={`Foreground: ${theme.dark_theme.colors.foreground}`}
          ></div>
          <div
            className="h-0.5 w-3/5 rounded-full"
            style={{
              backgroundColor: theme.dark_theme.colors.foreground,
            }}
          ></div>
        </div>
      </div>

      {/* Light Theme Mini-Website Preview */}
      <div
        className="relative flex h-7 w-7 flex-col items-center justify-between overflow-hidden border border-neutral-700 p-0.5"
        style={{
          backgroundColor: theme.light_theme.colors.card,
          fontFamily: theme.light_theme?.font,
          borderRadius:
            theme.light_theme?.global?.radius !== undefined
              ? `${theme.light_theme.global.radius / 2}rem`
              : undefined,
          letterSpacing:
            theme.light_theme?.global?.letterSpacing !== undefined
              ? `${theme.light_theme.global.letterSpacing}px`
              : undefined,
        }}
        title={`Light Theme Preview (BG: ${theme.light_theme.colors.background})`}
      >
        {/* Primary Color Element (Header) */}
        <div
          className="h-1.5 w-full shrink-0 rounded-t-xs"
          style={{
            backgroundColor: theme.light_theme.colors.primary,
          }}
          title={`Primary: ${theme.light_theme.colors.primary}`}
        ></div>
        {/* Accent Color Element (Button) */}
        <div
          className="my-0.5 h-1.5 w-3 shrink-0 rounded-xs"
          style={{
            backgroundColor: theme.light_theme.colors.accent,
          }}
          title={`Accent: ${theme.light_theme.colors.accent}`}
        ></div>
        {/* Foreground Color "Text Lines" */}
        <div className="flex w-full shrink-0 flex-col items-start gap-0.5 px-0.5">
          <div
            className="h-0.5 w-4/5 rounded-full"
            style={{
              backgroundColor: theme.light_theme.colors.foreground,
            }}
            title={`Foreground: ${theme.light_theme.colors.foreground}`}
          ></div>
          <div
            className="h-0.5 w-3/5 rounded-full"
            style={{
              backgroundColor: theme.light_theme.colors.foreground,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default SelectTheme
