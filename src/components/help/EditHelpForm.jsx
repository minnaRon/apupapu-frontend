import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton
} from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote'

import { useState } from 'react'
import useField from '../../hooks/useField'
import { useDispatch } from 'react-redux'
import { updateHelp } from '../../reducers/helpReducer'


const EditHelpForm = ({ help }) => {
  const task = useField('text', help.task)
  const description = useField('text', help.description)
  const beans = useField('number', help.beans)
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

  const editHelp = async (event) => {
    event.preventDefault()
    const editedHelp = {
      ...help,
      task: task.fields.value,
      beans: beans.fields.value,
      description: description.fields.value || 'ei tarkempaa kuvausta',
    }
    dispatch(updateHelp({ id:help.id, editedObject:editedHelp }))
    handleClose()  // closes a dialog after save
  }

  return (
    <div>
      {/* pressing the button opens a dialog */}
      <IconButton variant='outlined' size='small' color='success' onClick={handleClickOpen}>
        <EditNoteIcon />MUOKKAA
      </IconButton>

      {/* dialog-view */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Muokataan apua</DialogTitle>
        <DialogContent>
          {/* Apuna -field*/}
          <TextField
            label='Apuna'
            fullWidth
            sx={{ mt: 2 }}
            style={{ marginBottom: '20px' }}
            {...task.fields}
          />

          {/* Papua -field */}
          <TextField
            label='Papua'
            fullWidth
            min='0'
            style={{ marginBottom: '20px' }}
            {...beans.fields}
          />

          {/* Tarkempi kuvaus -field */}
          <TextField
            label='Tarkempi kuvaus'
            multiline
            rows={4}
            fullWidth
            style={{ marginBottom: '20px' }}
            {...description.fields}
          />
        </DialogContent>

        <DialogActions>
          {/* cancel button closes a dialog */}
          <Button onClick={handleClose} color='secondary'>
            Peruuta
          </Button>

          {/* save button to save and close a dialog*/}
          <Button onClick={editHelp} color='primary'>
            Tallenna
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditHelpForm

