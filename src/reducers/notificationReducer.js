import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, type: 'info' }

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, { payload }) {
      return payload
    },
  }
})

/**
 * usage:
 * import { notify } from './notificationReducer'
 * dispatch(notify({ message: `message`, type: 'info' or 'alert'}))
 */
export const notify = (notification) => {
  return async(dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(setNotification({ message: null, type: 'info' }))
    }, 3000)
  }
}

export const { setNotification } = slice.actions
export default slice.reducer
