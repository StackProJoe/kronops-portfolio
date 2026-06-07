import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Kronops — AI Automation Consulting',
  description:
    'I go into businesses, find bottlenecks, and implement AI and automation that saves time and increases profit.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#080808] text-zinc-50 font-sans antialiased min-h-screen">
        <Nav />
        {children}
      </body>
    </html>
  )
}
