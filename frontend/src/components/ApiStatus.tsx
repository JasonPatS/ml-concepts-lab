import { useEffect, useState } from 'react'

// The header badge that shows whether the backend is reachable. It starts as
// "Checking API…", then changes to "API online" or "API offline".

// The three states the badge can be in.
type Status = 'checking' | 'online' | 'offline'

// The part of the backend's HealthResponse (backend/app/schemas/health.py) that
// this component reads. Extra keys in the JSON, like "environment", are ignored.
// Unlike the backend's Pydantic class, a TypeScript type is only a hint: it
// helps the editor, but nothing checks the real JSON against it while running.
type HealthResponse = {
  status: string
}

// Lookup tables: the text and the Tailwind colour classes for each state.
// Record<Status, string> means "one string for EVERY Status value", so adding a
// fourth status without a label or colour becomes a TypeScript error.
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

// How it works, start to finish.
//
// In production (the built site, where StrictMode's extra checks are off):
// 1. The badge appears showing "Checking API…" (status starts as 'checking').
// 2. The effect runs once: it creates controller A and calls checkHealth().
// 3. checkHealth sends request A and waits at `await`; the page keeps working.
// 4. The reply arrives:
//    - backend fine: response.ok and "ok", so setStatus('online'): green.
//    - backend broken or unreachable: fetch() or response.json() throws, so
//      catch runs. Controller A was never aborted, so setStatus('offline'): red.
//
// In development (npm run dev), StrictMode adds a test run first:
// 1. The effect runs: it creates controller 1 and starts request 1.
// 2. StrictMode removes the badge straight away to test the cleanup, which
//    calls controller1.abort(). Request 1 is cancelled and lands in catch, but
//    controller 1's aborted flag is true, so the `if` skips it: no change.
//    (Without that `if`, request 1 could set 'offline' after request 2 had
//    already set 'online'.)
// 3. The badge is added back and the effect runs again with a NEW controller 2
//    and request 2. From here it's the same as production steps 3 and 4.
//
// The backend is checked once per page load: if it stops later, the badge only
// shows that after a refresh.
function ApiStatus() {
  // The badge's memory. `status` is the current state, starting as 'checking';
  // setStatus is the only way to change it. Every setStatus call with a new
  // value makes React run ApiStatus() again and redraw the badge.
  const [status, setStatus] = useState<Status>('checking')

  // Work to do after the badge is on screen, kept out of the drawing code
  // because a network request is slow. The empty [] means it runs after the
  // first appearance only, not after every redraw.
  useEffect(() => {
    // Lets the cleanup below cancel the request if the badge disappears first.
    // A new controller is made every time this effect runs, so cancelling one
    // run's request never affects the next run's request.
    const controller = new AbortController()

    // Define the job here, then call it just below. The function given to
    // useEffect can't be async itself (React expects it to return nothing or a
    // cleanup function, not a Promise), so the `await` work lives in this
    // separate async function. It sits inside the effect to reach `controller`.
    async function checkHealth() {
      try {
        // A relative URL: in development, Vite's proxy forwards it to FastAPI.
        // `await` pauses only this function until the reply arrives; the page
        // keeps working meanwhile.
        const response = await fetch('/api/health', {
          signal: controller.signal,
        })
        // fetch() sent the GET request above. response.json() doesn't send
        // anything: it reads the reply's body (JSON text) into a JS object.
        const data: HealthResponse = await response.json()
        // Online only if the HTTP status means success (200 to 299) and the
        // body says "ok".
        setStatus(response.ok && data.status === 'ok' ? 'online' : 'offline')
      } catch {
        // catch is plan B: it runs only when a line inside try throws. Every
        // way the request can end:
        // - good answer (200 and "ok")         -> try sets 'online'
        // - error status with a JSON body,
        //   such as FastAPI's 404              -> try sets 'offline'
        // - backend off in development (Vite's
        //   proxy answers 502, empty body)     -> response.json() throws: here
        // - a body that isn't JSON, such as
        //   "Internal Server Error"            -> response.json() throws: here
        // - nothing reachable at all           -> fetch() throws: here
        // - we cancelled with abort()          -> fetch() throws: here
        //
        // Two different things land here:
        // - a real failure (network error, or a body that isn't JSON), or
        // - our own controller.abort() from the cleanup below, because a
        //   cancelled fetch throws an error too.
        // signal.aborted starts as false and only turns true when we call
        // abort(); a failure never changes it. So `!aborted` reads "we didn't
        // cancel it", which means it's a real failure: show offline.
        // If we did cancel, we learned nothing about the backend (we stopped
        // listening before it answered), so the badge is left as it is.
        // (See "In development" above the function for when that happens.)
        if (!controller.signal.aborted) {
          setStatus('offline')
        }
      }
    }

    // Start the job. Not awaited: the effect finishes straight away and the
    // request carries on in the background.
    checkHealth()

    // Cleanup: an effect that starts something should stop it when the
    // component goes away. React calls this only when the badge is removed
    // from the page (rare: the header is on every page), and once on purpose
    // in development, where StrictMode tests that the cleanup works. It does
    // NOT run on a page refresh or when the tab closes: the browser simply
    // throws the whole page away, including any unfinished request.
    return () => controller.abort()
  }, [])

  // What appears on screen, built from the current status. labels[status] and
  // colors[status] look the state up in the tables above. The backtick string
  // is a template string, like a Python f-string: the fixed classes, then
  // ${...} slots in the colour classes for this state.
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${colors[status]}`}
    >
      {/* The coloured dot. bg-current gives it the same colour as the text.
          aria-hidden hides it from screen readers, since the text next to it
          says the same thing. */}
      <span className="size-2 rounded-full bg-current" aria-hidden="true" />
      {labels[status]}
    </span>
  )
}

export default ApiStatus
