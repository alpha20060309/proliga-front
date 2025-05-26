'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { colorKeys, toVarName } from 'app/utils/colors.util'
import { useDispatch, useSelector } from 'react-redux'
import {
  setDarkTheme,
  setLightTheme,
} from 'app/lib/features/systemConfig/systemConfig.slice'

const ColorModifier = () => {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const { darkTheme, lightTheme } = useSelector((store) => store.systemConfig)

  const handleChange = (key, color) => {
    document.documentElement.style.setProperty(toVarName(key), color)
    theme === 'dark'
      ? dispatch(setDarkTheme({ type: 'colors', data: { [key]: color } }))
      : dispatch(setLightTheme({ type: 'colors', data: { [key]: color } }))
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
      <label htmlFor={key} className="w-48 text-xs capitalize">
        {key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
      </label>
      <input
        type="color"
        id={key}
        value={formatColor(
          theme === 'dark' ? darkTheme.colors[key] : lightTheme.colors[key]
        )}
        onChange={(e) => handleChange(key, e.target.value)}
        className="h-8 w-8 rounded border-none p-0"
      />
      <span className="w-20 font-mono text-xs">
        {formatColor(
          theme === 'dark' ? darkTheme.colors[key] : lightTheme.colors[key]
        )}
      </span>
    </div>
  )

  return (
    <Accordion className="w-full rounded-[4px] bg-[#232323] text-[#fff]">
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
