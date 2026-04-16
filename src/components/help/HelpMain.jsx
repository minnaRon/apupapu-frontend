import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/material'

import { useState, useEffect }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NewHelpForm from './NewHelpForm'
import AskHelpForm from './AskHelpForm'
import HelpList from './HelpList'
import Search from '../Search'
import AgreementList from '../agreement/AgreementList'
import { initializeAgreements } from '../../reducers/agreementReducer'

const HelpMain = () => {
  const [expanded, setExpanded] = useState('panel3')

  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      setExpanded('panel1')
      dispatch(initializeAgreements())
    }
    setExpanded('panel3')
  }, [user, dispatch])

  //DEV console.log TARKISTUS agreements
  //const agreements = useSelector(state => state.agreements.agreements)
  //console.log('homepage agreement initializeAgreements', agreements)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const isExpanded = ['panel0', 'panel1', 'panel2', 'panel3', 'panel4'].reduce((acc, panel) => {
    acc[panel] = expanded === panel
    return acc
  }, {})

  /** changes style when expanded */
  const getAccordionSummaryStyles = (panel) => ({
    fontSize: isExpanded[panel] ? '20px' : '16px',
    color: isExpanded[panel] ? '#f8f9fdff' : '#3B82F6',
    fontWeight: isExpanded[panel] ? 'bold' : 'normal',
    backgroundColor: isExpanded[panel] ? '#3B82F6' : '#ffffff',
  })

  return (
    <>
      {user && (
        <>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <NewHelpForm />
            <AskHelpForm />
            <Search align='right'/>
          </Box>
          <Accordion expanded={isExpanded.panel0} onChange={handleChange('panel0')}>

            {/** agreements */}
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{
                color: isExpanded.panel0 ? ' #f8f9fdff' : '#3B82F6',
                backgroundColor: isExpanded.panel0 ? '#3B82F6' : 'white'
              }}
              />}
              aria-controls='panel0bh-content'
              id='panel0bh-header'
              sx={getAccordionSummaryStyles('panel0')}
            >
              <Typography component='span' sx={{ width: '33%', flexShrink: 0 }}>
                🤝
              </Typography>
              <Typography component='span'>
                tapahtumat
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0, margin: 0, width: '100%' }}>
              <AgreementList />
            </AccordionDetails>
          </Accordion>

          {/** user offers help */}
          <Accordion expanded={isExpanded.panel1} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{
                color: isExpanded.panel1 ? ' #f8f9fdff' : '#3B82F6',
                backgroundColor: isExpanded.panel1 ? '#3B82F6' : 'white'
              }}
              />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
              sx={getAccordionSummaryStyles('panel1')}
            >
              <Typography component='span' sx={{ width: '33%', flexShrink: 0 }}>
                TARJOAN
              </Typography>
              <Typography component='span'>
                Tarjoan apua näihin askareisiin
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0, margin: 0, width: '100%' }}>
              <HelpList filter={h => h.user.id === user.id && !h.asking} />
            </AccordionDetails>
          </Accordion>

          {/** user asks help */}
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{
                color: isExpanded.panel2 ? ' #f8f9fdff' : '#3B82F6',
                backgroundColor: isExpanded.panel2 ? '#3B82F6' : 'white'
              }}
              />}
              aria-controls='panel2bh-content'
              id='panel2bh-header'
              sx={getAccordionSummaryStyles('panel2')}
            >
              <Typography component='span' sx={{ width: '33%', flexShrink: 0 }}>
                KYSYN
              </Typography>
              <Typography component='span'>
                Kysyn apua näihin askareisiin
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0, margin: 0, width: '100%' }}>
              <HelpList filter={h => h.user.id === user.id && h.asking} />
            </AccordionDetails>
          </Accordion>
        </>
      )}

      {/** all offers for help */}
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{
            color: isExpanded.panel3 ? ' #f8f9fdff' : '#3B82F6',
            backgroundColor: isExpanded.panel3 ? '#3B82F6' : 'white'
          }}
          />}
          aria-controls='panel3bh-content'
          id='panel3bh-header'
          sx={getAccordionSummaryStyles('panel3')}
        >
          <Typography component='span' sx={{ width: '33%', flexShrink: 0 }}>
            TARJOTAAN
          </Typography>
          <Typography component='span' >
            Tarjotaan apua näihin askareisiin
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, margin: 0, width: '100%' }}>
          <HelpList filter={h => !h.asking}/>
        </AccordionDetails>
      </Accordion>

      {/** all requests for help */}
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{
            color: isExpanded.panel4 ? ' #f8f9fdff' : '#3B82F6',
            backgroundColor: isExpanded.panel4 ? '#3B82F6' : 'white'
          }}
          />}
          aria-controls='panel4bh-content'
          id='panel4bh-header'
          sx={getAccordionSummaryStyles('panel4')}
        >
          <Typography component='span' sx={{ width: '33%', flexShrink: 0 }}>
            KYSYTÄÄN
          </Typography>
          <Typography component='span'>
            Kysytään apua näihin askareisiin
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, margin: 0, width: '100%' }}>
          <HelpList filter={h => h.asking} />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default HelpMain
