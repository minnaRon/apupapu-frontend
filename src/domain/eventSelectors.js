//sorting events
import dayjs from 'dayjs'

export const groupByDate = (events) =>
  events.reduce((acc, e) => {
    const date = dayjs(e.date).format('YYYY-MM-DD')
    if (!acc[date]) acc[date] = []
    acc[date].push(e)
    return acc
  }, {})

export const getUpcoming = (events) =>
  events
    .filter(e => dayjs(e.date).isAfter(dayjs()) && e.status !== 'cancelled')
    .sort((a, b) => new Date(a.date) - new Date(b.date))

export const getPast = (events) =>
  events
    .filter(e => dayjs(e.date).isBefore(dayjs()))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

export const getAgreedAndUpcomingEvents = (events) => {
  const today = dayjs().startOf('day')

  return events
    .filter(e => e.status === 'sovittu' || dayjs(e.date).isAfter(today) || dayjs(e.date).isSame(today)) // tänään + tulevaisuus
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // aikajärjestys
}

