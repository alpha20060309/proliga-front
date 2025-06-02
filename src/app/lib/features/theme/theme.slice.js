import { createSlice } from '@reduxjs/toolkit'
import { themeExtraReducer } from './theme.extraReducer'

const initialState = {
  themes: [],
  lightTheme: {
    colors: {},
    font: "",
    global: {},
    shadows: {},
  },
  darkTheme: {
    colors: {},
    font: "",
    global: {},
    shadows: {},
  },
  selectedTheme: '',
  isModified: false,
  isLoading: false,
  error: null,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      const { type, data } = action.payload

      state.selectedTheme = ''
      state.isModified = true
      switch (type) {
        case 'colors':
          state.darkTheme.colors = data
          break
        case 'font':
          state.darkTheme.font = data
          break
        case 'global':
          state.darkTheme.global = data
          break
        case 'shadows':
          state.darkTheme.shadows = data
          break
      }
    },
    setLightTheme: (state, action) => {
      const { type, data } = action.payload

      state.selectedTheme = ''
      state.isModified = true
      switch (type) {
        case 'colors':
          state.lightTheme.colors = data
          break
        case 'font':
          state.lightTheme.font = data
          break
        case 'global':
          state.lightTheme.global = data
          break
        case 'shadows':
          state.lightTheme.shadows = data
          break
      }
    },
    setTheme: (state, action) => {
      const { type, data } = action.payload

      switch (type) {
        case 'dark':
          state.darkTheme = data
          break
        case 'light':
          state.lightTheme = data
          break
      }
    },
    setSelectedTheme: (state, action) => {
      state.selectedTheme = action.payload
    },
    setThemes: (state, action) => {
      state.themes = action.payload
    },
  },
  extraReducers: themeExtraReducer,
})

export const { setDarkTheme, setLightTheme, setSelectedTheme, setTheme } =
  themeSlice.actions

export default themeSlice.reducer
