import { Dialog, Box } from '@mui/material'
import EventRowList from './EventRowList'

export default function DayDialog({ open, events, onClose, onEventClick }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ p: 2, minWidth: 300 }}>

        {!events?.length &&
          <div>Ei tapahtumia tälle päivälle</div>}

        {events?.map(e => (
          <EventRowList
            key={e.id}
            event={e}
            onClick={onEventClick}
          />
        ))}
      </Box>
    </Dialog>
  )
}
