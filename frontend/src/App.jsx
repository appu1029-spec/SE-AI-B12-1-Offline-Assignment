import { useEffect, useState } from 'react'

function formatUptime(total) {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return `${h}h ${m}m ${s}s`
}

export default function App() {
  const [info, setInfo] = useState(null)
  const [online, setOnline] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        // Relative path: works locally and in production
        const res = await fetch('/api/info')
        if (!res.ok) throw new Error('bad response')
        setInfo(await res.json())
        setOnline(true)
      } catch {
        setOnline(false)
      }
    }
    load()
    const timer = setInterval(load, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="page">
      <header className="top">
        <h1>Deploy Dashboard</h1>
        <span className={online ? 'badge ok' : 'badge down'}>
          {online ? 'Backend online' : 'Backend offline'}
        </span>
      </header>

      <p className="sub">
        React frontend + FastAPI backend, running in Docker containers behind Nginx with HTTPS.
        This page refreshes itself every 5 seconds.
      </p>

      <section className="grid">
        <div className="card">
          <span className="label">Container name</span>
          <strong>{info ? info.server_name : '...'}</strong>
        </div>
        <div className="card">
          <span className="label">Python version</span>
          <strong>{info ? info.python_version : '...'}</strong>
        </div>
        <div className="card">
          <span className="label">Backend uptime</span>
          <strong>{info ? formatUptime(info.uptime_seconds) : '...'}</strong>
        </div>
        <div className="card">
          <span className="label">Total visits</span>
          <strong>{info ? info.visits : '...'}</strong>
        </div>
      </section>

      <footer className="foot">
        Server time (UTC): {info ? info.server_time_utc : '...'}
      </footer>
    </main>
  )
}