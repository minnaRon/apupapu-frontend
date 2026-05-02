import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeComments } from '../reducers/commentReducer'
import { getPairKey } from '../domain/commentUtils'

const getKey = (helpId, pairKey) => `${helpId}_${pairKey}`

export const useConversation = ({ helpId, targetUserId }) => {
  const dispatch = useDispatch()
  const user = useSelector(s => s.user.user)
  const conversations = useSelector(s => s.comments.conversations)

  // 🔒 vaadi targetUserId
  const pairKey = getPairKey(user?.id, targetUserId)

  const isReady = helpId && pairKey

  const key = isReady ? getKey(helpId, pairKey) : null

  useEffect(() => {
    if (isReady) {
      dispatch(initializeComments({
        helpId,
        targetUserId
      }))
    }
  }, [helpId, targetUserId, dispatch, isReady])

  const conversation = key ? conversations[key] : null

  return {
    comments: conversation?.comments || [],
    otherUserId: targetUserId || null,
    pairKey
  }
}
