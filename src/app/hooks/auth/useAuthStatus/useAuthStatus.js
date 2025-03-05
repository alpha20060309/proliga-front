"use client"

import { useState, useEffect, useCallback } from "react"

const AUTH_KEY = "isAuthenticated"

export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const getStoredAuth = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem(AUTH_KEY) === "true"
      } catch (error) {
        console.error("Error reading from localStorage:", error)
        return false
      }
    }
    return false
  }, [])

  const setStoredAuth = useCallback((value) => {
    setIsAuthenticated(value)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(AUTH_KEY, value.toString())
        window.dispatchEvent(new Event("auth_changed"))
      } catch (error) {
        console.error("Error writing to localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    const initialAuth = getStoredAuth()
    setIsAuthenticated(initialAuth)

    const handleStorageChange = (event) => {
      if (event.key === AUTH_KEY) {
        setIsAuthenticated(event.newValue === "true")
      }
    }

    const handleAuthChange = () => {
      setIsAuthenticated(getStoredAuth())
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("auth_changed", handleAuthChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("auth_changed", handleAuthChange)
    }
  }, [getStoredAuth])

  return { isAuthenticated, setAuth: setStoredAuth }
}

