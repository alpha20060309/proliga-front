'use client'

import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'next-themes'
import { colorKeys, toVarName } from 'app/utils/colors.util'
import { setTheme } from 'app/lib/features/theme/theme.slice'
import { SHADOW_KEYS, updateShadows } from 'app/utils/shadow.utils'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import {
  selectDarkTheme,
  selectLightTheme,
} from 'app/lib/features/theme/theme.selector'

const CustomThemeProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { resolvedTheme } = useTheme()
  const darkTheme = useSelector(selectDarkTheme)
  const lightTheme = useSelector(selectLightTheme)
  const user = useSelector(selectUserTable)

  // useEffect(() => {
  //   if (user?.light_theme?.font) {
  //     dispatch(setTheme({ type: 'light', data: user.light_theme }))
  //   }

  //   if (user?.dark_theme?.font) {
  //     dispatch(setTheme({ type: 'dark', data: user.dark_theme }))
  //   }
  // }, [dispatch, user])

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
