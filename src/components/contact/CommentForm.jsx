import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { useDispatch, useSelector } from 'react-redux'
import useField from '../../hooks/useField'
import { appendComment } from '../../reducers/commentReducer'

const CommentForm = ({ helpId }) => {
  const message = useField('text')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  const handleCancel = () => {
    message.reset()
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const newComment = {
      sender: user.id,
      message: message.fields.value,
      helpId
    }
    dispatch(appendComment(newComment))
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
