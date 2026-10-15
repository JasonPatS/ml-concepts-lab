import { Link, useParams } from 'react-router'
import { findConcept } from '../data/concepts.ts'
import NotFoundPage from './NotFoundPage.tsx'

// The page at /concepts/:slug, one per concept.
function ConceptPage() {
  // slug is the :slug part of the URL, e.g. "linear-regression".
  const { slug } = useParams()
  const concept = findConcept(slug)

  // A URL like /concepts/typo matches the route but no concept.
  if (!concept) {
    return <NotFoundPage />
  }

  return (
    <article className="max-w-2xl">
      <title>{`${concept.title} · JasonPatS's ML Concepts Lab`}</title>
      <Link to="/" className="text-sm text-brand-600 hover:underline">
        ← All concepts
      </Link>
      <p className="mt-6 text-xs font-semibold tracking-wide text-brand-600 uppercase">
        {concept.category}
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">
        {concept.title}
      </h1>
      <p className="mt-4 text-lg text-olive-600">{concept.summary}</p>
      {/* Placeholder until this concept's explanation and demo are built. */}
      <div className="mt-8 rounded-xl border border-dashed border-olive-300 bg-white p-8 text-center text-olive-500">
        The explanation and interactive demo for this concept arrive in a later
        phase.
      </div>
    </article>
  )
}

export default ConceptPage
