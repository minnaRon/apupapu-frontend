import { useState } from 'react'

/**
 *  use:  import useField from '../hooks/useField'
 *        const name = useField('<type of field here')
 *        <input  {...name} />
 *        name.reset()
*/
const useField = (type = 'text', initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    fields: {
      type,
      value,
      onChange,
    },
    reset
  }
}

export default useField
