import { List } from '@mui/material'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ContactComment from './ContactComment'

const CommentList = () => {
  const [sortedList, setSortedList] = useState([])
  const comments = useSelector(state => state.comments?.comments)

  useEffect(() => {
    const sortedList = [...comments]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    setSortedList(sortedList)
  }, [comments])

  if (!comments) return null

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {sortedList.map(comment =>
        <ContactComment key={comment.id} comment={comment} />
      )}
    </List>
  )
}

export default CommentList
