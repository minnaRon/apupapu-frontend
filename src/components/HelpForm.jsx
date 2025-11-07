import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendHelp } from '../reducers/helpReducer'

const HelpForm = ({ helpFormRef }) => {
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [beans, setBeans] = useState('')

  const dispatch = useDispatch()

  const addHelp = async (event) => {
    event.preventDefault()
    helpFormRef.current.toggleVisibility()
    const newHelp = {
      task,
      beans,
      description: description || 'ei tarkempaa kuvausta',
    }
    dispatch(appendHelp(newHelp))
    setTask('')
    setDescription('')
    setBeans(0)
  }

  return (
    <div>
      <h3>Lisää uusi:</h3>
      <form style={{ color: 'green' }} onSubmit={addHelp}>
        <label>
          apuna:
          <input style={{ color: 'grey' }}
            value={task}
            onChange={event => setTask(event.target.value)} />
        </label>
        <br />
        <label>
          papua:
          <input
            style={{ width:'40px', color: 'grey' }}
            type='number'
            value={beans}
            onChange={event => setBeans(event.target.value)}
            min='0'
          />
        </label>
        <br />
        <label>
          tarkempi kuvaus:
          <br />
          <textarea
            style={{ color: 'grey' }}
            rows = "5"
            value={description}
            onChange={event => setDescription(event.target.value)} />
        </label>
        <br />
        <button type="submit">TALLENNA</button>
      </form>
    </div>
  )
}

export default HelpForm
