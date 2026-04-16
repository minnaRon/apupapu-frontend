//AI
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import helpReducer from './reducers/helpReducer' // 👈 oikea reducer

export function renderWithProviders(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        user: (state = { user: null }) => state,
        helps: helpReducer,   // 👈 TÄRKEÄ
        filter: (state = '') => state
      },
      preloadedState
    })
  } = {}
) {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  )
}
