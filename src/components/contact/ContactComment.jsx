import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material'

import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

const ContactComment = ({ comment }) => {
  const { sender, createdAt, message } = comment
  const user = useSelector(state => state.user.user)
  const isSender = user.id === sender.id

  if (!comment) return null

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar >
          <Avatar sx={{
            backgroundColor:
              isSender
                ? 'rgba(88, 119, 219, 1)'
                : 'rgba(99, 166, 243, 1)'
          }}>
            {sender.name.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                {`klo ${dayjs(createdAt).format('HH.mm')} pvm ${dayjs(createdAt).format('DD.MM.YYYY')} `} {sender.name}
              </Typography>
              {` - ${message}`}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
export default ContactComment
