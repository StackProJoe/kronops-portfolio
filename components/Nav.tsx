import Link from 'next/link'
import Image from 'next/image'

export function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <Link href="/#top" className="wordmark">
          KR<Image src="/logo.png" alt="o" width={28} height={28} style={{ margin: '0 -1px' }} priority />NOPS
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
