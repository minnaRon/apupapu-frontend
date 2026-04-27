import { useState, useEffect } from 'react'

const useField = (type = 'text', initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  // event-muutokset
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

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
