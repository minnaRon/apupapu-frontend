import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = ({ setOpenLogin, openLogin }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
    handleClose()
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event)
    }
  }

  // opens and closes a dialog
  const handleClose = () => setOpenLogin(false)

  // show/hide password
  const handleClickShowPassword = () => setShowPassword((prev) => !prev)
  const handleMouseDownPassword = (event) => event.preventDefault()

  return (

    <Dialog
      open={openLogin}
      onClose={() => setOpenLogin(false)}
    >
      <DialogTitle>Kirjaudu sisään</DialogTitle>
      <DialogContent>
        <TextField
          label='Käyttäjätunnus'
          variant='outlined'
          fullWidth
          sx={{ mt: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label='Salasana'
          variant='outlined'
          fullWidth
          sx={{ mt: 2 }}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Peruuta</Button>
        <Button onClick={handleLogin} variant='contained' color='primary'>
            Kirjaudu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginForm
