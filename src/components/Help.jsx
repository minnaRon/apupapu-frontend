import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeHelp } from '../reducers/helpReducer'

const Help = ({ help }) => {
  const [showDescription, setShowDescription] = useState(false)
  const user = useSelector(state => state.user.user)

  const dispatch = useDispatch()

  const deleteHelp = () => {
    if (window.confirm(`Poistetaanko ${help.task}?`)) {
      dispatch(removeHelp(help.id))
    }
  }

  return (
    <li className='help'>
      {help.task} {help.beans}

      <button style={{ marginLeft: '20px' }} onClick={() => setShowDescription(!showDescription)}>NÄYTÄ KUVAUS</button>

      { user && user.id === help.user.id &&
        <button style={{ marginLeft: '20px' }} onClick={deleteHelp}>POISTA</button>
      }

      <p>{showDescription && <span>{help.user.name}: {help.description}</span>}</p>
    </li>
  )
}

export default Help
