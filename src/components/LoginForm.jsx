import { useState } from 'react'

const LoginForm = ({ credentials }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    credentials({
      username: username,
      password: password
      })
        setUsername('')
        setPassword('')
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Kirjautuminen</h2>
        <div>
          <label>
            käyttäjänimi:

            <input
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            salasana:
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">KIRJAUDU</button>
      </form>
    </>
  )
}

export default LoginForm
