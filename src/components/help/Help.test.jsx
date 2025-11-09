import { render, screen } from '@testing-library/react'
import Help from './Help'

test('renders content', () => {
  const help = {
    task: 'testing',
    beans: 20,
    description: 'description here'
  }

  render(<Help help={help} />)

  const element = screen.findByText('testing')
  expect(element).toBeDefined()
})
