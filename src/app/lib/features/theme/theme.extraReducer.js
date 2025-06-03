import { fetchThemes, fetchUserThemes } from './theme.thunk'

export const themeExtraReducer = (builder) => {
  builder
    .addCase(fetchThemes.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchThemes.fulfilled, (state, action) => {
      state.themes = action.payload?.data || []
      state.isModified = false
      if (action.payload?.set_default) {
        const defaultTheme = action.payload?.data.find((i) => i.is_default)
        state.selectedTheme = String(defaultTheme?.id)
        state.darkTheme = defaultTheme?.dark_theme || {}
        state.lightTheme = defaultTheme?.light_theme || {}
      }
      state.isLoading = false
    })
    .addCase(fetchThemes.rejected, (state, action) => {
      state.error = action?.error?.message
      state.isLoading = false
    })
    .addCase(fetchUserThemes.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchUserThemes.fulfilled, (state, action) => {
      state.themes = [...state.themes, ...action.payload?.data || []]
      const theme = action.payload?.data[0]
      state.isModified = false
      if (theme?.user_id) {
        state.selectedTheme = String(theme?.id)
        state.darkTheme = theme.dark_theme || {}
        state.lightTheme = theme.light_theme || {}
      }
      state.isLoading = false
    })
    .addCase(fetchUserThemes.rejected, (state, action) => {
      state.error = action?.error?.message
      state.isLoading = false
    })
}
