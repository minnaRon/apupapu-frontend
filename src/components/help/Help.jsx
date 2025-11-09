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
import EditNoteIcon from '@mui/icons-material/EditNote'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeHelp } from '../../reducers/helpReducer'

const Help = ({ help }) => {
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (window.confirm(`Poistetaanko ${help.task}?`)) {
      dispatch(removeHelp(help.id))
    }
  }

  //TEE avun muokkaukseen funktio tähän
  const handleEdit = () => { }

  //TEE navigoi käyttäjien viestittelyyn tässä tai jsx -koodissa
  const handleAsk = () => {}

  return (
    <>
      <TableRow className='help' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <IconButton
            disabled={!user}
            aria-label='expand row'
            color='success'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {help.task}
        </TableCell>
        <TableCell align='right'>{help.beans}</TableCell>
      </TableRow>
      {user &&
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Typography
                variant='body2'
                sx={{
                  maxWidth: 400,
                  wordWrap: 'break-word',
                  p: 1,
                }}
              >
                {help.helper}: {help.description}
              </Typography>
              {
                user && user.id === help.helperId
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
                    <ButtonGroup variant='contained' aria-label='Basic button group'>
                      <IconButton aria-label='delete' size='small' onClick={handleDelete}>
                        <DeleteOutlineIcon />POISTA
                      </IconButton>

                      <IconButton aria-label='edit-button' color='success' size='small' variant='contained' onClick={handleEdit}>
                        <EditNoteIcon />MUOKKAA
                      </IconButton>
                    </ButtonGroup>
                  </Box>
                  :
                  <Button variant='contained' fullwidth='true' color='success' onClick={handleAsk} >
                    <LiveHelpOutlinedIcon /> KYSY LISÄÄ ja SOVI AVUSTA
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
