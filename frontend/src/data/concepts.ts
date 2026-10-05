export type ConceptCategory = 'Regression' | 'Classification' | 'Clustering'

export type Concept = {
  slug: string
  title: string
  category: ConceptCategory
  summary: string
  isLive: boolean
}

export const concepts: Concept[] = [
  {
    slug: 'linear-regression',
    title: 'Linear regression',
    category: 'Regression',
    summary:
      'Fit a straight line through points and use it to predict a number.',
    isLive: false,
  },
  {
    slug: 'logistic-regression',
    title: 'Logistic regression',
    category: 'Classification',
    summary: 'Learn a boundary that separates two classes of points.',
    isLive: false,
  },
  {
    slug: 'k-nearest-neighbours',
    title: 'k-nearest neighbours',
    category: 'Classification',
    summary: 'Label a new point by letting its closest neighbours vote.',
    isLive: false,
  },
  {
    slug: 'k-means',
    title: 'k-means clustering',
    category: 'Clustering',
    summary:
      'Group unlabelled points into k clusters without any answers given.',
    isLive: false,
  },
]

export function findConcept(slug: string | undefined): Concept | undefined {
  return concepts.find((concept) => concept.slug === slug)
}
