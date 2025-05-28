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
      <label htmlFor="theme-select-trigger" className="text-xs font-medium text-[#B0B0B0]">
        {t('Select Theme Preset')}
      </label>
      <Select value={selectedTheme || ''} onValueChange={handleThemeChange}>
        <SelectTrigger
          id="theme-select-trigger"
          className="w-full truncate rounded-md border border-[#4A4A4A] bg-[#2D2D2D] px-3 py-2 text-sm text-[#E0E0E0] focus:border-[#ffdd00] focus:ring-1 focus:ring-[#ffdd00] focus:outline-none"
          style={{
            // Minimal inline styles, primarily for structure if needed. Tailwind classes handle most.
            // backgroundColor: '#2D2D2D', // Handled by className
            // color: '#E0E0E0', // Handled by className
            // borderColor: '#4A4A4A', // Handled by className
            // borderRadius: '6px', // Handled by className
            // padding: '8px 12px', // Handled by className (px-3 py-2)
            // fontSize: '14px', // Handled by className (text-sm)
            // width: '100%', // Handled by className
            // outline: 'none', // Handled by className
          }}
        >
          <SelectValue placeholder={t('Select a Preset')} className="placeholder:text-[#757575]" />
        </SelectTrigger>
        <SelectContent
          className="rounded-md border border-[#4A4A4A] bg-[#2D2D2D] text-[#E0E0E0]"
          style={{
            // backgroundColor: '#2D2D2D', // Handled by className
            // borderColor: '#4A4A4A', // Handled by className
            // borderRadius: '6px', // Handled by className
            // color: '#E0E0E0', // Handled by className
            // fontSize: '14px', // Handled by className (defaults to trigger's size)
          }}
        >
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
                className="cursor-pointer rounded-sm px-3 py-2 text-sm hover:bg-[#4A4A4A] focus:bg-[#4A4A4A]"
                style={{
                  // padding: '8px 12px', // Handled by className
                  // display: 'flex', // Handled by default SelectItem structure or add flex if needed
                  // alignItems: 'center', // Handled by default or add if needed
                  // gap: '8px', // Use space-x-2 on child elements if needed
                  // '&:hover': { // Handled by className hover:bg-[#4A4A4A]
                  //   backgroundColor: '#404040',
                  // },
                }}
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
  // This component's internal styles are theme-dependent, which is its purpose.
  // The container div styles are for layout within the SelectItem.
  // Ensure the container doesn't pick up external theme colors for its own box.
  const commonPreviewSize = 'h-6 w-6' // Reduced size for fitting in select item better
  const commonPreviewDivStyle = `relative flex flex-col items-center justify-between overflow-hidden p-0.5`

  return (
    <div className="flex items-center gap-1.5">
      {/* Dark Theme Mini-Website Preview */}
      <div
        className={`${commonPreviewSize} ${commonPreviewDivStyle}`}
        style={{
          backgroundColor: theme.dark_theme?.colors?.card || '#1A1A1A', // fallback
          fontFamily: theme.dark_theme?.font || 'sans-serif',
          borderRadius:
            theme.dark_theme?.global?.radius !== undefined
              ? `${Math.max(1, theme.dark_theme.global.radius / 4)}rem` // scale down radius
              : '2px', // fallback
          // letterSpacing removed for brevity in preview
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
              backgroundColor: theme.dark_theme?.colors?.foreground || '#CCCCCC',
            }}
          ></div>
          <div
            className="h-0.5 w-3/5 rounded-full"
            style={{
              backgroundColor: theme.dark_theme?.colors?.foreground || '#CCCCCC',
            }}
          ></div>
        </div>
      </div>

      {/* Light Theme Mini-Website Preview */}
      <div
        className={`${commonPreviewSize} ${commonPreviewDivStyle} border border-[#505050]`} // Darker border for light preview on dark bg
        style={{
          backgroundColor: theme.light_theme?.colors?.card || '#F0F0F0', // fallback
          fontFamily: theme.light_theme?.font || 'sans-serif',
          borderRadius:
            theme.light_theme?.global?.radius !== undefined
              ? `${Math.max(1, theme.light_theme.global.radius / 4)}rem` // scale down radius
              : '2px', // fallback
          // letterSpacing removed
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
              backgroundColor: theme.light_theme?.colors?.foreground || '#444444',
            }}
          ></div>
          <div
            className="h-0.5 w-3/5 rounded-full"
            style={{
              backgroundColor: theme.light_theme?.colors?.foreground || '#444444',
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default SelectTheme
