import Link from 'next/link'
import Image from 'next/image'

export function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <Link href="/#top" className="wordmark">
          <Image src="/logo.png" alt="Kronops" width={28} height={28} priority />
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
