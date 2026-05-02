import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { notify } from './notificationReducer'
import commentService from '../services/comments'

export const initializeComments = createAsyncThunk(
  'comments/fetchAll',
  async ({ helpId, targetUserId }, { getState, rejectWithValue }) => {
    try {
      const userId = getState().user.user.id
      const data = await commentService.getAll(helpId, targetUserId)
      return { data, helpId, userId, targetUserId }
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
  async ({ id, object }, { dispatch, rejectWithValue }) => {
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
    conversations: {
      // key: `${helpId}_${pairKey}`,
      // value: { helpId, pairKey, otherUserId, comments: [] }
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeComments.fulfilled, (state, action) => {
        const { data, helpId } = action.payload
        if (!data || data.length === 0) return
        const pairKey = data[0].pairKey
        const key = `${helpId}_${pairKey}`
        state.conversations[key] = {
          helpId,
          pairKey,
          otherUserId: pairKey
            .split('_')
            .find(id => id !== data[0].sender.id),
          comments: data
        }
      })
      .addCase(appendComment.fulfilled, (state, action) => {
        const comment = action.payload
        const helpId = comment.helpId
        const pairKey = comment.pairKey
        const key = `${helpId}_${pairKey}`
        if (!state.conversations[key]) {
          state.conversations[key] = {
            helpId,
            pairKey,
            otherUserId: pairKey
              .split('_')
              .find(id => id !== (comment.sender.id || comment.sender)),
            comments: []
          }
        }

        state.conversations[key].comments.push(comment)
      })
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        Object.values(state.conversations).forEach(conv => {
          conv.comments = conv.comments.map(c => (c.id !== payload.id ? c : payload))
        })
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        Object.values(state.conversations).forEach(conv => {
          conv.comments = conv.comments.filter(c => c.id !== action.payload)
        })
      })
      // Loading/Error matchers
      .addMatcher(
        (action) => action.type.startsWith('comments/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true
          state.error = null
        })
      .addMatcher(
        (action) => action.type.startsWith('comments/') && action.type.endsWith('/fulfilled'),
        (state) => { state.loading = false })
      .addMatcher(
        (action) => action.type.startsWith('comments/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false
          state.error = action.payload || 'Something went wrong'
        })
  }
})

export default commentSlice.reducer
