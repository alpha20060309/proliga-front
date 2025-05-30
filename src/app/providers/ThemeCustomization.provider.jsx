'use client'

import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'next-themes'
import { colorKeys, toVarName } from 'app/utils/colors.util'
import { setTheme } from 'app/lib/features/systemConfig/systemConfig.slice'
import { SHADOW_KEYS, updateShadows } from 'app/utils/shadow.utils'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

const COLOR_VARS = [
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--popover',
  '--popover-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--destructive',
  '--border',
  '--input',
  '--ring',
  '--chart-1',
  '--chart-2',
  '--chart-3',
  '--chart-4',
  '--chart-5',
  '--sidebar',
  '--sidebar-foreground',
  '--sidebar-primary',
  '--sidebar-primary-foreground',
  '--sidebar-accent',
  '--sidebar-accent-foreground',
  '--sidebar-border',
  '--sidebar-ring',
  '--destructive-foreground',
  '--success',
  '--success-foreground',
  '--warning',
  '--warning-foreground',
  '--error',
  '--error-foreground',
  '--info',
  '--info-foreground',
]
const SHADOW_VARS = [
  '--shadow',
  'shadow-color',
  'shadow-opacity',
  'shadow-blur',
  'shadow-spread',
  'shadow-offset-x',
  'shadow-offset-y',
]

const extractShadowValues = (shadowobj) => {
  const shadowString = shadowobj['shadow']

  if (!shadowString) return {}

  // Match pattern: <offset-x> <offset-y> <blur> <spread> hsla(<hue>, <saturation>%, <lightness>%, <opacity>)
  const regex =
    /^([-\d.]+)px\s+([-\d.]+)px\s+([-\d.]+)px\s+([-\d.]+)px\s+hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)$/
  const matches = shadowString.match(regex)

  if (!matches) return {}

  const [
    ,
    offsetX,
    offsetY,
    blur,
    spread,
    hue,
    saturation,
    lightness,
    opacity,
  ] = matches

  return {
    'shadow-color': `${hue}, ${saturation}%, ${lightness}%`,
    'shadow-opacity': opacity,
    'shadow-blur': `${blur}px`,
    'shadow-spread': `${spread}px`,
    'shadow-offset-x': `${offsetX}px`,
    'shadow-offset-y': `${offsetY}px`,
  }
}

const GLOBAL_VARS = ['--spacing', '--letter-spacing', '--radius']
const FONT_VARS = ['--font-sans']

const CustomThemeProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { resolvedTheme } = useTheme()
  const { darkTheme, lightTheme } = useSelector((store) => store.systemConfig)
  const user = useSelector(selectUserTable)

  const extractStylesFromRootCSS = (variableNames) => {
    if (typeof window === 'undefined') return {} // Guard for SSR environments
    const computedStyles = getComputedStyle(document.documentElement)
    const styles = {}
    variableNames.forEach((varName) => {
      const value = computedStyles.getPropertyValue(varName.trim()).trim()
      if (value) {
        styles[varName] = value // Remove '--' prefix for the key
      }
    })
    return styles
  }

  useEffect(() => {
    // const colors = extractStylesFromRootCSS(COLOR_VARS)
    // const shadows = extractStylesFromRootCSS(SHADOW_VARS)
    // const global = extractStylesFromRootCSS(GLOBAL_VARS)
    // const font = extractStylesFromRootCSS(FONT_VARS)

    // console.log(colors)
    // console.log('shadows', extractShadowValues(shadows))
    // console.log("as",shadows)
    // console.log(global)
    // console.log(font)

    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const light_theme = localStorage.getItem('light_theme')
    const dark_theme = localStorage.getItem('dark_theme')

    if (isAuthenticated) {
      if (light_theme) {
        dispatch(setTheme({ type: 'light', data: JSON.parse(light_theme) }))
      }

      if (dark_theme) {
        dispatch(setTheme({ type: 'dark', data: JSON.parse(dark_theme) }))
      }
      return
    }

    if (user?.light_theme?.font) {
      dispatch(setTheme({ type: 'light', data: user.light_theme }))
      localStorage.setItem('light_theme', JSON.stringify(user.light_theme))
    }

    if (user?.dark_theme?.font) {
      dispatch(setTheme({ type: 'dark', data: user.dark_theme }))
      localStorage.setItem('dark_theme', JSON.stringify(user.dark_theme))
    }
  }, [dispatch, user])

  // Apply colors from Redux store to DOM
  useEffect(() => {
    const currentColors =
      resolvedTheme === 'dark' ? darkTheme?.colors : lightTheme?.colors
    const allColorVars = Object.values(colorKeys).flat().map(toVarName)

    if (!currentColors || !Object.keys(currentColors).length) {
      allColorVars.forEach((varName) => {
        document.documentElement.style.removeProperty(varName)
      })
      return
    }

    allColorVars.forEach((varName) => {
      const originalKey = Object.values(colorKeys)
        .flat()
        .find((key) => toVarName(key) === varName)

      if (originalKey && currentColors[originalKey]) {
        document.documentElement.style.setProperty(
          varName,
          currentColors[originalKey]
        )
      } else {
        document.documentElement.style.removeProperty(varName)
      }
    })
  }, [resolvedTheme, darkTheme.colors, lightTheme.colors])

  // Apply fonts from Redux store to DOM
  useEffect(() => {
    const font = resolvedTheme === 'dark' ? darkTheme.font : lightTheme.font

    document.documentElement.style[font ? 'setProperty' : 'removeProperty'](
      '--font-sans',
      font
    )
    document.body.style.fontFamily = font || ''
  }, [resolvedTheme, darkTheme.font, lightTheme.font])

  // Apply shadows from Redux store to DOM
  useEffect(() => {
    const currentShadows =
      resolvedTheme === 'dark' ? darkTheme.shadows : lightTheme.shadows
    const shadowVars = SHADOW_KEYS.map((key) => `--${key}`)

    if (!currentShadows || !Object.keys(currentShadows).length) {
      shadowVars.forEach((varName) => {
        document.documentElement.style.removeProperty(varName)
      })
      updateShadows({})
      return
    }

    shadowVars.forEach((varName) => {
      const key = varName.substring(2)
      const value = currentShadows[key]

      if (value != null) {
        document.documentElement.style.setProperty(varName, String(value))
      } else {
        document.documentElement.style.removeProperty(varName)
      }
    })

    updateShadows(currentShadows)
  }, [resolvedTheme, darkTheme.shadows, lightTheme.shadows])

  // Apply global styles from Redux store to DOM
  useEffect(() => {
    const globalStyles =
      resolvedTheme === 'dark' ? darkTheme.global : lightTheme.global
    const vars = {
      spacing: { var: '--spacing', unit: 'rem' },
      letterSpacing: { var: '--letter-spacing', unit: 'em' },
      borderRadius: { var: '--radius', unit: 'rem' },
    }

    if (!globalStyles || !Object.keys(globalStyles).length) {
      Object.values(vars).forEach(({ var: varName }) => {
        document.documentElement.style.removeProperty(varName)
      })
      return
    }

    Object.entries(vars).forEach(([key, { var: varName, unit }]) => {
      const value = globalStyles[key]
      if (value != null) {
        document.documentElement.style.setProperty(varName, `${value}${unit}`)
      } else {
        document.documentElement.style.removeProperty(varName)
      }
    })
  }, [resolvedTheme, darkTheme.global, lightTheme.global])

  return children
}

export default memo(CustomThemeProvider)
