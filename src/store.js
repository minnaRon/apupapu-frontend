import { configureStore } from '@reduxjs/toolkit'

import helpReducer from './reducers/helpReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    helps: helpReducer,
    user: userReducer,
    notification: notificationReducer,
  }
})

export default store
