import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import helpService from './services/helps'
import loginService from './services/login'
import Help from './components/Help'
import Notification from './components/Notification'
import HelpForm from './components/HelpForm'
import LoginForm from './components/LoginForm'


const App = () => {
  const [helps, setHelps] = useState([])
  const [newTittle, setNewTittle] = useState('apuna tässä tehtävässä..')
  const [newDescription, setNewDescription] = useState('')
  const [newBeans, setNewBeans] = useState(0)
  const [showDescription, setShowDescription] = useState(false)
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
      console.log(user.token)
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

  const handleTittleChange = (event) => {
    setNewTittle(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }
  const handleBeansChange = (event) => {
    setNewBeans(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addHelp = (event) => {
  event.preventDefault()
  const helpObject = {
    tittle: newTittle,
    description: newDescription || 'ei tarkempaa kuvausta',
    beans: newBeans
  }
    helpService
      .create(helpObject)
      .then(returnedHelp => {
        setHelps(helps.concat(returnedHelp))
        notify(`Apu: ${returnedHelp.tittle} vaihdetaan papuihin ${returnedHelp.beans} lisätty \u{1F970}`)
        setNewTittle('')
        setNewDescription('')
        setNewBeans(0)
      })
      .catch(error => {
      notify(`Apua ${newTittle} ei voinut lisätä, virhe: ${error.message}`)
    })
  }

  const removeHelp = id => {
    const toRemove = helps.find(h => h.id === id)
    const ok = window.confirm(`Poistetaanko apu: ${toRemove.tittle}?`)
    if (ok) {
      helpService.remove(id).then(() => {
        setHelps(helps.filter(h => h.id !== id))
        notify(`Poistettiin apu ${toRemove.tittle}`)
      })
    }
  }

   return (
    <div>
       <h1>Apu&papu</h1>
       <Notification notification={notification} />
        {!user && 
         <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
         />
        }
       {user && (
        <div>
          <div>
            {user.name} kirjautuneena
            <button onClick={handleLogOut} style={{ marginLeft: '20px' }}>KIRJAUDU ULOS</button>
          </div>
          <h3>Lisää uusi:</h3>
          <HelpForm
            addHelp={addHelp}
            tittle={newTittle}
            description={newDescription}
            beans={newBeans}
            handleTittleChange={handleTittleChange}
            handleDescriptionChange={handleDescriptionChange}
            handleBeansChange={handleBeansChange}
           />
         </div>
       )}
        <h3>Voin auttaa näissä tehtävissä:</h3>
        <ul>
         {helps.map(help =>
           <Help
             key={help.id}
             help={help}
             removeHelp={() => removeHelp(help.id)}
             showDescription={showDescription}
             setShowDescription={setShowDescription}
           />
         )}
       </ul>
      <Footer />
     </div>
     
  )
}
export default App
