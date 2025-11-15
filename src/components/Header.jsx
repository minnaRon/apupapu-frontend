import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem
} from '@mui/material'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import MenuIcon from '@mui/icons-material/Menu'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import LoginForm from './user/LoginForm'

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let name

  if (user.user) {
    name = user.user.name
  }

  const handleLogOut = () => {
    dispatch(logoutUser())
  }

  /** content of menus */
  const settings = [name, 'asetukset', 'kirjaudu ulos']
  const pages = [
    { name: 'esittely', path: '/info' },
    { name: 'apu', path: '/helps' },
    { name: 'lainaus', path: '/lends' },
  ]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null)
    if (setting === 'kirjaudu ulos') {
      handleLogOut()
    } else if (setting === 'asetukset') {
      navigate('/user/settings')
    }
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'   sx={{
        background: 'linear-gradient(to top right, #3B82F6, #eef1f3ff',
      }}>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            apunapapu
          </Typography>

          {/* navmenu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink to={page.path} style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'black',
                    fontWeight: isActive ? 'bold' : 'normal',
                    textDecoration: 'none',
                  })}
                  >{page.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            apunapapu
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to={page.path} style={({ isActive }) => ({
                  color: 'white',
                  fontWeight: isActive ? 'bold' : 'normal',
                  textDecoration: isActive ? '' : 'none',
                })} >
                  {page.name}
                </NavLink>
              </Button>
            ))}
          </Box>

          {/* usermenu */}
          {
            !name
              ? <Box sx={{ flexGrow: 0 }}>
                <IconButton sx={{ my: 2, color: 'white' }} onClick={() => setOpenLogin(true)}>< LoginOutlinedIcon /> </IconButton>
                <LoginForm setOpenLogin={setOpenLogin} openLogin={openLogin} />
              </Box>
              : <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor:  '#3B82F6' }}>
                      {(name.split('')[0].toUpperCase())}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {(settings || {}).map(setting => (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                      <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
