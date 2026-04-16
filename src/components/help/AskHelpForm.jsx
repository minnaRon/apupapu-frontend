import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton
} from '@mui/material'
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined'

import { useState } from 'react'
import useField from '../../hooks/useField'
import { useDispatch } from 'react-redux'
import { appendHelp } from '../../reducers/helpReducer'


const AskHelpForm = () => {
  const task = useField('text')
  const description = useField('text')
  const beans = useField('number')
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  /** opens a dialog */
  const handleClickOpen = () => {
    setOpen(true)
  }

  /** closes a dialog */
  const handleClose = () => {
    setOpen(false)
    task.reset()
    description.reset()
    beans.reset()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newHelp = {
      task: task.fields.value,
      beans: beans.fields.value,
      description: description.fields.value || 'ei tarkempaa kuvausta',
      asking: true
    }
    dispatch(appendHelp(newHelp))
    handleClose()  // closes a dialog after save
  }

  return (
    <div>
      {/* pressing the button opens a dialog */}
      <IconButton variant='outlined' color='info' onClick={handleClickOpen}>
        <LiveHelpOutlinedIcon />KYSY
      </IconButton>

      {/* dialog-view */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Kysytään apua</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id='askHelp-form'>

            {/* Apuna -field*/}
            <TextField
              label='otsikko, esim. kitaransoiton opetusta'
              fullWidth
              sx={{ mt: 2 }}
              style={{ marginBottom: '20px' }}
              {...task.fields}
            />

            {/* Papua -field */}
            <TextField
              label='papujen määrä (tehtävä/tuntikohtainen)'
              fullWidth
              min='0'
              style={{ marginBottom: '20px' }}
              {...beans.fields}
            />

            {/* Tarkempi kuvaus -field */}
            <TextField
              label='tarkempi kuvaus kysymästäsi avusta'
              multiline
              rows={4}
              fullWidth
              style={{ marginBottom: '20px' }}
              {...description.fields}
            />
          </form>
        </DialogContent>
        <DialogActions>
          {/* cancel button closes a dialog */}
          <Button onClick={handleClose} color='secondary'>
            Peruuta
          </Button>

          {/* save button to save and close a dialog*/}
          <Button type='submit' form='askHelp-form' color='primary'>
            Tallenna
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AskHelpForm

