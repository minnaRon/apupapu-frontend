import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit'
import { notify } from './notificationReducer'
import helpService from '../services/helps'

export const initializeHelps = createAsyncThunk(
  'helps/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await helpService.getAll()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const appendHelp = createAsyncThunk(
  'helps/create',
  async (content, { dispatch, rejectWithValue }) => {
    try {
      const response = await helpService.create(content)
      dispatch(notify({ message: `Lisättiin apuihin: ${response.task}`, type: 'success' }))
      return response
    } catch (err) {
      dispatch(notify({ message: `Lisääminen ei onnistunut, ilmeni virhe: ${err}`, type: 'error' }))
      return rejectWithValue(err.message)
    }
  }
)

export const updateHelp = createAsyncThunk(
  'helps/update',
  async ({ id, editedObject }, { dispatch, rejectWithValue }) => {
    try {
      const response = await helpService.update(id, editedObject)
      dispatch(notify({ message: `Muokkaaminen onnistui: ${response.task} ${response.beans} ${response.description}`, type: 'success' }))
      return response
    } catch (err) {
      dispatch(notify({ message: `Muokkaaminen ei onnistunut, ilmeni virhe: ${err}`, type: 'error' }))
      return rejectWithValue(err.message)
    }
  }
)

export const removeHelp = createAsyncThunk(
  'helps/delete',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await helpService.remove(id)
      dispatch(notify({ message: 'Poisto onnistui', type: 'success' }))
      return id
    } catch (err) {
      dispatch(notify({ message: `Poisto ei onnistunut, tapahtui virhe: ${err}`, type: 'error' }))
      return rejectWithValue(err.message)
    }
  }
)

const helpSlice = createSlice({
  name: 'helps',
  initialState: {
    helps: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fulfilled-cases
      .addCase(initializeHelps.fulfilled, (state, action) => {
        state.helps = action.payload
      })
      .addCase(appendHelp.fulfilled, (state, action) => {
        state.helps.push(action.payload)
      })
      .addCase(updateHelp.fulfilled, (state, { payload }) => {
        const { id } = payload
        state.helps = state.helps.map(h => h.id !== id ? h : payload)
      })
      .addCase(removeHelp.fulfilled, (state, action) => {
        state.helps = state.helps.filter(h => h.id !== action.payload)
      })
      // Matchers loading/error
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

export default helpSlice.reducer

