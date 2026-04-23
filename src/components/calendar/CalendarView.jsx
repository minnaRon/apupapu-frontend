import { DateCalendar, PickersDay } from '@mui/x-date-pickers'
import { getEventColor } from '../../domain/eventRules'

export default function CalendarView({ eventsByDate, onDayClick }) {

  function CustomDay(props) {
    const { day, outsideCurrentMonth, ...other } = props

    const date = day.format('YYYY-MM-DD')
    const dayEvents = eventsByDate[date] || []

    return (
      <div
        onClick={() => onDayClick(date)}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <PickersDay {...other} day={day} outsideCurrentMonth={outsideCurrentMonth} />

        <div
          style={{
            position: 'absolute',
            bottom: 2,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2
          }}
        >
          {dayEvents.slice(0, 3).map((e, i) => (
            <span
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                backgroundColor: getEventColor(e)
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <DateCalendar
      slots={{ day: CustomDay }}
      sx={{
        width: '100%',

        '& .MuiPickersCalendarHeader-root': {
          padding: 1,
          margin: 0
        },

        '& .MuiDayCalendar-weekContainer': {
          justifyContent: 'space-between'
        },

        '& .MuiPickersDay-root': {
          margin: 0.3,
          flex: 1,
          aspectRatio: '1 / 1',
          fontSize: 12
        }
      }}
    />
  )
}
