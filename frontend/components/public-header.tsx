'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Sobre',        href: '#sobre' },
  { label: 'Serviços',     href: '#servicos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Planos',       href: '#planos' },
]

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/95 backdrop-blur-md border-b border-[var(--color-border)] h-16 shadow-sm'
          : 'bg-transparent h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Liber Laser Academy"
            width={130}
            height={44}
            className="object-contain h-16 sm:h-16 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-secondary text-[0.72rem] font-semibold tracking-[0.18em] uppercase hover:text-accent transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/login"
            className="text-secondary text-[0.72rem] font-semibold tracking-[0.12em] uppercase px-5 py-2.5 border border-[var(--color-border)] hover:border-accent hover:text-primary transition-all duration-200"
          >
            Área do aluno
          </Link>
          <a
            href="https://wa.me/55"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-bg text-[0.72rem] font-bold tracking-[0.12em] uppercase px-5 py-2.5 hover:opacity-90 transition-opacity duration-200"
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
          aria-label="Abrir menu"
        >
          <span
            className={`block w-6 h-px bg-primary transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-primary transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-primary transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-bg/98 backdrop-blur-md border-b border-[var(--color-border)] overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-5">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-secondary text-sm font-semibold tracking-[0.12em] uppercase hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="flex flex-col gap-3 pt-5 border-t border-[var(--color-border)]">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-center text-secondary text-xs font-semibold tracking-[0.12em] uppercase py-3 border border-[var(--color-border)]"
            >
              Área do aluno
            </Link>
            <a
              href="https://wa.me/55"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-accent text-bg text-xs font-bold tracking-[0.12em] uppercase py-3"
            >
              Falar com o Especialista
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
