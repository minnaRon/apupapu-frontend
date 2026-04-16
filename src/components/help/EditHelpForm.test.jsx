//AI
import { screen, fireEvent } from '@testing-library/react'
import { waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../testUtils'
import EditHelpForm from './EditHelpForm'
import { vi } from 'vitest'

// mockataan useField (ettei tarvitse testata sitä tässä)
vi.mock('../../hooks/useField', () => ({
  default: (type, initial) => ({
    fields: {
      value: initial,
      onChange: vi.fn()
    },
    reset: vi.fn()
  })
}))

// mockataan action
const mockDispatch = vi.fn()

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch
  }
})

const help = {
  id: '1',
  task: 'Old task',
  description: 'Old description',
  beans: 3
}

describe('EditHelpForm', () => {

  test('renders edit button', () => {
    renderWithProviders(<EditHelpForm help={help} />)

    expect(screen.getByText('MUOKKAA')).toBeInTheDocument()
  })

  test('opens dialog when button is clicked', () => {
    renderWithProviders(<EditHelpForm help={help} />)

    fireEvent.click(screen.getByText('MUOKKAA'))

    expect(screen.getByText('Muokataan apua')).toBeInTheDocument()
  })

  test('shows form fields when dialog opens', () => {
    renderWithProviders(<EditHelpForm help={help} />)

    fireEvent.click(screen.getByText('MUOKKAA'))

    expect(screen.getByLabelText('Apuna')).toBeInTheDocument()
    expect(screen.getByLabelText('Papua')).toBeInTheDocument()
    expect(screen.getByLabelText('Tarkempi kuvaus')).toBeInTheDocument()
  })

  test('closes dialog when cancel is clicked', async () => {
    renderWithProviders(<EditHelpForm help={help} />)

    fireEvent.click(screen.getByText('MUOKKAA'))
    fireEvent.click(screen.getByText('Peruuta'))

    await waitFor(() => {
      expect(screen.queryByText('Muokataan apua')).not.toBeInTheDocument()
    })
  })

  test('dispatches updateHelp on submit', () => {
    renderWithProviders(<EditHelpForm help={help} />)

    fireEvent.click(screen.getByText('MUOKKAA'))
    fireEvent.click(screen.getByText('Tallenna'))

    expect(mockDispatch).toHaveBeenCalled()
  })

})
