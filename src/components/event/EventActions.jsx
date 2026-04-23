import { Button, Stack } from '@mui/material'
import { useEvent } from '../../hooks/useEvent'
import { useSelector } from 'react-redux'

const EventActions = ({ event }) => {
  const { agree, complete, cancel } = useEvent(event)
  const user = useSelector(state => state.user.user)

  const role = event.participants.find(
    p => p.user.id === user.id
  )?.role

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>

      {role === 'helped' && event.status === 'kesken' && (
        <Button onClick={agree} variant="contained">
          Hyväksy
        </Button>
      )}

      {role === 'helped' && event.status === 'sovittu' && (
        <Button onClick={complete} color="success" variant="contained">
          Valmis
        </Button>
      )}

      {['kesken', 'sovittu'].includes(event.status) && (
        <Button
          onClick={() => cancel('peruttu käyttäjän toimesta')}
          color="error"
          variant="outlined"
        >
          Peru
        </Button>
      )}

    </Stack>
  )
}

export default EventActions

