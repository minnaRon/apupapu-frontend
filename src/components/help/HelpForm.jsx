import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendHelp } from '../../reducers/helpReducer'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material'

const HelpForm = () => {
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [beans, setBeans] = useState('')
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  /** opens a dialog */
  const handleClickOpen = () => {
    setOpen(true)
  }

  /** closes a dialog */
  const handleClose = () => {
    setOpen(false)
    setTask('')
    setDescription('')
    setBeans('')
  }

  const addHelp = async (event) => {
    event.preventDefault()
    const newHelp = {
      task,
      beans,
      description: description || 'ei tarkempaa kuvausta',
    }
    dispatch(appendHelp(newHelp))
    handleClose()  // closes a dialog after save
  }

  return (
    <div>
      {/* pressing the button opens a dialog */}
      <IconButton variant='outlined' color='success' onClick={handleClickOpen}>
        <AddTaskOutlinedIcon />UUSI
      </IconButton>

      {/* dialog-view */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Lisätään uusi apu</DialogTitle>
        <DialogContent>
          <form onSubmit={addHelp}>
            {/* Apuna -field*/}
            <TextField
              label='Apuna'
              fullWidth
              sx={{ mt: 2 }}
              value={task}
              onChange={event => setTask(event.target.value)}
              style={{ marginBottom: '20px' }}
            />

            {/* Papua -field */}
            <TextField
              label='Papua'
              type='number'
              fullWidth
              value={beans}
              onChange={event => setBeans(event.target.value)}
              min='0'
              style={{ marginBottom: '20px' }}
            />

            {/* Tarkempi kuvaus -field */}
            <TextField
              label='Tarkempi kuvaus'
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={event => setDescription(event.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </form>
        </DialogContent>

        <DialogActions>
          {/* cancel button closes a dialog */}
          <Button onClick={handleClose} color='secondary'>
            Peruuta
          </Button>

          {/* save button to save and close a dialog*/}
          <Button onClick={addHelp} color='primary'>
            Tallenna
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default HelpForm

