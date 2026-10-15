import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { concepts } from '../data/concepts.ts'
import ApiStatus from './ApiStatus.tsx'

// The top bar: site name, API status badge, and a link to every concept.
function SiteHeader() {
  // Whether the navigation is open on small screens. On wider screens (sm: and
  // up) the navigation is always visible and the Menu button is hidden.
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-olive-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="font-bold tracking-tight">
          JasonPatS's ML Concepts Lab
        </Link>
        <div className="flex items-center gap-3">
          <ApiStatus />
          <button
            type="button"
            className="rounded-md border border-olive-300 px-3 py-1 text-sm sm:hidden"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      <nav
        className={`mx-auto max-w-5xl px-4 pb-3 sm:block ${menuOpen ? 'block' : 'hidden'}`}
      >
        <ul className="flex flex-col gap-1 sm:flex-row sm:gap-2">
          {concepts.map((concept) => (
            <li key={concept.slug}>
              {/* NavLink is a Link that knows when its URL is the current page,
                  which is how the active concept gets highlighted. */}
              <NavLink
                to={`/concepts/${concept.slug}`}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-1.5 text-sm ${
                    isActive
                      ? 'bg-brand-50 font-medium text-brand-700'
                      : 'text-olive-600 hover:bg-olive-100'
                  }`
                }
              >
                {concept.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default SiteHeader
