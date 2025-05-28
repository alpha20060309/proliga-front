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
    <div className="w-full space-y-1.5 pb-4">
      <label
        htmlFor="theme-select-trigger"
        className="text-xs font-medium text-[#B0B0B0]"
      >
        {t('Select Theme Preset')}
      </label>
      <Select value={selectedTheme || ''} onValueChange={handleThemeChange}>
        <SelectTrigger
          id="theme-select-trigger"
          className="w-full truncate rounded-md border border-[#4A4A4A] bg-[#2D2D2D] px-3 py-2 text-sm text-[#E0E0E0] focus:border-[#ffdd00] focus:ring-1 focus:ring-[#ffdd00] focus:outline-none"
        >
          <SelectValue
            placeholder={t('Select a Preset')}
            className="placeholder:text-[#757575]"
          />
        </SelectTrigger>
        <SelectContent className="rounded-md border border-[#4A4A4A] bg-[#2D2D2D] text-[#E0E0E0]">
          <SelectGroup>
            {themes.length === 0 && (
              <SelectItem
                value="no-themes"
                disabled
                className="cursor-not-allowed text-[#757575]"
                style={{ padding: '8px 12px' }}
              >
                {t('No presets available')}
              </SelectItem>
            )}
            {themes.map((theme) => (
              <SelectItem
                key={theme.id}
                value={theme.id.toString()}
                className="cursor-pointer rounded-sm px-3 py-2 text-sm hover:bg-[#4A4A4A] focus:bg-[#6E6E6E] focus:text-[#FAFAFA]"
              >
                <div className="flex items-center gap-2">
                  <ThemePreview theme={theme} />
                  <span>{theme.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

const ThemePreview = ({ theme }) => {
  const commonPreviewSize = 'h-6 w-6'
  const commonPreviewDivStyle = `relative flex flex-col items-center justify-between overflow-hidden p-0.5`

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`${commonPreviewSize} ${commonPreviewDivStyle}`}
        style={{
          backgroundColor: theme.dark_theme?.colors?.card || '#1A1A1A', // fallback
          fontFamily: theme.dark_theme?.font || 'sans-serif',
          borderRadius:
            theme.light_theme?.global?.radius !== undefined
              ? `${theme.light_theme.global.radius / 2}rem`
              : undefined,
        }}
        title={`Dark: ${theme.name} (Card: ${theme.dark_theme?.colors?.card})`}
      >
        <div
          className="h-1 w-full shrink-0 rounded-t-xs"
          style={{
            backgroundColor: theme.dark_theme?.colors?.primary || '#333333',
          }}
        ></div>
        <div
          className="my-0.5 h-0.5 w-2.5 shrink-0 rounded-xs" // smaller accent
          style={{
            backgroundColor: theme.dark_theme?.colors?.accent || '#555555',
          }}
        ></div>
        <div className="flex w-full shrink-0 flex-col items-start gap-0.5 px-0.5">
          <div
            className="h-0.5 w-4/5 rounded-full"
            style={{
              backgroundColor:
                theme.dark_theme?.colors?.foreground || '#CCCCCC',
            }}
          ></div>
          <div
            className="h-0.5 w-3/5 rounded-full"
            style={{
              backgroundColor:
                theme.dark_theme?.colors?.foreground || '#CCCCCC',
            }}
          ></div>
        </div>
      </div>

      {/* Light Theme Mini-Website Preview */}
      <div
        className={`${commonPreviewSize} ${commonPreviewDivStyle} border border-[#505050]`} // Darker border for light preview on dark bg
        style={{
          backgroundColor: theme.light_theme?.colors?.card || '#F0F0F0', // fallback
          borderRadius:
            theme.light_theme?.global?.radius !== undefined
              ? `${theme.light_theme.global.radius / 2}rem`
              : undefined,
        }}
        title={`Light: ${theme.name} (Card: ${theme.light_theme?.colors?.card})`}
      >
        <div
          className="h-1 w-full shrink-0 rounded-t-xs"
          style={{
            backgroundColor: theme.light_theme?.colors?.primary || '#DDDDDD',
          }}
        ></div>
        <div
          className="my-0.5 h-0.5 w-2.5 shrink-0 rounded-xs" // smaller accent
          style={{
            backgroundColor: theme.light_theme?.colors?.accent || '#CCCCCC',
          }}
        ></div>
        <div className="flex w-full shrink-0 flex-col items-start gap-0.5 px-0.5">
          <div
            className="h-0.5 w-4/5 rounded-full"
            style={{
              backgroundColor:
                theme.light_theme?.colors?.foreground || '#444444',
            }}
          ></div>
          <div
            className="h-0.5 w-3/5 rounded-full"
            style={{
              backgroundColor:
                theme.light_theme?.colors?.foreground || '#444444',
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default SelectTheme
