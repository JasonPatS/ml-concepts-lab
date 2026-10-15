import { Outlet } from 'react-router'
import SiteHeader from './SiteHeader.tsx'

// Worked out once when the file loads, which is fine for a footer year.
const currentYear = new Date().getFullYear()

// The frame shared by every page: header, the current page, and footer.
function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        {/* React Router renders the page that matches the URL here. */}
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © {currentYear} JasonPatS ·{' '}
        <a
          href="https://github.com/JasonPatS/ml-concepts-lab"
          className="underline hover:text-slate-700"
        >
          Source on GitHub
        </a>
      </footer>
    </div>
  )
}

export default Layout
