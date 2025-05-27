'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { useSelector, useDispatch } from 'react-redux'
import {
  setDarkTheme,
  setLightTheme,
} from 'app/lib/features/systemConfig/systemConfig.slice'

const GlobalModifier = () => {
  const dispatch = useDispatch()
  const { theme } = useTheme()
  const { darkTheme, lightTheme } = useSelector((store) => store.systemConfig)

  const handleChange = (type, value, key) => {
    theme === 'dark'
      ? dispatch(
          setDarkTheme({
            type: 'global',
            data: { ...darkTheme.global, [key]: value },
          })
        )
      : dispatch(
          setLightTheme({
            type: 'global',
            data: { ...lightTheme.global, [key]: value },
          })
        )
    document.documentElement.style.setProperty(`--${type}`, `${value}rem`)
  }

  return (
    <div className="flex w-full gap-4 space-y-4">
      <Card className="w-full rounded-[4px] bg-[#232323]">
        <CardHeader className="py-2">
          <CardTitle className="text-base text-[#fff]">
            Global Style Modifiers
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="mb-3">
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="global-spacing-slider"
                className="text-lg font-medium text-[#fff]"
              >
                Spacing Size
              </label>
              <span className="text-xs text-[#999]">
                {theme === 'dark'
                  ? darkTheme.global.spacing
                  : lightTheme.global.spacing}
                rem
              </span>
            </div>
            <input
              type="range"
              id="global-spacing-slider"
              value={
                theme === 'dark'
                  ? darkTheme.global.spacing
                  : lightTheme.global.spacing
              }
              min={0.15}
              max={0.35}
              step={0.001}
              onChange={(e) =>
                handleChange('spacing', e.target.value, 'spacing')
              }
              className="w-full py-1"
            />
          </div>

          <div className="mb-3">
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="global-letter-spacing-slider"
                className="text-lg font-medium text-[#fff]"
              >
                Letter Spacing
              </label>
              <span className="text-xs text-[#999]">
                {theme === 'dark'
                  ? darkTheme.global.letterSpacing
                  : lightTheme.global.letterSpacing}
                rem
              </span>
            </div>
            <input
              type="range"
              id="global-letter-spacing-slider"
              value={
                theme === 'dark'
                  ? darkTheme.global.letterSpacing
                  : lightTheme.global.letterSpacing
              }
              min={-0.1}
              max={0.5}
              step={0.001}
              onChange={(e) =>
                handleChange('letter-spacing', e.target.value, 'letterSpacing')
              }
              className="w-full py-1"
            />
          </div>
          <div className="mb-3">
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="global-radius-slider"
                className="text-lg font-medium text-[#fff]"
              >
                Border Radius
              </label>
              <span className="text-xs text-[#999]">
                {theme === 'dark'
                  ? darkTheme.global.radius
                  : lightTheme.global.radius}
                rem
              </span>
            </div>
            <input
              type="range"
              id="global-radius-slider"
              value={
                theme === 'dark'
                  ? darkTheme.global.radius
                  : lightTheme.global.radius
              }
              min={0}
              max={5}
              step={0.05}
              onChange={(e) => handleChange('radius', e.target.value, 'radius')}
              className="w-full py-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GlobalModifier
