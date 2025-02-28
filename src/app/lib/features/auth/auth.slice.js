import { createSlice } from '@reduxjs/toolkit'
import { authExtraReducer } from './auth.extraReducer'

const initialState = {
  fingerprint: null,
  user: null,
  agent: null,
  geo: null,
  geoError: null,
  geoLoading: false,
  is_checked: false,
  phoneModal: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserTable: (state, action) => {
      state.user = action.payload
    },
    setUserPhoto: (state, action) => {
      state.user.image = action.payload
    },
    setFingerprint: (state, action) => {
      state.fingerprint = action.payload
    },
    setGeo: (state, action) => {
      state.geo = action.payload
    },
    setAgent: (state, action) => {
      state.agent = action.payload
    },
    setChecked: (state, action) => {
      state.is_checked = action.payload
    },
    setPhoneModal: (state, action) => {
      state.phoneModal = action.payload
    },
  },
  extraReducers: authExtraReducer,
})

export const {
  setUserAuth,
  setUserTable,
  setUserPhoto,
  setFingerprint,
  setGeo,
  setAgent,
  setChecked,
  setLoginMethod,
  setPhoneModal,
} = authSlice.actions

export default authSlice.reducer
