import { useState } from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import Rating from '@mui/material/Rating'

function FeedbackSection({ canComplete, handleComplete }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    handleComplete({ rating, comment })
    setSubmitted(true)
  }

  if (!canComplete) return null

  return (
    <Card sx={{ mt: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        {!submitted ? (
          <>
            <Typography variant="h6" gutterBottom>
              Anna palaute
            </Typography>

            {/* Tähdet */}
            <Box mb={2}>
              <Rating
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
              />
              {rating === 0 && (
                <Typography variant="body2" color="error">
                  Valitse tähtiarvio
                </Typography>
              )}
            </Box>

            {/* Kommentti */}
            <TextField
              label="Vapaa palaute (valinnainen)"
              multiline
              rows={3}
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Lähetä */}
            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={rating === 0}
            >
              Lähetä palaute
            </Button>
          </>
        ) : (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              Kiitos palautteestasi! 🙌
            </Typography>
            <Typography variant="body2">
              Hyvää päivänjatkoa!
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default FeedbackSection
