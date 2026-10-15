import { Link } from 'react-router'
import type { Concept } from '../data/concepts.ts'

// The shape of this component's props. React always passes a component ONE
// object holding everything written on its tag, so <ConceptCard concept={c} />
// arrives as { concept: c }. This type describes that whole object.
type ConceptCardProps = {
  concept: Concept
}

// One clickable card on the home page, linking to that concept's page.
// `{ concept }: ConceptCardProps` reads in two parts:
// - `: ConceptCardProps` is the type of the whole props object.
// - `{ concept }` unpacks the `concept` key from it into a variable
//   (destructuring). It's a shorter way of writing:
//     function ConceptCard(props: ConceptCardProps) {
//       const concept = props.concept
function ConceptCard({ concept }: ConceptCardProps) {
  return (
    <Link
      to={`/concepts/${concept.slug}`}
      className="block rounded-xl border border-olive-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold tracking-wide text-brand-600 uppercase">
          {concept.category}
        </span>
        {/* Shown until the concept's demo is built and isLive becomes true. */}
        {!concept.isLive && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Coming soon
          </span>
        )}
      </div>
      <h2 className="mt-2 text-lg font-semibold">{concept.title}</h2>
      <p className="mt-1 text-sm text-olive-600">{concept.summary}</p>
    </Link>
  )
}

export default ConceptCard
