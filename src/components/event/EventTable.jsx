import { Paper, Box, Typography } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import EventRowTable from './EventRowTable'

export default function EventTable({ events, onEventClick, title }) {

  const user = useSelector(state => state.user.user)
  const [openId, setOpenId] = useState(null)
  const loaderRef = useRef(null)
  const [visible, setVisible] = useState(5)

  const displayed = events.slice(0, visible)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(v => Math.min(v + 5, events.length))
      }
    })

    if (loaderRef.current) obs.observe(loaderRef.current)

    return () => obs.disconnect()
  }, [events])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        maxHeight: '35vh',
        overflowY: 'auto',
        width: '100%',
        minWidth: 0,
        overflowX: 'hidden', // 5
      }}
    >
      <Typography
        sx={{
          p: 1,
          backgroundColor: '#3B82F6',
          color: 'white',
          textAlign: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {displayed.map(event => (
          <EventRowTable
            key={event.id}
            event={event}
            user={user}
            isOpen={openId === event.id}
            onToggle={() =>
              setOpenId(prev => prev === event.id ? null : event.id)
            }
            onClick={onEventClick}
          />
        ))}

        <Box
          ref={loaderRef}
          style={{
            height: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3B82F6',
          }}
        >
          <Typography>
            🤝
          </Typography>

        </Box>

      </Box>

    </Box>
  )
}
