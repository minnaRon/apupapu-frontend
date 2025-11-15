import {
  TableRow,
  ButtonGroup,
  TableCell,
  Collapse,
  IconButton,
  Typography,
  Button,
  Box
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeHelp } from '../../reducers/helpReducer'
import EditHelpForm from './EditHelpForm'

const Help = ({ help }) => {
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const userIsNotifier = user && user.id === help.notifierId

  const handleDelete = () => {
    if (window.confirm(`Poistetaanko ${help.task}?`)) {
      dispatch(removeHelp(help.id))
    }
  }

  //TEE navigoi käyttäjien viestittelyyn tässä tai jsx -koodissa
  const handleAsk = () => {}

  return (
    <>
      <TableRow
        className='help'
        sx={{
          '& td, & th': {
            fontSize: open ? '20px' : '',
            color: open ? ' #f8f9fdff' : '',
            fontWeight: open ? 'bold' : '',
            backgroundColor: open ? '#3B82F6' : '',
          },
          '&:last-child td, &:last-child th': { border: 0 }
        }}
      >
        <TableCell>
          {/** arrowIcon is active if user is logged in */}
          <IconButton
            disabled={!user}
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
            sx={{
              color: open ? ' #f8f9fdff' : '',
              backgroundColor: open ? '#3B82F6' : ''
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/** everyone sees help task tittles and beans */}
        <TableCell component='th' scope='row'>{help.task}</TableCell>
        <TableCell align='right'>{help.beans}</TableCell>
      </TableRow>
      {/** user logged in */}
      {user &&
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} sx={{ backgroundColor: '#c8e1f1ff' }} colSpan={6} >
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Typography variant='subtitle1' sx={{ maxWidth: 400, wordWrap: 'break-word', p: 1, pb: 0 }}>
                {help.notifier}:
              </Typography>
              <Typography variant='body2' sx={{ maxWidth: 400, wordWrap: 'break-word', p: 1, pt:0, mb: 2 }}>
                {help.description}
              </Typography>
              {/** if user is notifier: shows edit and delete -buttons */}
              {/** if user is not notifier: shows ask more -button */}
              {
                user && userIsNotifier
                  ? <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'right',
                      gap: 1,
                      '& > *': {
                        fontSize: '0.75rem',
                        minWidth: 60,
                        height: 28,
                      }
                    }}
                  >
                    <ButtonGroup
                      variant='contained'
                      aria-label='Basic button group'
                      style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        aria-label='delete'
                        size='small'
                        onClick={handleDelete}>
                        <DeleteOutlineIcon />POISTA
                      </IconButton>
                      <EditHelpForm help={help} />
                    </ButtonGroup>
                  </Box>
                  :
                  <Button
                    variant='outlined'
                    fullWidth
                    color='info'
                    onClick={handleAsk} >
                    <LiveHelpOutlinedIcon sx={{ marginRight: 1 }}/> KYSY LISÄÄ ja SOVI AVUSTA
                  </Button>
              }
            </Collapse>
          </TableCell>
        </TableRow>
      }
    </>
  )
}

export default Help
