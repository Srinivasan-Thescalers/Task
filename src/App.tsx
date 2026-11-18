import { useEffect, useState } from 'react'
import { checkConnection, type ConnectionResult } from './lib/connection'

type Status = { state: 'checking' } | ({ state: 'done' } & ConnectionResult)

function App() {
  const [status, setStatus] = useState<Status>({ state: 'checking' })

  useEffect(() => {
    let cancelled = false
    checkConnection().then((result) => {
      if (!cancelled) setStatus({ state: 'done', ...result })
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="page">
      <h1>Vetranio Live Test</h1>
      {status.state === 'checking' && (
        <p className="status" role="status">
          Checking Supabase connection…
        </p>
      )}
      {status.state === 'done' && status.ok && (
        <p className="status status-ok" role="status">
          Connected to Supabase ✓
        </p>
      )}
      {status.state === 'done' && !status.ok && (
        <p className="status status-error" role="alert">
          Not connected to Supabase. {status.message}
        </p>
      )}
    </main>
  )
}

export default App
