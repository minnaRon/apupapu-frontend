import { useState, useEffect } from 'react'

/**
 *  e.g.  import useDebounce from '../hooks/useDebounce'
 *  use:  const debouncedFilter = useDebounce(searchTerm, 200)
 *        useEffect(() => {
 *         dispatch(setFilter(debouncedFilter))
 *        }, [dispatch, debouncedFilter])
*/
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
