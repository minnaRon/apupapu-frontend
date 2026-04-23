import { Typography } from '@mui/material'

const EventDetails = ({ event }) => {
  return (
    <>
      <Typography variant="h5">{event.status}</Typography>

      <Typography>🫘 {event.beans}</Typography>

      <Typography>
        📅 {new Date(event.date).toLocaleDateString()}
      </Typography>

      <Typography>
        🕒 {new Date(event.time).toLocaleTimeString()}
      </Typography>

      <Typography sx={{ mt: 1 }}>
        {event.addInfo}
      </Typography>
    </>
  )
}

export default EventDetails
