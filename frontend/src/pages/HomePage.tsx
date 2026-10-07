import ConceptCard from '../components/ConceptCard.tsx'
import { concepts } from '../data/concepts.ts'

function HomePage() {
  return (
    <>
      <title>JasonPatS's ML Concepts Lab</title>
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Learn machine learning by playing with it
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Each page explains one concept and lets you experiment with a real
          model running on a Python backend.
        </p>
      </section>
      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {concepts.map((concept) => (
          <ConceptCard key={concept.slug} concept={concept} />
        ))}
      </section>
    </>
  )
}

export default HomePage
