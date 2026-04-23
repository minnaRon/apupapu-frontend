import * as React from 'react'
import { Box, Paper } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

function LegendItem({ icon, label, color }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: 0.8,
        py: 0.2,
        borderRadius: 1,
        backgroundColor: 'rgba(0,0,0,0.04)',
        fontSize: 12,
        whiteSpace: 'nowrap'
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: 12, color } })}
      {label}
    </Box>
  )
}

export default function CalendarLegend() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(3, 1fr)',   // mobiili OK
          md: 'repeat(1, 1fr)'
        },
        gap: 0.5,
        p: 0.5
      }}
    >
      <LegendItem
        icon={<HelpIcon />}
        label="kesken tarjoat"
        color="#90caf9"
      />
      <LegendItem
        icon={<HelpIcon />}
        label="kesken kysyt"
        color="#a5d6a7"
      />
      <LegendItem
        icon={<CheckCircleIcon />}
        label="valmis"
        color="#972fd3"
      />
      <LegendItem
        icon={<CheckCircleIcon />}
        label="sovittu tarjoat"
        color="#1976d2"
      />
      <LegendItem
        icon={<CheckCircleIcon />}
        label="sovittu kysyt"
        color="#2e7d32"
      />
      <LegendItem
        icon={<CancelIcon />}
        label="peruttu"
        color="#bb6464"
      />
    </Box>
  )
}
