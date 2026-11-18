import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the page title', async () => {
    // Don't hit the network from tests.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 200 })))

    render(<App />)

    expect(screen.getByRole('heading', { name: 'Vetranio Live Test' })).toBeInTheDocument()
    expect(screen.getByText('Checking Supabase connection…')).toBeInTheDocument()
    // Wait for the check to finish (result depends on whether .env is set).
    expect(await screen.findByText(/Supabase ✓|Not connected to Supabase/)).toBeInTheDocument()
  })
})
