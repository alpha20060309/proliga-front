'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  hexToHsl,
  DEFAULT_VALUES,
  UNITS,
  SHADOW_KEYS,
  updateShadows,
} from 'app/utils/shadow.utils'
import { useSelector, useDispatch } from 'react-redux'
import {
  setDarkTheme,
  setLightTheme,
} from 'app/lib/features/systemConfig/systemConfig.slice'
import { useTheme } from 'next-themes'

const ShadowModifier = () => {
  const { theme } = useTheme()
  const { darkTheme, lightTheme } = useSelector((store) => store.systemConfig)
  const dispatch = useDispatch()

  const handleChange = (key, value) => {
    if (
      key in UNITS &&
      value &&
      !isNaN(Number(value)) &&
      !value.endsWith(UNITS[key])
    ) {
      value = `${value}${UNITS[key]}`
    }
    document.documentElement.style.setProperty(`--${key}`, value)
    theme === 'dark'
      ? dispatch(
          setDarkTheme({
            type: 'shadows',
            data: { ...darkTheme.shadows, [key]: value },
          })
        )
      : dispatch(
          setLightTheme({
            type: 'shadows',
            data: { ...lightTheme.shadows, [key]: value },
          })
        )
    updateShadows({ [key]: value })
  }

  const renderInput = (key) => {
    const label = key.replace('shadow-', '').replace(/-/g, ' ')
    const unit = key in UNITS ? UNITS[key] : ''
    const value =
      theme === 'dark'
        ? darkTheme.shadows[key]
        : lightTheme.shadows[key] || DEFAULT_VALUES[key] || ''
    if (!value) return

    const numericValue = value.replace(/[^\d.-]/g, '')

    if (key === 'shadow-color') {
      return (
        <div key={key} className="mb-2 flex items-center space-x-2">
          <label htmlFor={key} className="w-48 text-xs capitalize">
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </label>
          <input
            type="color"
            id={key}
            value={value}
            onChange={(e) => handleChange(key, hexToHsl(e.target.value))}
            className="h-8 w-8 rounded border-none p-0"
          />
          <span className="w-32 font-mono text-xs">{value}</span>
        </div>
      )
    }

    return (
      <div key={key} className="mb-2 flex items-center space-x-2">
        <label htmlFor={key} className="w-48 text-xs capitalize">
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </label>
        {key === 'shadow-opacity' ? (
          <div className="flex w-full items-center space-x-2">
            <input
              type="range"
              value={[parseFloat(value) || 0]}
              min={0}
              max={1}
              step={0.01}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full"
            />
            <input
              type="number"
              value={numericValue}
              onChange={(e) => handleChange(key, e.target.value)}
              min={0}
              max={1}
              step={0.01}
              className="h-8 w-20 border border-black px-2 text-xs"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="range"
              id={key}
              min={0}
              max={10}
              step={0.1}
              value={numericValue}
              onChange={(e) => handleChange(key, e.target.value)}
              className="h-8 w-24 border border-black px-2 text-xs"
            />
            {unit && <span className="text-xs">{unit}</span>}
          </div>
        )}
        {key !== 'shadow-color' && key !== 'shadow-opacity' && (
          <span className="w-20 font-mono text-xs">{value}</span>
        )}
      </div>
    )
  }
  // Shadow preview elements
  const previewShadows = (
    <div className="mt-6 grid grid-cols-4 gap-4">
      <div className="bg-card rounded p-3 text-xs shadow-xs">shadow-xs</div>
      <div className="bg-card rounded p-3 text-xs shadow-sm">shadow-sm</div>
      <div className="bg-card rounded p-3 text-xs shadow">shadow</div>
      <div className="bg-card rounded p-3 text-xs shadow-md">shadow-md</div>
      <div className="bg-card rounded p-3 text-xs shadow-lg">shadow-lg</div>
      <div className="bg-card rounded p-3 text-xs shadow-xl">shadow-xl</div>
      <div className="bg-card rounded p-3 text-xs shadow-2xl">shadow-2xl</div>
    </div>
  )

  return (
    <Card className="w-full rounded-[4px] bg-[#232323] text-[#fff]">
      <CardHeader>
        <CardTitle className="text-base shadow">Shadow Properties</CardTitle>
      </CardHeader>
      <CardContent>
        {SHADOW_KEYS.map(renderInput)}
        {previewShadows}
      </CardContent>
    </Card>
  )
}

export default ShadowModifier
