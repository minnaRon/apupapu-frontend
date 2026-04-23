import dayjs from 'dayjs'

export const isEventSoon = (event) => {
  const diff = dayjs(event.date).diff(dayjs(), 'hour')
  return diff < 24 && diff > 0
}

