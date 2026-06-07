'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Drives the prototype's scroll behaviours globally:
 *  - nav border on scroll
 *  - .reveal entrance animations (IntersectionObserver)
 *  - [data-count] count-up (stats strip)
 * Re-runs on route change so client-side navigation keeps the effects alive.
 */
export function ScrollFx() {
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // nav border on scroll
    const nav = document.querySelector('nav')
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // scroll reveal
    const reveals = Array.from(document.querySelectorAll('.reveal'))
    let revealIO: IntersectionObserver | undefined
    if (reduce) {
      reveals.forEach((el) => el.classList.add('in'))
    } else {
      revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              revealIO!.unobserve(e.target)
            }
          })
        },
        { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
      )
      reveals.forEach((el) => revealIO!.observe(el))
    }

    // count-up stats
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'))
    const animate = (el: HTMLElement) => {
      const target = parseInt(el.dataset.count || '0', 10)
      const suffix = el.dataset.suffix || ''
      if (reduce) {
        el.textContent = target + suffix
        return
      }
      const dur = 1100
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(eased * target) + (p === 1 ? suffix : '')
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target as HTMLElement)
            statIO.unobserve(e.target)
          }
        })
      },
      { threshold: 0.6 },
    )
    counters.forEach((c) => statIO.observe(c))

    return () => {
      window.removeEventListener('scroll', onScroll)
      revealIO?.disconnect()
      statIO.disconnect()
    }
  }, [pathname])

  return null
}
