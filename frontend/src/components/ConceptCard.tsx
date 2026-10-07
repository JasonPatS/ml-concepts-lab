import { Link } from 'react-router'
import type { Concept } from '../data/concepts.ts'

type ConceptCardProps = {
  concept: Concept
}

function ConceptCard({ concept }: ConceptCardProps) {
  return (
    <Link
      to={`/concepts/${concept.slug}`}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">
          {concept.category}
        </span>
        {!concept.isLive && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Coming soon
          </span>
        )}
      </div>
      <h2 className="mt-2 text-lg font-semibold">{concept.title}</h2>
      <p className="mt-1 text-sm text-slate-600">{concept.summary}</p>
    </Link>
  )
}

export default ConceptCard
