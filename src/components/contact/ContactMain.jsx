import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  List,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useState, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import EventForm from '../event/EventForm'
import EventTable from '../event/EventTable'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ContactMain = ({ help, targetUserId }) => {
  const [open, setOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const events = useSelector(state => state.events.events)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const pastEvents =
  events
    .filter(e => e.helpId.id.toString() === help.id.toString())
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <Button
        variant='outlined'
        fullWidth
        color='info'
        onClick={handleClickOpen} >
        <LiveHelpOutlinedIcon sx={{ marginRight: 1 }}/> KYSY LISÄÄ ja SOVI AVUSTA
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ marginRight: 5 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, width: '80%' }} variant="h6" component="div">
              {help.task}
            </Typography>
            <Typography sx={{ ml: 2, flex: 1 }} align='right' variant="h6" component="div">
              {help.beans}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: '100%' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">TAPAHTUMAN KUVAUS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {help.description}
            </AccordionDetails>
          </Accordion>
          <Box>
            <EventForm help={help} />
            <Divider />
          </Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span"> 🤝 AIEMMAT </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <EventTable
                onEventClick={setSelectedEvent}
                events={pastEvents}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span">UUSI VIESTI</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CommentForm helpId={help.id} targetUserId={targetUserId} />
            </AccordionDetails>
          </Accordion>
          <Divider />
          <CommentList helpId={help.id} targetUserId={targetUserId} />
        </Box>
      </Dialog>
      {/* EVENT FORM */}
      {selectedEvent && (
        <EventForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>

  )
}

export default ContactMain
