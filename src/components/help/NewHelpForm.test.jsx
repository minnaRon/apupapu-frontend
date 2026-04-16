//AI
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../testUtils'
import NewHelpForm from './NewHelpForm'
import { vi } from 'vitest'

// mock useField
vi.mock('../../hooks/useField', () => ({
  default: () => ({
    fields: {
      value: '',
      onChange: vi.fn()
    },
    reset: vi.fn()
  })
}))

// mock dispatch
const mockDispatch = vi.fn()

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch
  }
})

describe('NewHelpForm', () => {

  test('renders add button', () => {
    renderWithProviders(<NewHelpForm />)

    expect(screen.getByText('TARJOA')).toBeInTheDocument()
  })

  test('opens dialog when add button is clicked', () => {
    renderWithProviders(<NewHelpForm />)

    fireEvent.click(screen.getByText('TARJOA'))

    expect(screen.getByText('Tarjotaan uusi apu')).toBeInTheDocument()
  })

  test('shows form fields when dialog is open', () => {
    renderWithProviders(<NewHelpForm />)

    fireEvent.click(screen.getByText('TARJOA'))

    expect(screen.getByLabelText(/otsikko/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/määrä/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tarkempi kuvaus/i)).toBeInTheDocument()
  })

  test('closes dialog when cancel is clicked', () => {
    renderWithProviders(<NewHelpForm />)

    fireEvent.click(screen.getByText('TARJOA'))
    fireEvent.click(screen.getByText('Peruuta'))

    // MUI Dialog jää DOMiin → tarkistetaan visibility
    expect(screen.getByText('Tarjotaan uusi apu')).not.toBeVisible()
  })

  test('dispatches appendHelp on submit', () => {
    renderWithProviders(<NewHelpForm />)

    fireEvent.click(screen.getByText('TARJOA'))
    fireEvent.click(screen.getByText('Tallenna'))

    expect(mockDispatch).toHaveBeenCalled()
  })

})
