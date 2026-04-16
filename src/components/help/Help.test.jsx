//AI
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../testUtils'
import Help from './Help'
import { vi } from 'vitest'

// mockataan child-komponentit (ettei testi hajoa niihin)
vi.mock('./EditHelpForm', () => ({
  default: () => <div>Edit form</div>
}))

vi.mock('../contact/ContactMain', () => ({
  default: () => <div>Contact</div>
}))

const help = {
  id: '1',
  task: 'Test task',
  beans: 5,
  description: 'Test description',
  notifier: 'Matti',
  notifierId: '123'
}

describe('Help component', () => {

  test('renders task and beans', () => {
    renderWithProviders(<Help help={help} />)

    expect(screen.getByText('Test task')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  test('expand button is disabled when no user', () => {
    renderWithProviders(<Help help={help} />, {
      preloadedState: {
        user: { user: null }
      }
    })

    const button = screen.getByLabelText('expand row')
    expect(button).toBeDisabled()
  })

  test('shows description when expanded and user exists', () => {
    renderWithProviders(<Help help={help} />, {
      preloadedState: {
        user: { user: { id: '999' } }
      }
    })

    const button = screen.getByLabelText('expand row')
    fireEvent.click(button)

    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Matti:')).toBeInTheDocument()
  })

  test('shows ContactMain when user is not notifier', () => {
    renderWithProviders(<Help help={help} />, {
      preloadedState: {
        user: { user: { id: '999' } } // eri kuin notifierId
      }
    })

    fireEvent.click(screen.getByLabelText('expand row'))

    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  test('shows delete button when user is notifier', () => {
    renderWithProviders(<Help help={help} />, {
      preloadedState: {
        user: { user: { id: '123' } } // sama kuin notifierId
      }
    })

    fireEvent.click(screen.getByLabelText('expand row'))

    expect(screen.getByText('POISTA')).toBeInTheDocument()
    expect(screen.getByText('Edit form')).toBeInTheDocument()
  })

  test('calls confirm when delete clicked', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)

    renderWithProviders(<Help help={help} />, {
      preloadedState: {
        user: { user: { id: '123' } }
      }
    })

    fireEvent.click(screen.getByLabelText('expand row'))
    fireEvent.click(screen.getByText('POISTA'))

    expect(confirmSpy).toHaveBeenCalled()

    confirmSpy.mockRestore()
  })

})
