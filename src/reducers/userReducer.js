import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { notify } from './notificationReducer'
import loginService from '../services/login'
import userService from '../services/user'

const initialState = {
  user: null,
  loading: false,
  error: null
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const user = await loginService.login(credentials)
      userService.setUser(user)
      dispatch(notify({ message: `Tervetuloa ${user.name}!`, type: 'success' }))
      return user
    } catch (err) {
      dispatch(notify({
        message: `kirjautuminen ei onnistunut, ilmeni virhe ${err}`, type: 'error'
      }))
      return rejectWithValue(err.message)
    }
  }
)

export const logoutUser = () => (dispatch) => {
  userService.clearUser()
  dispatch({ type: 'RESET_APP' })
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFromStorage(state) {
      state.user = userService.getUser()
    },
  },
  extraReducers: (builder) => {
    builder
    // Fulfilled-cases
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
    // Matchers loading/error
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true
          state.error = null
        })
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false
        })
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false
          state.error = action.payload || 'Something went wrong'
        })
  }
})

export const { setUserFromStorage } = slice.actions
export default slice.reducer
