import { render, screen } from '@testing-library/react'
import { Home } from '../pages/Home'
import { describe, it, expect } from '@jest/globals'

describe('Home', () => {
  it('should render without errors', () => {
    render(<Home />)
    expect(screen).toBeTruthy()
  })
  it('should render Home', () => {
    render(<Home />)
    const homeText = screen.getByText('Home')
    expect(homeText).toBeTruthy()
  })
})