import { Outlet } from 'react-router'
import SiteHeader from './SiteHeader.tsx'

const currentYear = new Date().getFullYear()

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
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
