import { configureStore } from '@reduxjs/toolkit'

import helpReducer from './reducers/helpReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    helps: helpReducer,
    user: userReducer,
    notification: notificationReducer,
    filter: filterReducer,
  }
})

export default store
