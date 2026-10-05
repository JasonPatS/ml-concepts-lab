import { Link, useParams } from 'react-router'
import { findConcept } from '../data/concepts.ts'
import NotFoundPage from './NotFoundPage.tsx'

function ConceptPage() {
  const { slug } = useParams()
  const concept = findConcept(slug)

  if (!concept) {
    return <NotFoundPage />
  }

  return (
    <article className="max-w-2xl">
      <title>{`${concept.title} · JasonPatS's ML Concepts Lab`}</title>
      <Link to="/" className="text-sm text-indigo-600 hover:underline">
        ← All concepts
      </Link>
      <p className="mt-6 text-xs font-semibold tracking-wide text-indigo-600 uppercase">
        {concept.category}
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">
        {concept.title}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{concept.summary}</p>
      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        The explanation and interactive demo for this concept arrive in a later
        phase.
      </div>
    </article>
  )
}

export default ConceptPage
