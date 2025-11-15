import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Help from './Help'

const HelpList = ({ filter = null }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [createdDataHelps, setCreatedDataHelps] = useState([])

  const { helps } = useSelector(state => state.helps)
  const filterFromStore = useSelector(state => state.filter)

  const createData = ( h ) => {
    return {
      id: h.id,
      task: h.task,
      beans: h.beans,
      notifier: h.user.name,
      notifierId: h.user.id,
      description: h.description,
      asking: h.asking || false
    }
  }

  /** creates filtered and sorted data for a table */
  useEffect(() => {
    const createdData = helps
      .filter(filter || (() => true))
      .filter(h => (
        filterFromStore
          ? h.task.toLowerCase().includes(filterFromStore)
          : true
      ))
      .sort((a, b) => a.task.localeCompare(b.task))
      .map(h => createData(h))
    setCreatedDataHelps(createdData)
  }, [helps, filter, filterFromStore])

  if (!helps || helps.length === 0) return null

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const displayedHelps = createdDataHelps.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          aria-label='sticky table'
          sx={{ minWidth: 250 }}
          size='small' >
          <TableHead>
            <TableRow>
              <TableCell align='left' >kuvaus</TableCell>
              <TableCell align='left'>askare</TableCell>
              <TableCell align='right'>papua</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedHelps.map((help) => (
              <Help key={help.id} help={help} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={createdDataHelps.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage='Rivejä sivulla:'
      />
    </Paper>
  )
}

export default HelpList

