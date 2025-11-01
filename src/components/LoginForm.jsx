const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
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
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            salasana:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">KIRJAUDU</button>
      </form>
    </>
  )
}

export default LoginForm
