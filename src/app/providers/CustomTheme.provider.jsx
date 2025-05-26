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
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

const CustomThemeProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { theme } = useTheme()
  const { darkTheme, lightTheme } = useSelector((store) => store.systemConfig)
  const user = useSelector(selectUserTable)

  // Load user-specific themes into Redux store when user data is available
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated && user?.id) {
      const { light_theme, dark_theme } = user // Renamed to avoid conflict
      if (light_theme) {
        if (light_theme.colors)
          dispatch(setLightTheme({ type: 'colors', data: light_theme.colors }))
        if (light_theme.shadows)
          dispatch(
            setLightTheme({ type: 'shadows', data: light_theme.shadows })
          )
        if (light_theme.global)
          dispatch(setLightTheme({ type: 'global', data: light_theme.global }))
        if (light_theme.font)
          dispatch(setLightTheme({ type: 'font', data: light_theme.font }))
      }
      if (dark_theme) {
        if (dark_theme.colors)
          dispatch(setDarkTheme({ type: 'colors', data: dark_theme.colors }))
        if (dark_theme.shadows)
          dispatch(setDarkTheme({ type: 'shadows', data: dark_theme.shadows }))
        if (dark_theme.global)
          dispatch(setDarkTheme({ type: 'global', data: dark_theme.global }))
        if (dark_theme.font)
          dispatch(setDarkTheme({ type: 'font', data: dark_theme.font }))
      }
    }
  }, [dispatch, user])

  // Colors: Initialize store from DOM/defaults if empty, and handle theme switches
  useEffect(() => {
    const loadInitialColorValuesIfNeeded = () => {
      const currentStoreColors =
        theme === 'dark' ? darkTheme.colors : lightTheme.colors

      if (!currentStoreColors || Object.keys(currentStoreColors).length === 0) {
        const rootStyles = getComputedStyle(document.documentElement)
        const initialColors = {}
        Object.values(colorKeys)
          .flat()
          .forEach((key) => {
            initialColors[key] =
              rootStyles.getPropertyValue(toVarName(key)).trim() || '#000000'
          })
        if (theme === 'dark') {
          dispatch(setDarkTheme({ type: 'colors', data: initialColors }))
        } else {
          dispatch(setLightTheme({ type: 'colors', data: initialColors }))
        }
      }
    }

    loadInitialColorValuesIfNeeded()

    const observer = new MutationObserver(loadInitialColorValuesIfNeeded)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'], // Observe class changes on <html> for theme switches
    })

    return () => observer.disconnect()
  }, [theme, dispatch, darkTheme.colors, lightTheme.colors])

  // Colors: Apply from Redux store to DOM
  useEffect(() => {
    const colorsToApply =
      theme === 'dark' ? darkTheme.colors : lightTheme.colors
    if (colorsToApply && Object.keys(colorsToApply).length > 0) {
      Object.entries(colorsToApply).forEach(([key, value]) => {
        if (value) {
          document.documentElement.style.setProperty(toVarName(key), value)
        }
      })
    }
  }, [theme, darkTheme.colors, lightTheme.colors])

  // Fonts: Apply from Redux store to DOM
  useEffect(() => {
    const fontToApply = theme === 'dark' ? darkTheme.font : lightTheme.font
    if (fontToApply) {
      document.documentElement.style.setProperty('--font-sans', fontToApply)
      document.body.style.fontFamily = fontToApply
    }
  }, [theme, darkTheme.font, lightTheme.font])

  // Shadows: Initialize store from DOM/defaults if empty, then apply from Redux store to DOM
  useEffect(() => {
    let shadowsToApply =
      theme === 'dark' ? darkTheme.shadows : lightTheme.shadows

    if (!shadowsToApply || Object.keys(shadowsToApply).length === 0) {
      const rootStyles = getComputedStyle(document.documentElement)
      const initialShadowData = Object.fromEntries(
        SHADOW_KEYS.map((key) => {
          let value =
            rootStyles.getPropertyValue(`--${key}`).trim() ||
            DEFAULT_VALUES[key]
          if (
            key in UNITS &&
            value &&
            !isNaN(Number(value)) &&
            typeof value === 'string' &&
            !value.endsWith(UNITS[key])
          ) {
            value = `${value}${UNITS[key]}`
          }
          return [key, value]
        })
      )
      if (theme === 'dark') {
        dispatch(setDarkTheme({ type: 'shadows', data: initialShadowData }))
      } else {
        dispatch(setLightTheme({ type: 'shadows', data: initialShadowData }))
      }
      return // Exit early, let re-run handle application
    }

    // Apply shadows from store to DOM
    if (shadowsToApply && Object.keys(shadowsToApply).length > 0) {
      Object.entries(shadowsToApply).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          document.documentElement.style.setProperty(`--${key}`, String(value))
        }
      })
      updateShadows(shadowsToApply)
    }
  }, [dispatch, theme, darkTheme.shadows, lightTheme.shadows])

  // Global Styles (spacing, letterSpacing, borderRadius): Initialize store from DOM/defaults if empty
  useEffect(() => {
    const currentGlobalConfig =
      theme === 'dark' ? darkTheme.global : lightTheme.global
      
    if (!currentGlobalConfig || Object.keys(currentGlobalConfig).length === 0) {
      const rootStyles = getComputedStyle(document.documentElement)
      const initialGlobalData = {
        spacing:
          parseFloat(rootStyles.getPropertyValue('--spacing').trim()) ||
          DEFAULT_VALUES.spacing,
        letterSpacing:
          parseFloat(rootStyles.getPropertyValue('--letter-spacing').trim()) ||
          DEFAULT_VALUES.letterSpacing,
        borderRadius:
          parseFloat(rootStyles.getPropertyValue('--radius').trim()) ||
          DEFAULT_VALUES.borderRadius,
      }
      if (theme === 'dark') {
        dispatch(setDarkTheme({ type: 'global', data: initialGlobalData }))
      } else {
        dispatch(setLightTheme({ type: 'global', data: initialGlobalData }))
      }
    }
  }, [dispatch, theme, darkTheme.global, lightTheme.global])

  // Global Styles: Apply from Redux store to DOM
  useEffect(() => {
    const globalToApply =
      theme === 'dark' ? darkTheme.global : lightTheme.global
    if (globalToApply) {
      if (globalToApply.spacing !== undefined) {
        document.documentElement.style.setProperty(
          '--spacing',
          `${globalToApply.spacing}rem`
        )
      }
      if (globalToApply.letterSpacing !== undefined) {
        document.documentElement.style.setProperty(
          '--letter-spacing',
          `${globalToApply.letterSpacing}em`
        )
      }
      if (globalToApply.borderRadius !== undefined) {
        document.documentElement.style.setProperty(
          '--radius',
          `${globalToApply.borderRadius}rem`
        )
      }
    }
  }, [theme, darkTheme.global, lightTheme.global])

  return children
}

export default memo(CustomThemeProvider)
