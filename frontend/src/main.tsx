// Entry point: mounts the React app into <div id="root"> in index.html.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import { router } from './router.ts'

// The ! tells TypeScript the element exists (it's in index.html), so it isn't null.
// StrictMode adds extra checks in development only, such as running effects twice.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
