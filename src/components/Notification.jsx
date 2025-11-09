import Alert from '@mui/material/Alert'

import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification || notification.message === null) return null

  return (
    <Alert severity={notification.type} variant='outlined'>
      {notification.message}
    </Alert>
  )
}

export default Notification
