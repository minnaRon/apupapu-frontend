import { configureStore } from '@reduxjs/toolkit'

import helpReducer from './reducers/helpReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import eventReducer from './reducers/eventReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
  reducer: {
    helps: helpReducer,
    user: userReducer,
    notification: notificationReducer,
    filter: filterReducer,
    events: eventReducer,
    comments: commentReducer,
  }
})

export default store
