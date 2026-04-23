import {
  ButtonGroup,
  IconButton,
  Typography,
  Box,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

const Event = ({ event }) => {
  const user = useSelector(state => state.user.user)
  const { notifierName, respondantName, task, date, status, asking } = event

  const getStatusColor = (event) => {
    if (event.status === 'peruttu') return '#d32f2f'

    const isHelper = event.participants?.some(
      p => p.user === user.id && p.role === 'helper'
    )

    if (isHelper) {
      if (event.status === 'kesken') return '#90caf9'
      if (event.status === 'sovittu') return '#1976d2'
    } else {
      if (event.status === 'kesken') return '#a5d6a7'
      if (event.status === 'sovittu') return '#2e7d32'
    }

    if (event.status === 'valmis') return '#616161'
  }

  return (
    <>
      <ListItem>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr',
            gridTemplateRows: 'auto auto',
            gap: 0.5,
            alignItems: 'center'
          }}
        >

          {/* PÄIVÄMÄÄRÄ */}
          <Typography
            sx={{
              gridColumn: 1,
              gridRow: 1,
              backgroundColor: getStatusColor(event),
            }}
          >
            {dayjs(date).format('DD.MM.YYYY')}
          </Typography>

          {/* TASK */}
          <Typography
            sx={{
              gridColumn: 2,
              gridRow: 1,
              fontWeight: 'bold'
            }}
          >
            {task}
          </Typography>

          {/* STATUS */}
          <Typography
            variant="caption"
            sx={{
              gridColumn: 1,
              gridRow: 2,
              fontWeight: 'bold'
            }}
          >
            {status}
          </Typography>

          {/* TOINEN OSAPUOLI */}
          <Typography
            variant="body2"
            sx={{
              gridColumn: 2,
              gridRow: 2,
              textAlign: 'right'
            }}
          >
            {asking ? respondantName : notifierName}
          </Typography>

        </Box>
      </ListItem>
    </>
  )}

export default Event
