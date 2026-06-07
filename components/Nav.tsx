import Link from 'next/link'

export function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <Link href="/#top" className="wordmark">
          KR<span className="o">O</span>NOPS
        </Link>
        <div className="nav-links">
          <Link href="/#work" className="link">
            Work
          </Link>
          <Link href="/#about" className="link">
            About
          </Link>
          <Link href="/#contact" className="nav-cta">
            Get in touch →
          </Link>
        </div>
      </div>
    </nav>
  )
}
