import { useState } from 'react'

/**
 *  use:  import useField from '../hooks/useField'
 *        const name = useField('<type of field here')
 *        <input  {...name} />
 *        name.reset()
*/
const useField = (type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export default useField
