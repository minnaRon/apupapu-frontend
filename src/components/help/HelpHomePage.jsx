import { useSelector } from 'react-redux'
import NewHelpForm from './NewHelpForm'
import HelpList from './HelpList'

const HelpHomePage = () => {
  const user = useSelector(state => state.user.user)

  return (
    <>
      {user && (
        <>
          <NewHelpForm />
          <h3>Tarjoan apua näihin askareisiin:</h3>
          <HelpList filter={h => h.user.id === user.id} />
        </>
      )}

      <h3>Apua saatavilla näihin askareisiin:</h3>
      <HelpList />
    </>
  )
}

export default HelpHomePage
