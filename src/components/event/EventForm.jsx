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

  const notifier = help?.notifier
  const userNotAsking = help?.notifierId === user.id && !help.asking
  const isEdit = Boolean(event)

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

  const handleAgree = () => {
    dispatchEventAction('agree')
  }

  const handleComplete = () => {
    dispatchEventAction('complete', {
      completedBy: event.completedBy || []
    })
  }

  const handleCancel = () => {
    dispatchEventAction('cancel', {
      reason: addInfo.fields.value
    })
  }

  const status = event?.status

  const otherUserNeedsToConfirm =
    event && event?.lastModifiedBy.toString() === user.id.toString()

  const canAgree =
    otherUserNeedsToConfirm

  const canEdit =
    !event || status === 'kesken'

  const canComplete =
  status === 'sovittu' &&
  !event.completedBy?.some(p => p.user === user.id)

  const canCancel =
    status === 'kesken' || status === 'sovittu'

  return (
    <div>
      {/* pressing the button opens a dialog */}
      {!event && (
        <Button variant='contained' size='large' fullWidth onClick={handleClickOpen}>
          🤝 SOVITAAN UUSI TAPAHTUMA
        </Button>
      )}
      {/* dialog-view */}
      <Dialog open={open || isEdit} onClose={handleClose}>
        <DialogTitle>{event ? (
          <>
            <Typography>{canEdit ? 'MUOKATTAVISSA': ''}</Typography>
            {event.helpId.task}
          </>
        )
          : help.task
        }
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id='event-form'>
            <DialogContentText component="div">              {event?.status === 'sovittu' && event.completedBy?.length === 1 && (
              <Typography color="warning.main">
                  Odottaa toisen kuittausta
              </Typography>
            )}
            {event &&
                <>
                  <Typography >Auttaja: {isUserHelper || userNotAsking ? user.name : otherParticipant.name}</Typography>
                  <Typography >Auttaa: {isUserHelper || userNotAsking ? otherParticipant.name : user.name}</Typography>
                </>}
            {help &&
                <>
                  <Typography >Auttaja: {help?.asking ? user.name : notifier}</Typography>
                  <Typography >Auttaa: {help?.asking ? notifier : user.name}</Typography>
                </>}
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
              type='number'
              label='papua'
              fullWidth
              slotProps={{
                htmlInput: {
                  max: 1000,
                  min: 0
                }
              }}
              sx={{ mt: 2 }}
              style={{ marginBottom: '20px' }}
              {...beans.fields}
            />

            {/* addInfo -field */}
            <TextField
              label='lisätietoja'
              multiline
              rows={4}
              fullWidth
              style={{ marginBottom: '20px' }}
              {...addInfo.fields}
            />
          </form>
          {event?.status === 'valmis' && (
            <EventReviewForm event={event} />
          )}
        </DialogContent>
        <DialogActions>

          {/* cancel button closes a dialog */}
          <Button onClick={handleClose} color='secondary'>
            Takaisin
          </Button>

          {/*event && (*/}
          <>
            {canEdit && (
              <Button type='submit' color='primary' form='event-form'>
                  Tallenna odottamaan vahvistus
              </Button>
            )}

            {canAgree && (
              <Button onClick={handleAgree} color="success">
                  Vahvista
              </Button>
            )}

            {canComplete && (
              <Button onClick={handleComplete} color="primary">
                  Merkitse tehdyksi
              </Button>
            )}
            {canCancel && (
              <Button onClick={handleCancel} color="error">
                  Peruuta tehtävä
              </Button>
            )}
          </>
          {/*} )}*/}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EventForm

