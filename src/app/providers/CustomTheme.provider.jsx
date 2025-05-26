'use client'

import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'next-themes'
import { colorKeys, toVarName } from 'app/utils/colors.util'
import {
  setDarkTheme,
  setLightTheme,
} from 'app/lib/features/systemConfig/systemConfig.slice'
import {
  SHADOW_KEYS,
  DEFAULT_VALUES,
  UNITS,
  updateShadows,
} from 'app/utils/shadow.utils'

const CustomThemeProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { theme } = useTheme()
  const { darkTheme, lightTheme } = useSelector((store) => store.systemConfig)

  // Colors
  useEffect(() => {
    const loadColorValues = () => {
      const rootStyles = getComputedStyle(document.documentElement)
      const initial = {}
      Object.values(colorKeys)
        .flat()
        .forEach((key) => {
          initial[key] =
            rootStyles.getPropertyValue(toVarName(key)).trim() || '#000000'
        })
      theme === 'dark'
        ? dispatch(setDarkTheme({ type: 'colors', data: initial }))
        : dispatch(setLightTheme({ type: 'colors', data: initial }))
    }

    loadColorValues()

    const observer = new MutationObserver(loadColorValues)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [theme, dispatch])

  // Fonts
  useEffect(() => {
    if (darkTheme.font || lightTheme.font) {
      document.documentElement.style.setProperty(
        '--font-sans',
        theme === 'dark' ? darkTheme.font : lightTheme.font
      )

      document.body.style.fontFamily =
        theme === 'dark' ? darkTheme.font : lightTheme.font
    }
  }, [theme, darkTheme.font, lightTheme.font])

  // Shadows
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

    theme === 'dark'
      ? dispatch(setDarkTheme({ type: 'shadows', data: initial }))
      : dispatch(setLightTheme({ type: 'shadows', data: initial }))

    Object.entries(initial).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value)
    })
    updateShadows(initial)
  }, [dispatch, theme])

  //Global
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
    theme === 'dark'
      ? dispatch(
          setDarkTheme({
            type: 'global',
            data: {
              spacing: initialSpacingValue,
              letterSpacing: initialLetterSpacingValue,
              borderRadius: initialBorderRadiusValue,
            },
          })
        )
      : dispatch(
          setLightTheme({
            type: 'global',
            data: {
              spacing: initialSpacingValue,
              letterSpacing: initialLetterSpacingValue,
              borderRadius: initialBorderRadiusValue,
            },
          })
        )
  }, [dispatch, theme])

  return children
}

export default memo(CustomThemeProvider)
