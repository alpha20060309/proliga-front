'use client'

import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'next-themes'
import { colorKeys, toVarName } from 'app/utils/colors.util'
import {
  setDarkTheme,
  setLightTheme,
} from 'app/lib/features/systemConfig/systemConfig.slice'
import { SHADOW_KEYS, updateShadows } from 'app/utils/shadow.utils'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import {
  DEFAULT_LIGHT_THEME,
  DEFAULT_DARK_THEME,
} from 'app/utils/default-theme.util'

const CustomThemeProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { resolvedTheme } = useTheme()
  const { darkTheme, lightTheme } = useSelector((store) => store.systemConfig)
  const user = useSelector(selectUserTable)

  // Load user themes into Redux store
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const themeTypes = ['colors', 'shadows', 'global', 'font']

    if (!isAuthenticated || !user?.id) {
      themeTypes.forEach((type) => {
        dispatch(setLightTheme({ type, data: DEFAULT_LIGHT_THEME[type] }))
        dispatch(setDarkTheme({ type, data: DEFAULT_DARK_THEME[type] }))
      })
      return
    }
    const { light_theme, dark_theme } = user

    if (light_theme?.colors?.length > 0) {
      themeTypes.forEach((type) => {
        if (light_theme[type]) {
          dispatch(setLightTheme({ type, data: light_theme[type] }))
        }
      })
    }

    if (dark_theme?.colors?.length > 0) {
      themeTypes.forEach((type) => {
        if (dark_theme[type]) {
          dispatch(setDarkTheme({ type, data: dark_theme[type] }))
        }
      })
    }
  }, [dispatch, user])

  // Apply colors from Redux store to DOM
  useEffect(() => {
    const currentColors =
      resolvedTheme === 'dark' ? darkTheme.colors : lightTheme.colors
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
