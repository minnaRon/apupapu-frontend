import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import HelpForm from './components/HelpForm'
import HelpList from './components/HelpList'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import { logoutUser, setUserFromStorage } from './reducers/userReducer'
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

  const helpFormRef = useRef()

  const handleLogOut = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <h1>Apu&papu</h1>
      <Notification />

      {!user &&
        <Togglable buttonLabel="KIRJAUDU">
          <LoginForm />
        </Togglable>
      }

      {user && (
        <div>
          <div>
            {user.name} kirjautuneena
            <button onClick={handleLogOut} style={{ marginLeft: '20px' }}>
               KIRJAUDU ULOS
            </button>
          </div>
          <Togglable buttonLabel="LISÄÄ UUSI APU" ref={helpFormRef}>
            <HelpForm helpFormRef={helpFormRef} />
          </Togglable>

          <h3>Tarjoan apua näihin askareisiin:</h3>
          <HelpList filter={h => h.user.id === user.id} />
        </div>
      )}

      <h3>Apua saatavilla näihin askareisiin:</h3>
      <HelpList />

      <Footer />
    </div>

  )
}
export default App
