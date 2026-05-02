import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { useDispatch } from 'react-redux'
import useField from '../../hooks/useField'
import { appendComment } from '../../reducers/commentReducer'

const CommentForm = ({ helpId, targetUserId }) => {
  const message = useField('text')
  const dispatch = useDispatch()

  const handleCancel = () => {
    message.reset()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newComment = {
      message: message.fields.value,
      helpId
    }
    dispatch(appendComment({
      ...newComment,
      targetUserId
    }))
    message.reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit} id='comment-form'>
        <TextField
          label='viesti'
          multiline
          minRows={3}
          fullWidth
          sx={{ mt: 2 }}
          style={{ marginBottom: '20px' }}
          {...message.fields}
        />
        <Button onClick={handleCancel}>PERU</Button>
        <Button type='submit' form='comment-form'>
            LÄHETÄ
        </Button>
      </form>
    </>
  )
}

export default CommentForm
