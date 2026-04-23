//colors implementing events' status in the calendar
export const getEventColor = (event, userId) => {
  const isHelper = event.participants?.find(p => p.user === userId)?.role === 'helper'

  if (event.status === 'peruttu') return '#bb6464'
  if (event.status === 'valmis') return '#972fd3'

  if (isHelper) {
    if (event.status === 'kesken') return '#90caf9'
    if (event.status === 'sovittu') return '#1976d2'
  }

  if (!isHelper) {
    if (event.status === 'kesken') return '#a5d6a7'
    if (event.status === 'sovittu') return '#2e7d32'
  }

  return 'gray'
}
