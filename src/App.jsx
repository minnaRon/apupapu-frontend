import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from '@mui/material'
import Notification from './components/Notification'
import Header from './components/Header'
import HelpHomePage from './components/help/HelpHomePage'
import Footer from './components/Footer'
import { setUserFromStorage } from './reducers/userReducer'
import { initializeHelps } from './reducers/helpReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeHelps())
  }, [])

  useEffect(() => {
    dispatch(setUserFromStorage())
  }, [])

  return (
    <Container>
      <Header />
      <Notification />

      <Routes>
        <Route path='/' element={<Navigate to='/helps' />} />
        <Route path='/helps' element={<HelpHomePage />} />
      </Routes>

      <Footer />
    </Container>
  )
}

export default App
