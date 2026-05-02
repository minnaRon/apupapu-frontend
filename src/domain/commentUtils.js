// commentUtils.js

/**
 * Returns the pairKey string for a conversation
 * - If targetUserId is null/undefined, it's a "public" conversation
 * - Otherwise, it's a sorted combination of user IDs
 */
export const getPairKey = (userA, userB) => {
  // jos toinen on null tai sama kuin userA, ei luoda pairKey:tä
  if (!userA || !userB || userA === userB) return null
  return [userA, userB].sort().join('_')
}

/**
 * Returns the conversation key for storing in Redux
 */
export const getConversationKey = (helpId, pairKey) => {
  if (!pairKey) {
    throw new Error('pairKey missing – targetUserId required')
  }
  return `${helpId}_${pairKey}`
}

/**
 * Resolve other user in a conversation
 */
export const resolveOtherUserId = ({ help, eventData, comments = [], userId }) => {
  const myId = userId?.toString()
  // 1. From event participants
  if (eventData?.participants?.length) {
    const other = eventData.participants.find(p => p.user?.id.toString() !== myId)
    return other?.user.id || null
  }

  // 2. From existing comments
  if (comments.length > 0) {
    const pairKey = comments[0]?.pairKey
    if (!pairKey) return null
    const [a, b] = pairKey.split('_')
    if (a !== myId && b !== myId) return null
    return a === myId ? b : a
  }

  // 3. Fallback to notifier
  if (help?.notifierId?.toString() !== myId) {
    return help.notifierId
  }

  return null
}
