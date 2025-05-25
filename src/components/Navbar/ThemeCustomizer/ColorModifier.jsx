'use client'

import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { useTheme } from 'next-themes'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const colorKeys = {
  base: [
    'background',
    'foreground',
    'card',
    'card-foreground',
    'popover',
    'popover-foreground',
  ],
  primary: [
    'primary',
    'primary-foreground',
    'secondary',
    'secondary-foreground',
  ],
  states: [
    'muted',
    'muted-foreground',
    'accent',
    'accent-foreground',
    'destructive',
    'border',
    'input',
    'ring',
  ],
  charts: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'],
  sidebar: [
    'sidebar',
    'sidebar-foreground',
    'sidebar-primary',
    'sidebar-primary-foreground',
    'sidebar-accent',
    'sidebar-accent-foreground',
    'sidebar-border',
    'sidebar-ring',
  ],
}

const toVarName = (key) => `--${key}`

const ColorModifier = () => {
  const [values, setValues] = useState({})
  const { theme } = useTheme()

  useEffect(() => {
    // Wait for the DOM to be fully rendered to get computed styles
    const loadColorValues = () => {
      const rootStyles = getComputedStyle(document.documentElement)
      const initial = {}
      Object.values(colorKeys)
        .flat()
        .forEach((key) => {
          initial[key] =
            rootStyles.getPropertyValue(toVarName(key)).trim() || '#000000'
        })
      setValues(initial)
    }

    // Initial load
    loadColorValues()

    // Re-load when theme changes
    const observer = new MutationObserver(loadColorValues)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [theme])

  const handleChange = (key, color) => {
    document.documentElement.style.setProperty(toVarName(key), color)
    setValues((prev) => ({ ...prev, [key]: color }))
  }

  const formatColor = (color) => {
    // If color is in shorthand format (e.g., #fd0), expand to full format
    if (/^#([0-9a-f]{3})$/i.test(color)) {
      return color
        .split('')
        .map((char) => char + char)
        .join('')
        .replace('##', '#')
    }
    return color
  }

  const renderColorPicker = (key) => (
    <div key={key} className="mb-2 flex items-center space-x-2">
      <Label htmlFor={key} className="w-48 text-xs capitalize">
        {key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
      </Label>
      <input
        type="color"
        id={key}
        value={formatColor(values[key] || '#000000')}
        onChange={(e) => handleChange(key, e.target.value)}
        className="h-8 w-8 rounded border-none p-0"
      />
      <span className="w-20 font-mono text-xs">{formatColor(values[key])}</span>
    </div>
  )

  return (
    <Accordion className="w-full">
      {Object.entries(colorKeys).map(([category, keys]) => (
        <AccordionItem value={category} key={category}>
          <AccordionTrigger className="text-base">
            {category.charAt(0).toUpperCase() + category.slice(1)} Colors
          </AccordionTrigger>
          <AccordionContent>{keys.map(renderColorPicker)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default ColorModifier
