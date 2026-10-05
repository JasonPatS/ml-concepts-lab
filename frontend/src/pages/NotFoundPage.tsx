import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <title>Page not found · JasonPatS's ML Concepts Lab</title>
      <p className="text-sm font-semibold text-indigo-600">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-slate-600">That page doesn't exist (yet).</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Back to all concepts
      </Link>
    </div>
  )
}

export default NotFoundPage
