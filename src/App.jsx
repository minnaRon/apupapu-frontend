import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/material'
import Notification from './components/Notification'
import HelpForm from './components/help/HelpForm'
import HelpList from './components/help/HelpList'
import Header from './components/Header'
import Footer from './components/Footer'
import { setUserFromStorage } from './reducers/userReducer'
import { initializeHelps } from './reducers/helpReducer'

const App = () => {
  const user = useSelector(state => state.user.user)
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

      {user && (
        <>
          <HelpForm />
          <h3>Tarjoan apua näihin askareisiin:</h3>
          <HelpList filter={h => h.user.id === user.id} />
        </>
      )}

      <h3>Apua saatavilla näihin askareisiin:</h3>
      <HelpList />
      <Footer />
    </Container>
  )
}

export default App
