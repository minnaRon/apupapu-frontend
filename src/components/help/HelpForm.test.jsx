import { render, screen } from '@testing-library/react'
import HelpForm from './HelpForm'
import userEvent from '@testing-library/user-event'

test('<HelpForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createHelp = vi.fn()

  render(<HelpForm createHelp={createHelp} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('TALLENNA')

  await user.type(inputs[0], 'testing a form...')
  await user.click(sendButton)

  expect(createHelp.mock.calls).toHaveLength(1)
  expect(createHelp.mock.calls[0][0].task).toBe('testing a form...')
})
