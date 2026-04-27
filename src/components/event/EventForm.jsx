import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Button,
  Box
} from '@mui/material'

import { useState, useEffect } from 'react'
import useField from '../../hooks/useField'
import { useDispatch, useSelector } from 'react-redux'
import { appendEvent, updateEvent } from '../../reducers/eventReducer'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import FeedBackSection from './FeedBackSection'
import dayjs from 'dayjs'
import 'dayjs/locale/fi'

const EventForm = ({ help, event, onClose }) => {
  const beans = useField('number', event?.beans ?? help.beans)
  const addInfo = useField('text', event?.addInfo ?? '')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState(event ? dayjs(event.time) : dayjs())
  const [date, setDate] = useState(event ? dayjs(event.date) : dayjs())

  useEffect(() => {
    if (event) {
      setTime(dayjs(event.time))
      setDate(dayjs(event.date))
      setOpen(true)
    } else {
      setTime(dayjs())
      setDate(dayjs())
    }
  }, [event])

  const helperParticipant = event?.participants?.find(p => p.role === 'helper')
  const helpedParticipant = event?.participants?.find(p => p.role === 'helped')

  const helperName = helperParticipant?.user?.name || help?.notifier || 'tuntematon'
  const helpedName = helpedParticipant?.user?.name || user?.name || 'tuntematon'

  /** opens a dialog */
  const handleClickOpen = () => {
    setOpen(true)
  }

  /** closes a dialog */
  const handleClose = () => {
    setOpen(false)
    setTime(dayjs())
    setDate(dayjs())
    beans.reset()
    addInfo.reset()
    if (onClose) onClose()
  }

  const dispatchEventAction = (type, extra = {}) => {
    dispatch(updateEvent({
      id: event.id,
      action: {
        type,
        userId: user.id,
        ...extra
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!date || !time) return

    const basicsEvent = {
      date: date.toISOString(),
      time: time.toISOString(),
      beans: beans.fields.value,
      addInfo: addInfo.fields.value,
    }

    if (event) {
      const otherUser = event.participants.find(p => p.user !== user.id)

      dispatchEventAction('updateBasics', {
        ...basicsEvent,
        otherUserId: otherUser?.user
      })
    } else {
      dispatch(appendEvent({
        ...basicsEvent,
        helpId: help.id,
        role: help.asking ? 'helper' : 'helped',
        otherUserId: help.notifierId,
      }))
    }

    handleClose()
  }

  const handleAgree = async () => {
    await dispatchEventAction('agree')
    handleClose()
  }

  const handleComplete = ({ rating, comment }) => {
    dispatch(updateEvent({
      id: event.id,
      action: {
        type: 'complete',
        rating,
        review: comment,
        role: event.participants.find(p => p.user === user.id)?.role
      }
    }))
    handleClose()
  }

  const handleCancel = () => {
    const confirmed = window.confirm('Haluatko varmasti peruuttaa tapahtuman?')
    if (!confirmed) return
    dispatchEventAction('cancel', {
      reason: addInfo.fields.value
    })
    handleClose()
  }

  const status = event?.status

  const isLastModifiedByMe =
  event?.lastModifiedBy?.user.toString() === user?.id?.toString()
  const canAgree =
  event &&
  status === 'kesken' &&
  !isLastModifiedByMe

  const canEdit =
    !event || status === 'kesken'

  const canComplete =
  status === 'sovittu' &&
  !event.completedBy?.some(p => p.user === user.id)


  const eventDateTime = event
    ? dayjs(event.date).hour(dayjs(event.time).hour()).minute(dayjs(event.time).minute())
    : null

  const hasStarted = eventDateTime ? dayjs().isAfter(eventDateTime) : false

  const canCancel =
    (status === 'kesken' || status === 'sovittu') &&
    !hasStarted

  return (
    <div>
      {/* pressing the button opens a dialog */}
      {!event && (
        <Button variant='contained' size='large' fullWidth onClick={handleClickOpen}>
          🤝 SOVITAAN UUSI TAPAHTUMA
        </Button>
      )}
      {/* dialog-view */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{event ? (
          <>
            <Typography color='info'>
              {
                canEdit
                  ? `LÄHETÄ MUOKATTU EHDOTUS ${!isLastModifiedByMe ? 'TAI VAHVISTA EHDOTETTU' : ''}`
                  : ''}
            </Typography>
            <Typography > {event.helpId.task}</Typography>
          </>
        )
          : help.task
        }
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id='event-form'>
            <DialogContentText component="div">
              {event?.status === 'sovittu' && event.completedBy?.length === 1 && (
                event?.completedBy.some(u => u.user.toString() === user.id.toString())                  ?
                  <Typography color="warning.main">
                    Odottaa toisen osapuolen kuittausta
                  </Typography>
                  :
                  <Typography color="warning.main">
                    Merkitse valmiiksi antamalla palaute.
                    Palautteen antaminen siirtää pavut auttajalle.
                  </Typography>
              )}
              <>
                <Typography >Auttaja: { helperName }</Typography>
                <Typography >Auttaa: { helpedName }</Typography>
              </>

            </DialogContentText>

            {/* date -field*/}
            <Box display="flex" justifyContent="space-between" gap={2} sx={{ mt: 2 }}>
              <DatePicker
                label='pvm'
                value={date}
                onChange={(newValue) => setDate(newValue)}
                minDate={dayjs()}
                inputFormat='DD/MM/YYYY'
                textField={{
                  variant: 'outlined',
                  margin: 'normal',
                }} />

              {/* time -field */}
              < TimePicker
                label = 'aika'
                style={{ marginBottom: '20px' }}
                value={time}
                onChange={(newValue) => setTime(newValue)}
                inputFormat='HH:mm'
                textField={{
                  variant: 'outlined',
                  margin: 'normal',
                }}
              />
            </Box>

            {/* beans -field */}
            <TextField
              type="number"
              label="papua"
              fullWidth
              value={beans.fields.value}
              onChange={beans.fields.onChange}
              inputProps={{ min: 0, max: 1000 }}
            />

            {/* addInfo -field */}
            <TextField
              label="lisätietoja"
              multiline
              rows={4}
              fullWidth
              value={addInfo.fields.value}
              onChange={addInfo.fields.onChange}
              sx={{ mt: 2, mb: 2 }}
            />
          </form>

        </DialogContent>
        {/* BUTTONS KAHTEEN RIVIIN */}
        <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', gap: 1 }}>

          {/* RIVI 1 */}
          <Box display="flex" gap={1}>
            {canEdit && (
              <Button type='submit' variant='contained' form='event-form' fullWidth>
                Lähetä muokattu ehdotus
              </Button>
            )}
            {canAgree && (
              <Button onClick={handleAgree} color="success" variant='contained' fullWidth>
                Vahvista ehdotettu
              </Button>
            )}
            {canComplete && (
              <FeedBackSection
                canComplete={canComplete}
                handleComplete={handleComplete}
              />
            )}
          </Box>

          {/* RIVI 2 */}
          <Box display="flex" justifyContent="space-between" gap={1}>
            <Button onClick={handleClose} color='secondary' fullWidth>
              Takaisin
            </Button>

            {canCancel && (
              <Button onClick={handleCancel} color="error" fullWidth>
                Peruuta tapahtuma
              </Button>
            )}
          </Box>

        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EventForm
