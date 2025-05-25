'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const GlobalModifier = ({
  initialSpacing = 0.25,
  initialLetterSpacing = 0.0625,
  initialBorderRadius = 0.25,
  onSpacingChange,
  onLetterSpacingChange,
  onBorderRadiusChange,
}) => {
  const [spacing, setSpacing] = useState(initialSpacing)
  const [letterSpacing, setLetterSpacing] = useState(initialLetterSpacing)
  const [borderRadius, setBorderRadius] = useState(initialBorderRadius)

  useEffect(() => {
    // Get initial values from root styles on component mount
    const rootStyles = getComputedStyle(document.documentElement)
    const initialSpacingValue = parseFloat(
      rootStyles.getPropertyValue('--spacing').trim()
    )
    const initialLetterSpacingValue = parseFloat(
      rootStyles.getPropertyValue('--letter-spacing').trim()
    )
    const initialBorderRadiusValue = parseFloat(
      rootStyles.getPropertyValue('--radius').trim()
    )
    setSpacing(initialSpacingValue)
    setLetterSpacing(initialLetterSpacingValue)
    setBorderRadius(initialBorderRadiusValue)
  }, [])

  const handleSpacingChange = (value) => {
    setSpacing(value)
    document.documentElement.style.setProperty('--spacing', `${value}rem`)
    onSpacingChange?.(value)
  }

  const handleLetterSpacingChange = (value) => {
    setLetterSpacing(value)
    document.documentElement.style.setProperty('--letter-spacing', `${value}em`)
    onLetterSpacingChange?.(value)
  }

  const handleBorderRadiusChange = (value) => {
    setBorderRadius(value)
    document.documentElement.style.setProperty('--radius', `${value}rem`)
    onBorderRadiusChange?.(value)
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
              <div className="flex items-center gap-2">
                <input
                  id="global-spacing-input"
                  type="number"
                  value={spacing}
                  onChange={(e) => {
                    const newValue = Number(e.target.value)
                    handleSpacingChange(newValue)
                  }}
                  min={0.15}
                  max={0.35}
                  step={0.001}
                  className="h-6 w-24 border-[#333] bg-[#1a1a1a] px-2 text-xs text-[#fff]"
                />
                <span className="text-xs text-[#999]">rem</span>
              </div>
            </div>
            <input
              type="range"
              id="global-spacing-slider"
              value={[spacing]}
              min={0.15}
              max={0.35}
              step={0.001}
              onChange={(e) => handleSpacingChange(e.target.value)}
              className="py-1"
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
              <div className="flex items-center gap-2">
                <input
                  id="global-letter-spacing-input"
                  type="number"
                  value={letterSpacing}
                  onChange={(e) => {
                    const newValue = Number(e.target.value)
                    handleLetterSpacingChange(newValue)
                  }}
                  min={-0.05}
                  max={0.05}
                  step={0.001}
                  className="h-6 w-24 border-[#333] bg-[#1a1a1a] px-2 text-xs text-[#fff]"
                />
                <span className="text-xs text-[#999]">em</span>
              </div>
            </div>
            <input
              type="range"
              id="global-letter-spacing-slider"
              value={[letterSpacing]}
              min={-0.1}
              max={0.5}
              step={0.001}
              onChange={(e) => handleLetterSpacingChange(e.target.value)}
              className="py-1"
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
              <div className="flex items-center gap-2">
                <input
                  id="global-radius-input"
                  type="number"
                  value={borderRadius}
                  onChange={(e) => {
                    const newValue = Number(e.target.value)
                    handleBorderRadiusChange(newValue)
                  }}
                  min={0}
                  max={5}
                  step={0.05}
                  className="h-6 w-24 border-[#333] bg-[#1a1a1a] px-2 text-xs text-[#fff]"
                />
                <span className="text-xs text-[#999]">rem</span>
              </div>
            </div>
            <input
              type="range"
              id="global-radius-slider"
              value={[borderRadius]}
              min={0}
              max={5}
              step={0.05}
              onChange={(e) => handleBorderRadiusChange(e.target.value)}
              className="py-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GlobalModifier
