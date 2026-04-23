// use            <CoffeeCup value={87} />
// size           fontSize: 64
// steam hight    transform: translateY(-30px)
// number size    fontSize: 16

import { Box, Typography } from '@mui/material'

const CoffeeCup = ({ value = 123 }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>

      {/* Cup */}
      <Box
        sx={{
          fontSize: 64,
          position: 'relative',
        }}
      >
        ☕
      </Box>

      {/* Steam */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '40%',
          transform: 'translateX(-50%)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(120,120,120,0.6)',
              position: 'absolute',
              left: i * 6,
              animation: `steam 2s ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </Box>

      {/* Number */}
      <Typography
        variant="subtitle1"
        sx={{
          position: 'absolute',
          top: '68%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: 'bold',
          pointerEvents: 'none',
          fontSize: 16,
          color: '#716363'
        }}
      >
        {value}
      </Typography>

      {/* Keyframes */}
      <style>
        {`
        @keyframes steam {
          0% {
            transform: translateY(0) scaleX(1);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) scaleX(1.5);
            opacity: 0;
          }
        }
        `}
      </style>
    </Box>
  )
}

export default CoffeeCup
