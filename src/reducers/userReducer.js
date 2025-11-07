import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit'
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
      dispatch(notify({ message: `Tervetuloa ${user.name}!`, type: 'info' }))
      return user
    } catch (err) {
      dispatch(notify({ message: `kirjautuminen ei onnistunut, ilmeni virhe ${err}`, type: 'alert' }))
      return rejectWithValue(err.message)
    }
  }
)

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFromStorage(state) {
      state.user = userService.getUser()
    },
    logoutUser(state) {
      userService.clearUser()
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
    // Fulfilled-tapaukset
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
    // Matcherit loading/error
      .addMatcher(isPending, (state) => {
        state.loading = true
        state.error = null
      })
      .addMatcher(isFulfilled, (state) => {
        state.loading = false
      })
      .addMatcher(isRejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong'
      })
  }
})

export const { setUserFromStorage, logoutUser } = slice.actions
export default slice.reducer
