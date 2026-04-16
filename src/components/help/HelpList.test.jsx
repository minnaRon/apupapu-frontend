//AI
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../testUtils'
import HelpList from './HelpList'
import { vi } from 'vitest'

vi.mock('./Help', () => ({
  default: ({ help }) => {
    if (!help) return null

    return (
      <tr data-testid="help-row">
        <td>{help.task}</td>
        <td>{help.beans}</td>
      </tr>
    )
  }
}))

const helps = [
  {
    id: '1',
    task: 'B task',
    beans: 5,
    description: 'desc',
    asking: false,
    user: {
      id: 'u1',
      name: 'Matti'
    }
  },
  {
    id: '2',
    task: 'A task',
    beans: 10,
    description: 'desc2',
    asking: false,
    user: {
      id: 'u2',
      name: 'Liisa'
    }
  }
]

test('renders helps sorted by task', () => {
  renderWithProviders(<HelpList />, {
    preloadedState: {
      helps: { helps },
      filter: ''
    }
  })

  const rows = screen.getAllByTestId('help-row')

  // A tulee ennen B (sorttaus)
  expect(rows[0]).toHaveTextContent('A task')
  expect(rows[1]).toHaveTextContent('B task')
})

test('returns null when no helps', () => {
  const { container } = renderWithProviders(<HelpList />, {
    preloadedState: {
      helps: { helps: [] },
      filter: ''
    }
  })

  expect(container).toBeEmptyDOMElement()
})

test('filters helps by store filter', () => {
  renderWithProviders(<HelpList />, {
    preloadedState: {
      helps: { helps },
      filter: 'a'
    }
  })

  expect(screen.getByText('A task')).toBeInTheDocument()
  expect(screen.queryByText('B task')).toBeInTheDocument()
})

test('filters helps by prop filter', () => {
  renderWithProviders(
    <HelpList filter={(h) => h.task === 'B task'} />,
    {
      preloadedState: {
        helps: { helps },
        filter: ''
      }
    }
  )

  expect(screen.getByText('B task')).toBeInTheDocument()
  expect(screen.queryByText('A task')).not.toBeInTheDocument()
})

test('shows only paginated results', () => {
  const manyHelps = Array.from({ length: 15 }).map((_, i) => ({
    id: String(i),
    task: `Task ${i}`,
    beans: i,
    description: '',
    asking: false,
    user: { id: 'u', name: 'test' }
  }))

  renderWithProviders(<HelpList />, {
    preloadedState: {
      helps: { helps: manyHelps },
      filter: ''
    }
  })

  const rows = screen.getAllByTestId('help-row')

  // default rowsPerPage = 10
  expect(rows.length).toBe(10)
})

