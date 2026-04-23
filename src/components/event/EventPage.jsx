import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button, Box } from '@mui/material'
import EventDetails from './EventDetails'
import EventActions from './EventActions'
import EventForm from './EventForm'

const EventPage = () => {
  const { id } = useParams()
  const [selectedEvent, setSelectedEvent] = useState(null)

  const event = useSelector(state =>
    state.events.events.find(e => e.id === id)
  )

  if (!event) return <div>Ei löytynyt</div>

  return (
    <Box sx={{ p: 2 }}>

      {/* DETAILS */}
      <EventDetails event={event} />

      {/* EDIT BUTTON */}
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => setSelectedEvent(event)}
      >
        Muokkaa
      </Button>

      {/* ACTIONS */}
      <EventActions event={event} />

      {/* DIALOG FORM */}
      <EventForm
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

    </Box>
  )
}

export default EventPage
