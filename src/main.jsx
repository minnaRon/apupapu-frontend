import ReactDOM from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import dayjs from 'dayjs'
import 'dayjs/locale/fi'

import App from './App'
import store from './store'
import './index.css'

dayjs.locale('fi')

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
      <Router>
        <App />
      </Router>
    </LocalizationProvider>
  </Provider>
)
