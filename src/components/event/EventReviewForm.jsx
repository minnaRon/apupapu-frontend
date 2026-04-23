import { TextField, Button, Box } from '@mui/material'
import useField from '../../hooks/useField'
import { useDispatch } from 'react-redux'
import { updateEvent } from '../../reducers/eventReducer'

const EventReviewForm = ({ event, role }) => {

  const dispatch = useDispatch()

  const rating = useField('number', '')
  const review = useField('text', '')

  // näkyy vain kun valmis
  if (event.status !== 'valmis') return null

  const alreadyReviewed =
  role === 'helper'
    ? event.ratingFromHelper
    : event.ratingFromHelped

  if (alreadyReviewed) {
    return (
      <Box sx={{ mt: 3 }}>
        <strong>Arvio:</strong> {alreadyReviewed}
        <br />
        <strong>Kommentti:</strong> {
          role === 'helper'
            ? event.reviewFromHelper
            : event.reviewFromHelped
        }
      </Box>
    )
  }

  const handleSubmit = () => {
    dispatch(updateEvent({
      id: event.id,
      action: {
        type: 'review',
        rating: Number(rating.fields.value),
        review: review.fields.value
      }
    }))

    rating.reset()
    review.reset()
  }

  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        label="Arvio (1–5)"
        type="number"
        fullWidth
        inputProps={{ min: 1, max: 5 }}
        {...rating.fields}
      />

      <TextField
        label="Kirjoita arvostelu"
        multiline
        rows={3}
        fullWidth
        sx={{ mt: 2 }}
        {...review.fields}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Lähetä arvio
      </Button>
    </Box>
  )
}

export default EventReviewForm
