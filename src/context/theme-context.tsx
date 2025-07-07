import { type PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

import { mapDark, mapLight } from '@/utils/map-styles'

type Theme = 'dark' | 'light'
type MapStyles = typeof mapDark | typeof mapLight

type ThemeContext = {
  isDarkTheme: boolean
  handleTheme: () => void
  mapStyles: MapStyles
}

export const ThemeContext = createContext({} as ThemeContext)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeContext must be used within ThemeContextProvider')
  return context
}

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [colorTheme, setColorTheme] = useState<Theme>('dark')
  const [mapStyles, setMapStyles] = useState<MapStyles>(mapDark)

  const updateTheme = (theme: Theme) => {
    document.body.setAttribute('color-theme', theme)
    setMapStyles(theme === 'dark' ? mapDark : mapLight)
    setColorTheme(theme)
  }

  // initialize theme
  useEffect(() => {
    const theme = localStorage.getItem('color-theme')
    if (theme === 'dark' || theme === 'light') {
      updateTheme(theme)
    }
  }, [])

  const handleTheme = () => {
    setColorTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      updateTheme(newTheme)
      localStorage.setItem('color-theme', newTheme)
      return newTheme
    })
  }

  const isDarkTheme = colorTheme === 'dark'

  const themeContextValues = {
    isDarkTheme,
    handleTheme,
    mapStyles,
  }

  return <ThemeContext.Provider value={themeContextValues}>{children}</ThemeContext.Provider>
}
