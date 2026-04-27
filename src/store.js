import { configureStore, combineReducers } from '@reduxjs/toolkit'

import helpReducer from './reducers/helpReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import eventReducer from './reducers/eventReducer'
import commentReducer from './reducers/commentReducer'

const appReducer = combineReducers({
  helps: helpReducer,
  user: userReducer,
  notification: notificationReducer,
  filter: filterReducer,
  events: eventReducer,
  comments: commentReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined
  }
  return appReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer
})

export default store
