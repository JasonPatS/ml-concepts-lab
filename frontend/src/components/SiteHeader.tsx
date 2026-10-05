import { Link } from 'react-router'

function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="font-bold tracking-tight">
          JasonPatS's ML Concepts Lab
        </Link>
      </div>
    </header>
  )
}

export default SiteHeader
