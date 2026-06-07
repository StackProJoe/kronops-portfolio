import Link from 'next/link'

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 h-14 bg-[#080808]/95 backdrop-blur-sm border-b border-[#141414]">
      <Link href="/" className="text-[13px] font-bold tracking-[0.12em] uppercase text-zinc-50 hover:text-white transition-colors">
        KR<span className="text-amber-400">O</span>NOPS
      </Link>
      <div className="flex items-center gap-7">
        <Link href="/#work" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-150">
          Work
        </Link>
        <Link href="/#about" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-150">
          About
        </Link>
        <Link
          href="/#contact"
          className="bg-amber-400 text-black text-[11px] font-semibold px-4 py-1.5 rounded-[5px] tracking-wide hover:bg-amber-300 transition-colors duration-150"
        >
          Get in touch →
        </Link>
      </div>
    </nav>
  )
}
