import { IconButton, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import useDebounce from '../hooks/useDebounce'

const Search = () => {
  const [isSearchVisible, setSearchVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const debouncedFilter = useDebounce(searchTerm, 200)
  const inputRef = useRef(null)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible)
  }

  /** dispatch delayed search filter */
  useEffect(() => {
    dispatch(setFilter(debouncedFilter))
  }, [dispatch, debouncedFilter])

  /** clear the search field */
  const handleClear = () => {
    setSearchTerm('')
    inputRef.current?.focus()
  }

  return (
    <div>
      {!isSearchVisible &&<>
        < IconButton onClick={toggleSearch} color='success'>
          <SearchIcon />ETSI
        </IconButton>
      </>
      }
      {isSearchVisible && (
        <TextField
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
          value={searchTerm}
          inputRef={inputRef}
          style={{ marginBottom: '16px', marginTop: '16px' }}
          InputProps={{
            endAdornment: (
              <>
                <InputAdornment position="start">
                  <IconButton  onClick={toggleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>

                {searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear} edge="end">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )}
              </>
            ),
          }}
        />
      )}
    </div>
  )
}

export default Search
