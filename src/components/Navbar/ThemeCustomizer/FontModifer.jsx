import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fonts } from 'app/utils/fonts.util'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from 'next-themes'
import {
  setDarkTheme,
  setLightTheme,
} from 'app/lib/features/systemConfig/systemConfig.slice'
import { useTranslation } from 'react-i18next'

const FontModifier = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { theme } = useTheme()
  const { darkTheme, lightTheme } = useSelector((store) => store.systemConfig)

  const handleFontChange = (font) => {
    theme === 'dark'
      ? dispatch(setDarkTheme({ type: 'font', data: font }))
      : dispatch(setLightTheme({ type: 'font', data: font }))
  }

  return (
    <Card className="w-full rounded-[4px] bg-[#232323] text-[#fff]">
      <CardHeader className="py-2">
        <CardTitle className="text-base">{t('Font')}</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div className="mb-3">
          <select
            id="font-select"
            value={theme === 'dark' ? darkTheme.font : lightTheme.font}
            onChange={(e) => handleFontChange(e.target.value)}
            className="mt-2 w-full rounded-[4px] border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-[#fff] focus:border-[#666] focus:outline-none"
          >
            {Object.keys(fonts).map((fontName) => (
              <option key={fontName} value={fontName}>
                {fontName}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  )
}

export default FontModifier
