const Help = ({ help, removeHelp, showDescription, setShowDescription }) => {
 
  return (
    <li className='help'>
      {help.tittle} {help.beans} 
      <button style={{ marginLeft: '20px' }} onClick={()=>setShowDescription(!showDescription)}>NÄYTÄ KUVAUS</button>
      <button style={{ marginLeft: '20px' }} onClick={removeHelp}>POISTA</button>
      <p>{showDescription && <span>{help.description}</span>}</p>
    </li>
  )
}

export default Help
