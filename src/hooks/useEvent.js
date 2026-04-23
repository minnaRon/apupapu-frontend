import { useDispatch } from 'react-redux'
import { updateEvent } from '../reducers/eventReducer'

export const useEvent = (event) => {
  const dispatch = useDispatch()

  const agree = () =>
    dispatch(updateEvent({
      id: event.id,
      action: { type: 'agree' }
    }))

  const complete = () =>
    dispatch(updateEvent({
      id: event.id,
      action: { type: 'complete' }
    }))

  const cancel = (reason) =>
    dispatch(updateEvent({
      id: event.id,
      action: { type: 'cancel', reason }
    }))

  const updateBasics = (data) =>
    dispatch(updateEvent({
      id: event.id,
      action: { type: 'updateBasics', ...data }
    }))

  return {
    agree,
    complete,
    cancel,
    updateBasics
  }
}
