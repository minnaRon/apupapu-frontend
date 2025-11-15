import { Box } from '@mui/material'

import { useSelector } from 'react-redux'
import NewHelpForm from './NewHelpForm'
import AskHelpForm from './AskHelpForm'
import HelpList from './HelpList'
import Search from '../Search'

const HelpHomePage = () => {
  const user = useSelector(state => state.user.user)

  return (
    <>
      {user && (
        <>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <NewHelpForm />
            <AskHelpForm />
            <Search align='right'/>
          </Box>
          <h3>Tarjoan apua näihin askareisiin:</h3>
          <HelpList filter={h => h.user.id === user.id && !h.asking} />
          <h3>Pyydän apua näihin askareisiin:</h3>
          <HelpList filter={h => h.user.id === user.id && h.asking} />
        </>
      )}

      <h3>Apua kysytään näihin askareisiin:</h3>
      <HelpList filter={h => h.asking} />
      <h3>Apua saatavilla näihin askareisiin:</h3>
      <HelpList filter={h => !h.asking}/>
    </>
  )
}

export default HelpHomePage
