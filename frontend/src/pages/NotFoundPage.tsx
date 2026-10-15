import { Link } from 'react-router'

// Shown for any URL the router doesn't know, and for unknown concept slugs.
function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <title>Page not found · JasonPatS's ML Concepts Lab</title>
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-olive-600">That page doesn't exist (yet).</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Back to all concepts
      </Link>
    </div>
  )
}

export default NotFoundPage
