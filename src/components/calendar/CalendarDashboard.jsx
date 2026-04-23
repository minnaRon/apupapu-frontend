import * as React from 'react'
import CalendarView from './CalendarView'
import EventTable from '../event/EventTable'
import DayDialog from './DayDialog'
import EventForm from '../event/EventForm'
import CalendarLegend from './CalendarLegend'
import { Box, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { groupByDate, getAgreedAndUpcomingEvents } from '../../domain/eventSelectors'

const ColorDot = ({ color }) => (
  <span
    style={{
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: color,
      marginRight: 8
    }}
  />
)

export default function CalendarDashboard() {
  const events = useSelector(state => state.events.events)

  const [selectedDay, setSelectedDay] = React.useState(null)
  const [selectedEvent, setSelectedEvent] = React.useState(null)

  const eventsByDate = groupByDate(events)
  const upcoming = getAgreedAndUpcomingEvents(events)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'minmax(0, 1fr) 180px'
        },
        width: '100%',
        maxWidth: '100%',
        alignItems: 'start'
      }}
    >

      {/* CALENDAR */}
      <Paper sx={{ width: '100%', minWidth: 0 }}>
        <CalendarView
          eventsByDate={eventsByDate}
          onDayClick={setSelectedDay}
        />
      </Paper>

      {/* LEGEND */}
      <Paper sx={{ width: '100%', minWidth: 0 }}>
        <CalendarLegend />
      </Paper>

      {/* UPCOMING */}
      <Paper
        sx={{
          width: '100%',
          minWidth: 0,
          overflow: 'hidden',
          gridColumn: {
            xs: 'auto',
            md: '1 / -1'
          }
        }}
      >
        <EventTable
          title="Omat tulevat tapahtumat"
          events={upcoming}
          onEventClick={setSelectedEvent}
        />
      </Paper>

      {/* DAY DIALOG */}
      <DayDialog
        open={Boolean(selectedDay)}
        date={selectedDay}
        events={selectedDay ? eventsByDate[selectedDay] : []}
        onClose={() => setSelectedDay(null)}
        onEventClick={(event) => {
          setSelectedDay(null)
          setSelectedEvent(event)
        }}
      />

      {/* EVENT FORM */}
      {selectedEvent && (
        <EventForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

    </Box>
  )
}
