import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from '@mui/material'
import Notification from './components/Notification'
import AppInfo from './components/AppInfo'
import Header from './components/Header'
import HelpHomePage from './components/help/HelpHomePage'
import LendHomePage from './components/lend/LendHomePage'
import Footer from './components/Footer'
import { setUserFromStorage } from './reducers/userReducer'
import { initializeHelps } from './reducers/helpReducer'
import { logoutUser } from './reducers/userReducer'
import UserSettingsForm from './components/user/UserSettingsForm'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeHelps())

    const isDesktop = window.innerWidth > 768
    if (isDesktop) {
      const handleBeforeUnload = () => {
        dispatch(logoutUser())
      }
      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
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
        <Route path='/info' element={<AppInfo />} />
        <Route path='/helps' element={<HelpHomePage />} />
        <Route path='/lends' element={<LendHomePage />} />
        <Route path='/user/settings' element={<UserSettingsForm />} />
      </Routes>

      <Footer />
    </Container>
  )
}

export default App
