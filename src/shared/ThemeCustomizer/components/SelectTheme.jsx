'use client'

import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedTheme,
  setTheme,
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
import ThemePreview from './ThemePreview'

const SelectTheme = () => {
  const dispatch = useDispatch()
  const { selectedTheme, themes } = useSelector((store) => store.systemConfig)
  const { t } = useTranslation()

  const handleThemeChange = (value) => {
    dispatch(setSelectedTheme(value))
    const selectedThemeData = themes.find((t) => +t.id === +value)

    if (selectedThemeData) {
      dispatch(setTheme({ type: 'dark', data: selectedThemeData.dark_theme }))
      dispatch(setTheme({ type: 'light', data: selectedThemeData.light_theme }))
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
          className="w-full truncate rounded-md border border-[#4A4A4A] bg-[#2D2D2D] px-3 py-2 text-sm text-[#E0E0E0] focus:border-[#ffdd00] focus:ring-1 focus:ring-[#ffdd00] focus:outline-none data-[placeholder]:text-[#a5a5a5]"
        >
          <SelectValue placeholder={t('Select a Preset')} />
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

export default SelectTheme
