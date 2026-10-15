import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout.tsx'
import ConceptPage from './pages/ConceptPage.tsx'
import HomePage from './pages/HomePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

// The site's URLs. Every page renders inside Layout (header and footer), in the
// spot where Layout places <Outlet />.
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      // index: true matches "/" exactly.
      { index: true, Component: HomePage },
      // :slug is a URL parameter, read in ConceptPage with useParams().
      { path: 'concepts/:slug', Component: ConceptPage },
      // '*' catches every URL that matched nothing above.
      { path: '*', Component: NotFoundPage },
    ],
  },
])
