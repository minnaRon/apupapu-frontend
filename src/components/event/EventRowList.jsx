import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getEventColor } from '../../domain/eventRules'
import { Collapse, Button } from '@mui/material'
import dayjs from 'dayjs'
import EventForm from './EventForm'

export default function EventRowList({ event, onClick }) {
  const user = useSelector(state => state.user.user)
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        padding: 10,
        marginBottom: 8,
        borderLeft: `4px solid ${getEventColor(event, user.id)}`,
        background: '#f7f7f7'
      }}
    >
      {/* HEADER */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: 'pointer' }}
      >
        <strong>{event.helpId.task}</strong>
        <div>{dayjs(event.date).format('DD.MM.YYYY HH:mm')}</div>
      </div>

      {/* LISÄTIEDOT */}
      {expanded && (
        <Collapse in={expanded}>
          <div style={{ marginTop: 8 }}>
            <div>Pavut: {event.beans}</div>
            <div>Lisätiedot: {event.addInfo}</div>
            {(['kesken', 'sovittu'].includes(event.status)) &&
              <Button
                size="small"
                onClick={() => onClick(event)}
                sx={{ mt: 1 }}
              >
                Avaa
              </Button>
            }
            { /* TEE TÄNNE MAHDOLLISUUS AVATA UUSI KOPIO PERUTUSTA / VALMIISTA */ }

          </div>
        </Collapse>
      )}
    </div>
  )
}
