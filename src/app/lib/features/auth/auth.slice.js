import { createSlice } from '@reduxjs/toolkit'
import { authExtraReducer } from './auth.extraReducer'

const initialState = {
  fingerprint: null,
  userTable: null,
  userAuth: null,
  agent: null,
  geo: null,
  geoError: null,
  geoLoading: false,
  is_checked: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.userAuth = action.payload
    },
    setUserTable: (state, action) => {
      state.userTable = action.payload
    },
    setUserPhoto: (state, action) => {
      state.userTable.photo = action.payload
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
} = authSlice.actions

export default authSlice.reducer
