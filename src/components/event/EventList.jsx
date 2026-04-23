import {
  Box,
  List,
  Typography,
} from '@mui/material'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Event from './Event'

const EventList = ({ filter = null }) => {
  const [createdDataEvents, setCreatedDataEvents] = useState([])
  const events = useSelector(state => state.events.events)
  const createData = (a) => {
    console.log('DATA', a)
    return {
      id: a.id,
      task: a.helpId.task,
      date: a.date,
      time: a.time,
      beans: a.beans,
      status:a.status,
      addInfo: a.addInfo,
      asking: a.helpId.asking || false
    }
  }

  /** creates filtered and sorted data for a list */
  useEffect(() => {
    const createdData = events
      .filter(filter || (() => true))
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(a => createData(a))
    setCreatedDataEvents(createdData)
  }, [events, filter])

  if (!events || events.length === 0) {
    return (
      <Typography sx={{ ml: 2, width: '80%', color: 'grey' }} variant="body1" align='center'>
        sovitut tapahtumat tulevat näkyviin tänne
      </Typography>
    )
  }
  console.log(createdDataEvents)
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {createdDataEvents.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </List>
    </Box>
  )
}

export default EventList
