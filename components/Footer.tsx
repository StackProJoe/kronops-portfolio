import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <Link href="/#top" className="wordmark">
          KR<Image src="/logo.png" alt="o" width={34} height={34} style={{ margin: '0 -6px' }} />NOPS
        </Link>
        <div className="foot-links">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <a href="mailto:joel@kronops.com">Email</a>
        </div>
        <div className="foot-meta">© 2026 Kronops · Built by Joel Gomez</div>
      </div>
    </footer>
  )
}
