import { useState } from 'react'

const Help = ({ help, removeHelp }) => {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <li className='help'>
      {help.task} {help.beans}

      <button style={{ marginLeft: '20px' }} onClick={() => setShowDescription(!showDescription)}>NÄYTÄ KUVAUS</button>

      {removeHelp &&
        <button style={{ marginLeft: '20px' }} onClick={removeHelp}>POISTA</button>
      }

      <p>{showDescription && <span>{help.user.name}: {help.description}</span>}</p>
    </li>
  )
}

export default Help
