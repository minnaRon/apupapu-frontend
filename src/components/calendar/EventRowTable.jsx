import { Box, Collapse, Paper, Chip, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import dayjs from 'dayjs'
import { getEventColor } from '../../domain/eventRules'
import { Typography } from '@mui/material'

export default function EventRowTable({
  event,
  user,
  isOpen,
  onToggle,
  onClick
}) {

  const participants = event.participants || []

  const others = participants
    .filter(p => p.user !== user.id)
    .map(p => p.user.name)

  const needsConfirmation =
    event.lastModifiedBy?.user?.toString() !== user.id?.toString()
  && event.completedBy.length < 2

  return (
    <Paper
      onClick={onToggle}
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        minWidth: 0,
        p: 1,
        cursor: 'pointer',
        borderLeft: `5px solid ${getEventColor(event, user.id)}`
      }}
    >

      {/* TOP ROW */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          minWidth: 0,
          flexWrap: 'nowrap',
          overflow: 'hidden'
        }}
      >

        {/* date */}
        <Box sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
          <Typography variant="caption">
            {dayjs(event.date).format('DD.MM HH:mm')}
          </Typography>
        </Box>

        {/* task */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: 'hidden'
          }}
        >
          <Typography
            variant="subtitle2"
            noWrap
          >
            {event.helpId.task}
          </Typography>

          {needsConfirmation && (
            <Chip size="small" label="odottaa" sx={{ ml: 1 }} />
          )}
        </Box>
      </Box>

      {/* status */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: getEventColor(event, user.id) }}
        >
          {event.status}
        </Typography>

        {(['kesken', 'sovittu'].includes(event.status)) &&
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onClick(event)
            }}
            sx={{ flexShrink: 0 }}
          >
            <EditIcon fontSize="small" color='info' />
          </IconButton>
        }
      </Box>

      {/* DETAILS */}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 1 }}>

          {/* 🔹 2 saraketta */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              width: '100%',
              flexWrap: 'wrap'
            }}
          >

            {/* Osallistujat */}
            <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
              <Typography variant="caption" color="text.secondary">
                Osallistujat
              </Typography>

              <Typography
                variant="body2"
                sx={{ wordBreak: 'break-word' }}
              >
                {others.length ? others.join(', ') : 'Ei muita'}
              </Typography>
            </Box>

            {/* Pavut */}
            <Box sx={{ flex: '1 1 120px', minWidth: 0 }}>
              <Typography variant="caption" color="text.secondary">
                Pavut
              </Typography>

              <Typography variant="body2">
                {event.beans}
              </Typography>
            </Box>

          </Box>

          {/* 🔹 Lisätiedot */}
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 0.5 }}
            >
              Lisätiedot
            </Typography>

            <Typography
              variant="body2"
              sx={{
                pr: 1.5,
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: isOpen ? 'unset' : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {event.addInfo}
            </Typography>
          </Box>

        </Box>
      </Collapse>
    </Paper>
  )
}
