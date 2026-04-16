//AI
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import LoginForm from './LoginForm'

// mock redux dispatch
const mockDispatch = vi.fn()

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}))

// mock reducer action
vi.mock('../../reducers/userReducer', () => ({
  loginUser: (payload) => ({
    type: 'user/login',
    payload
  })
}))

const setup = (open = true) => {
  const setOpenLogin = vi.fn()

  render(
    <LoginForm openLogin={open} setOpenLogin={setOpenLogin} />
  )

  return { setOpenLogin }
}

test('renders login dialog when open', () => {
  setup(true)

  expect(screen.getByText('Kirjaudu sisään')).toBeInTheDocument()
  expect(screen.getByLabelText('Käyttäjätunnus')).toBeInTheDocument()
  expect(screen.getByLabelText('Salasana')).toBeInTheDocument()
})

test('updates username and password inputs', () => {
  setup(true)

  fireEvent.change(screen.getByLabelText('Käyttäjätunnus'), {
    target: { value: 'matti' }
  })

  fireEvent.change(screen.getByLabelText('Salasana'), {
    target: { value: 'salasana123' }
  })

  expect(screen.getByLabelText('Käyttäjätunnus').value).toBe('matti')
  expect(screen.getByLabelText('Salasana').value).toBe('salasana123')
})

test('dispatches loginUser on submit', () => {
  setup(true)

  fireEvent.change(screen.getByLabelText('Käyttäjätunnus'), {
    target: { value: 'matti' }
  })

  fireEvent.change(screen.getByLabelText('Salasana'), {
    target: { value: '1234' }
  })

  fireEvent.click(screen.getByText('Kirjaudu'))

  expect(mockDispatch).toHaveBeenCalled()

  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'user/login',
      payload: {
        username: 'matti',
        password: '1234'
      }
    })
  )
})

test('toggles password visibility', () => {
  setup(true)

  const passwordInput = screen.getByLabelText('Salasana')
  const toggleButton = screen.getAllByRole('button')[0]

  // default hidden
  expect(passwordInput).toHaveAttribute('type', 'password')

  fireEvent.click(toggleButton)

  expect(passwordInput).toHaveAttribute('type', 'text')
})

test('calls setOpenLogin false when cancel clicked', () => {
  const { setOpenLogin } = setup(true)

  fireEvent.click(screen.getByText('Peruuta'))

  expect(setOpenLogin).toHaveBeenCalledWith(false)
})


