import { useState, useEffect, useRef } from 'react'
import Footer from './components/Footer'
import helpService from './services/helps'
import loginService from './services/login'
import Help from './components/Help'
import Notification from './components/Notification'
import HelpForm from './components/HelpForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'  



const App = () => {
  const [helps, setHelps] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    helpService
      .getAll()
      .then(initialHelps => {
        setHelps(initialHelps)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedHelpAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      helpService.setToken(user.token)
    }
  }, [])

  const helpFormRef = useRef()

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000);
  }

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedHelpAppUser', JSON.stringify(user)
      ) 
      helpService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      notify('kirjautuminen ei onnistunut, tarkista antamasi tiedot', 'alert')
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addHelp = (helpObject) => {
    helpFormRef.current.toggleVisibility()
    helpService
      .create(helpObject)
      .then(returnedHelp => {
        setHelps(helps.concat(returnedHelp))
        notify(`Apu: ${returnedHelp.task} vaihdetaan papuihin ${returnedHelp.beans} lisätty \u{1F970}`)
      })
      .catch(error => {
      notify(`Apua ${helpObject.task} ei voinut lisätä, virhe: ${error.message}`)
    })
  }

  const removeHelp = id => {
    const toRemove = helps.find(h => h.id === id)
    const ok = window.confirm(`Poistetaanko apu: ${toRemove.task}?`)
    if (ok) {
      helpService
        .remove(id)
        .then(() => {
        setHelps(helps.filter(h => h.id !== id))
        notify(`Poistettiin apu ${toRemove.task}`)
        })
        .catch(error => {
          notify(`virhe: ${error.message}`)
        })
    }
  }

   return (
    <div>
      <h1>Apu&papu</h1>
      <Notification notification={notification} />

      {!user &&
        <Togglable buttonLabel="KIRJAUDU">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
          />
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
              <HelpForm createHelp={addHelp} />
           </Togglable>

        <h3>Tarjoan apua näihin askareisiin:</h3>
           <ul>
             {helps
               .filter(h => h.user.username === user.username)
               .reverse()
               .map(help =>
                <Help
                  key={help.id}
                  help={help}
                  removeHelp={() => removeHelp(help.id)}
                />
              )}
           </ul>
        </div>
       )}

        <h3>Apua saatavilla näihin askareisiin:</h3>
        <ul>
         {helps
          .sort((a, b) => a.task.localeCompare(b.task))
          .map(help =>
            <Help
              key={help.id}
              help={help}
            />
         )}
       </ul>

      <Footer />
     </div>
     
  )
}
export default App
