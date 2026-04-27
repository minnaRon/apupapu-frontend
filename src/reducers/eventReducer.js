import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { eventActionRegistry } from '../domain/eventActionRegistry'
import eventService from '../services/events'
import { notify } from './notificationReducer'

export const initializeEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await eventService.getAll()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const appendEvent = createAsyncThunk(
  'events/create',
  async (content, { dispatch, rejectWithValue }) => {
    try {
      const response = await eventService.create(content)
      dispatch(notify({ message: 'Lisättiin varaus', type: 'success' }))
      console.log('eventsReducer add response', response)
      return response
    } catch (err) {
      dispatch(notify({ message: `Lisääminen ei onnistunut, ilmeni virhe: ${err}`, type: 'error' }))
      return rejectWithValue(err.message)
    }
  }
)

export const updateEvent = createAsyncThunk(
  'events/update',
  async ({ id, action }, { dispatch, rejectWithValue }) => {
    try {
      const builder = eventActionRegistry[action.type]

      if (!builder) {
        throw new Error(`Unknown action type: ${action.type}`)
      }

      const payload = builder(action)

      const response = await eventService.updateEvent(id, payload)

      dispatch(notify({
        message: 'Muokkaus onnistui',
        type: 'success'
      }))

      return response

    } catch (err) {
      dispatch(notify({
        message: err.message,
        type: 'error'
      }))
      return rejectWithValue(err.message)
    }
  }
)

export const removeEvent = createAsyncThunk(
  'events/delete',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await eventService.remove(id)
      dispatch(notify({ message: 'Poisto onnistui', type: 'success' }))
      return id
    } catch (err) {
      dispatch(notify({ message: `Poisto ei onnistunut, tapahtui virhe: ${err}`, type: 'error' }))
      return rejectWithValue(err.message)
    }
  }
)

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      // Fulfilled-cases
      .addCase(initializeEvents.fulfilled, (state, action) => {
        state.events = action.payload
      })
      .addCase(appendEvent.fulfilled, (state, action) => {
        state.events.push(action.payload)
      })
      .addCase(updateEvent.fulfilled, (state, { payload }) => {
        const id = payload.id
        state.events = state.events.map(e =>
          e.id !== id ? e : payload        )
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(e => e.id !== action.payload)
      })
      // Matchers loading/error
      .addMatcher(
        (action) => action.type.startsWith('events/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true
          state.error = null
        })
      .addMatcher(
        (action) => action.type.startsWith('events/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false
        })
      .addMatcher(
        (action) => action.type.startsWith('events/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false
          state.error = action.payload || 'Something went wrong'
        })
  }
})

export default eventSlice.reducer

