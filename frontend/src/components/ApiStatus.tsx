import { useEffect, useState } from 'react'

type Status = 'checking' | 'online' | 'offline'

type HealthResponse = {
  status: string
}

const labels: Record<Status, string> = {
  checking: 'Checking API…',
  online: 'API online',
  offline: 'API offline',
}

const colors: Record<Status, string> = {
  checking: 'bg-slate-100 text-slate-600',
  online: 'bg-emerald-100 text-emerald-800',
  offline: 'bg-rose-100 text-rose-800',
}

function ApiStatus() {
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    const controller = new AbortController()

    async function checkHealth() {
      try {
        const response = await fetch('/api/health', {
          signal: controller.signal,
        })
        const data: HealthResponse = await response.json()
        setStatus(response.ok && data.status === 'ok' ? 'online' : 'offline')
      } catch {
        if (!controller.signal.aborted) {
          setStatus('offline')
        }
      }
    }

    checkHealth()

    return () => controller.abort()
  }, [])

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${colors[status]}`}
    >
      <span className="size-2 rounded-full bg-current" aria-hidden="true" />
      {labels[status]}
    </span>
  )
}

export default ApiStatus
