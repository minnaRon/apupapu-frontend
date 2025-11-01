import { useState } from 'react'

const HelpForm = ({ createHelp }) => { 
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [beans, setBeans] = useState('')

  const addHelp = (event) => {
      event.preventDefault()
      createHelp({
        task: task,
        description: description || 'ei tarkempaa kuvausta',
        beans: beans
      })
      setTask('')
      setDescription('')
      setBeans(0)
  }
  
  return (
    <div>
      <h3>Lisää uusi:</h3>
      <form style={{ color: 'green' }} onSubmit={addHelp}>

        apuna:
        <input style={{color: 'grey'}}
          value={task}
           onChange={event => setTask(event.target.value)} />
        <br />

        papua:
        <input
          style={{ width:'40px', color: 'grey' }}
          type='number'
          value={beans}
          onChange={event => setBeans(event.target.value)}
          min='0'
        />
        <br />

        tarkempi kuvaus:
        <br />
        <textarea
          style={{color: 'grey'}}
          rows = "5"
          value={description}
          onChange={event => setDescription(event.target.value)} />
        <br />

        <button type="submit">TALLENNA</button>
      </form>
    </div>
  )
}

export default HelpForm
