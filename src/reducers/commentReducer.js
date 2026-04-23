import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit'
import { notify } from './notificationReducer'
import commentService from '../services/comments'

export const initializeComments = createAsyncThunk(
  'comments/fetchAll',
  async (helpId, { rejectWithValue }) => {
    try {
      return await commentService.getAll(helpId)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const appendComment = createAsyncThunk(
  'comments/create',
  async (content, { dispatch, rejectWithValue }) => {
    try {
      const response = await commentService.create(content)
      dispatch(notify({ message: 'Lisättiin kommentteihin', type: 'success' }))
      return response
    } catch (err) {
      dispatch(notify({ message: `Lisääminen ei onnistunut, ilmeni virhe: ${err}`, type: 'error' }))
      return rejectWithValue(err.message)
    }
  }
)

export const updateComment = createAsyncThunk(
  'comments/update',
  async ({ id, editedObject }, { dispatch, rejectWithValue }) => {
    try {
      const response = await commentService.update(id, editedObject)
      dispatch(notify({ message: 'Muokkaaminen onnistui', type: 'success' }))
      return response
    } catch (err) {
      dispatch(notify({ message: `Muokkaaminen ei onnistunut, ilmeni virhe: ${err}`, type: 'error' }))
      return rejectWithValue(err.message)
    }
  }
)

export const removeComment = createAsyncThunk(
  'comments/delete',
  async({ id, object }, { dispatch, rejectWithValue }) => {
    try {
      await commentService.remove(id, object)
      dispatch(notify({ message: 'Poisto onnistui', type: 'success' }))
      return id
    } catch (err) {
      dispatch(notify({ message: `Poisto ei onnistunut, tapahtui virhe: ${err}`, type: 'error' }))
      return rejectWithValue(err.message)
    }
  }
)

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fulfilled-cases
      .addCase(initializeComments.fulfilled, (state, action) => {
        state.comments = action.payload
      })
      .addCase(appendComment.fulfilled, (state, action) => {
        state.comments.push(action.payload)
      })
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        const { id } = payload
        state.comments = state.comments.map(h => h.id !== id ? h : payload)
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(h => h.id !== action.payload)
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

export default commentSlice.reducer

