'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// Constants
const SHADOW_KEYS = [
  'shadow-color',
  'shadow-opacity',
  'shadow-blur',
  'shadow-spread',
  'shadow-offset-x',
  'shadow-offset-y',
]

const DEFAULT_VALUES = {
  'shadow-color': '0, 0%, 30%',
  'shadow-opacity': '0.08',
  'shadow-blur': '3px',
  'shadow-spread': '0px',
  'shadow-offset-x': '0px',
  'shadow-offset-y': '1px',
}

const UNITS = {
  'shadow-blur': 'px',
  'shadow-spread': 'px',
  'shadow-offset-x': 'px',
  'shadow-offset-y': 'px',
}

const SHADOW_VARIANTS = [
  { name: '2xs', multiplier: 0.5 },
  { name: 'xs', multiplier: 0.75 },
  { name: 'sm', multiplier: 1 },
  { name: '', multiplier: 1.25 },
  { name: 'md', multiplier: 1.5 },
  { name: 'lg', multiplier: 2 },
  { name: 'xl', multiplier: 2.5 },
  { name: '2xl', multiplier: 3 },
]

// Color conversion utilities
const hslToHex = (hsl) => {
  const [h, s, l] = hsl
    .match(/(\d+),\s*(\d+)%?,\s*(\d+)%?/)
    ?.slice(1)
    .map(Number) || [0, 0, 30]
  const s1 = s / 100,
    l1 = l / 100
  const c = (1 - Math.abs(2 * l1 - 1)) * s1
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l1 - c / 2
  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
        ? [x, c, 0]
        : h < 180
          ? [0, c, x]
          : h < 240
            ? [0, x, c]
            : h < 300
              ? [x, 0, c]
              : [c, 0, x]
  const toHex = (n) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const hexToHsl = (hex) => {
  const [r, g, b] =
    hex.length === 4
      ? [hex[1] + hex[1], hex[2] + hex[2], hex[3] + hex[3]].map(
          (x) => parseInt(x, 16) / 255
        )
      : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map(
          (x) => parseInt(x, 16) / 255
        )
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  const l = (max + min) / 2
  const s =
    max === min
      ? 0
      : l > 0.5
        ? (max - min) / (2 - max - min)
        : (max - min) / (max + min)
  const h =
    max === min
      ? 0
      : max === r
        ? ((g - b) / (max - min) + (g < b ? 6 : 0)) * 60
        : max === g
          ? ((b - r) / (max - min) + 2) * 60
          : ((r - g) / (max - min) + 4) * 60
  return `${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
}

// Shadow update utility
const updateShadows = (values) => {
  const {
    'shadow-offset-x': x,
    'shadow-offset-y': y,
    'shadow-blur': blur,
    'shadow-spread': spread,
    'shadow-color': color,
    'shadow-opacity': opacity,
  } = Object.fromEntries(
    Object.entries(DEFAULT_VALUES).map(([k, v]) => [k, values[k] || v])
  )

  SHADOW_VARIANTS.forEach(({ name, multiplier }) => {
    const varName = `--shadow${name ? '-' + name : ''}`

    // Apply multiplier to numeric values
    const xNum = parseFloat(x)
    const yNum = parseFloat(y)
    const blurNum = parseFloat(blur)
    const spreadNum = parseFloat(spread)
    const opacityNum = parseFloat(opacity)

    const finalX = `${xNum * multiplier}px`
    const finalY = `${yNum * multiplier}px`
    const finalBlur = `${blurNum * multiplier}px`
    const finalSpread = `${spreadNum * multiplier}px`
    const finalOpacity = Math.max(0, Math.min(1, opacityNum * multiplier))

    const base = `${finalX} ${finalY} ${finalBlur} ${finalSpread}`

    document.documentElement.style.setProperty(
      varName,
      `${base} hsla(${color}, ${finalOpacity})`
    )
  })
}

const ShadowModifier = () => {
  const [values, setValues] = useState({})

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement)
    const initial = Object.fromEntries(
      SHADOW_KEYS.map((key) => {
        let value =
          rootStyles.getPropertyValue(`--${key}`).trim() || DEFAULT_VALUES[key]
        if (key in UNITS && value && !isNaN(Number(value))) {
          value = `${value}${UNITS[key]}`
        }
        return [key, value]
      })
    )

    setValues(initial)
    Object.entries(initial).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value)
    })
    document.documentElement.style.setProperty(
      '--shadow-color-hsl',
      initial['shadow-color']
    )
    updateShadows(initial)
  }, [])

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
    setValues((prev) => {
      const updated = { ...prev, [key]: value }
      updateShadows(updated)
      return updated
    })
    if (key === 'shadow-color') {
      document.documentElement.style.setProperty('--shadow-color-hsl', value)
    }
  }

  const renderInput = (key) => {
    const label = key.replace('shadow-', '').replace(/-/g, ' ')
    const unit = key in UNITS ? UNITS[key] : ''
    const value = values[key] || DEFAULT_VALUES[key] || ''
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
            value={hslToHex(value)}
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
              type="number"
              id={key}
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

  return (
    <Card className="w-full rounded-[4px] bg-[#232323] text-[#fff]">
      <CardHeader>
        <CardTitle className="text-base">Shadow Properties</CardTitle>
      </CardHeader>
      <CardContent>{SHADOW_KEYS.map(renderInput)}</CardContent>
    </Card>
  )
}

export default ShadowModifier
