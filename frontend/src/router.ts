import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout.tsx'
import ConceptPage from './pages/ConceptPage.tsx'
import HomePage from './pages/HomePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'concepts/:slug', Component: ConceptPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
