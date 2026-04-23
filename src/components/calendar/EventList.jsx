import EventRow from './EventRow'

export default function EventList({ title, events, onEventClick }) {

  return (
    <div>
      <h3>{title}</h3>

      {events.map(e => (
        <EventRow key={e.id} event={e} onClick={onEventClick} />
      ))}
    </div>
  )
}
