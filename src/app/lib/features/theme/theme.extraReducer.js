import { fetchThemes, fetchUserTheme } from './theme.thunk'

export const themeExtraReducer = (builder) => {
  builder
    .addCase(fetchThemes.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchThemes.fulfilled, (state, action) => {
      state.themes = action.payload?.data || []

      const defaultTheme = action.payload?.data.find((i) => i.is_default)
      state.selectedTheme = String(defaultTheme?.id)
      state.darkTheme = defaultTheme?.dark_theme || {}
      state.lightTheme = defaultTheme?.light_theme || {}
      state.isLoading = false
    })
    .addCase(fetchThemes.rejected, (state, action) => {
      state.error = action?.error?.message
      state.isLoading = false
    })
    .addCase(fetchUserTheme.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchUserTheme.fulfilled, (state, action) => {
      state.themes = [...state.themes, ...action.payload?.data || {}]
      state.isLoading = false
    })
    .addCase(fetchUserTheme.rejected, (state, action) => {
      state.error = action?.error?.message
      state.isLoading = false
    })
}
