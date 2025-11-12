import { useSelector } from 'react-redux'
import HelpForm from './HelpForm'
import HelpList from './HelpList'

const HelpHomePage = () => {
  const user = useSelector(state => state.user.user)

  return (
    <>
      {user && (
        <>
          <HelpForm />
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
