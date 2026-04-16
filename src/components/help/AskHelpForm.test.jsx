//AI
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../testUtils'
import AskHelpForm from './AskHelpForm'
import { vi } from 'vitest'
import { waitFor } from '@testing-library/react'

// mock useField
vi.mock('../../hooks/useField', () => ({
  // eslint-disable-next-line no-unused-vars
  default: (type) => ({
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

describe('AskHelpForm', () => {

  test('renders ask button', () => {
    renderWithProviders(<AskHelpForm />)

    expect(screen.getByText('KYSY')).toBeInTheDocument()
  })

  test('opens dialog when button is clicked', () => {
    renderWithProviders(<AskHelpForm />)

    fireEvent.click(screen.getByText('KYSY'))

    expect(screen.getByText('Kysytään apua')).toBeInTheDocument()
  })

  test('shows form fields when dialog opens', () => {
    renderWithProviders(<AskHelpForm />)

    fireEvent.click(screen.getByText('KYSY'))

    expect(screen.getByLabelText('Apu')).toBeInTheDocument()
    expect(screen.getByLabelText('Papu arvio')).toBeInTheDocument()
    expect(screen.getByLabelText('Tarkempi kuvaus')).toBeInTheDocument()
  })

  test('closes dialog when cancel is clicked', async () => {
    renderWithProviders(<AskHelpForm />)

    fireEvent.click(screen.getByText('KYSY'))
    fireEvent.click(screen.getByText('Peruuta'))

    await waitFor(() => {
      expect(screen.getByText('Kysytään apua')).not.toBeVisible()
    })
  })

  test('dispatches appendHelp on submit', () => {
    renderWithProviders(<AskHelpForm />)

    fireEvent.click(screen.getByText('KYSY'))
    fireEvent.click(screen.getByText('Tallenna'))

    expect(mockDispatch).toHaveBeenCalled()
  })

})
