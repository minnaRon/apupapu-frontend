import { List } from '@mui/material'

import { useConversation } from '../../hooks/useConversation'
import ContactComment from './ContactComment'

const CommentList = ({ helpId, targetUserId }) => {
  const { comments } = useConversation({ helpId, targetUserId })
  const sorted = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  return (
    <List>
      {sorted.map(c =>
        <ContactComment key={c.id} comment={c} />
      )}
    </List>
  )
}

export default CommentList
