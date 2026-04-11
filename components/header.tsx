'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/how-it-works', label: 'How it Works' },
    { href: '/routes', label: 'Routes' },
    { href: '/track', label: 'Track Shipment' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-[#F8FAFC] transition-shadow duration-200 ${
        scrolled ? 'shadow-sm border-b border-[#E5E7EB]' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="px-5 py-2 bg-[#D9D9D9] flex items-center justify-center rounded-sm">
            <span className="font-bold text-[#111827] text-sm sm:text-base tracking-wide">
              Port2Port
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 py-2 px-4 bg-[#FEFFFF] border border-[#E5E7EB] rounded-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                isActive(link.href)
                  ? 'text-[#2563EB] bg-[#2563EB]/8'
                  : 'text-[#6B7280] hover:text-[#2563EB] hover:bg-[#2563EB]/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="border-[#2563EB] text-[#2563EB] bg-transparent hover:bg-[#2563EB]/10 hover:text-[#2563EB] font-medium"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Tablet: show Sign In only + hamburger */}
        <div className="hidden md:flex lg:hidden items-center gap-2 shrink-0">
          <Link href="/sign-in">
            <Button
              variant="outline"
              size="sm"
              className="border-[#2563EB] text-[#2563EB] bg-transparent hover:bg-[#2563EB]/10"
            >
              Sign In
            </Button>
          </Link>
          <button
            className="p-2 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile: hamburger only */}
        <button
          className="md:hidden p-2 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile / Tablet Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[57px] bg-black/20 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <nav className="lg:hidden absolute top-full left-0 right-0 z-50 bg-[#F8FAFC] border-t border-[#E5E7EB] shadow-lg">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-[#2563EB] bg-[#2563EB]/8 font-semibold'
                      : 'text-[#374151] hover:text-[#2563EB] hover:bg-[#2563EB]/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth buttons — shown in mobile, Sign Up only in tablet (Sign In already in header) */}
              <div className="flex flex-col sm:flex-row gap-2 pt-3 mt-2 border-t border-[#E5E7EB]">
                <Link href="/sign-in" className="md:hidden flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-[#2563EB] text-[#2563EB] bg-transparent hover:bg-[#2563EB]/10"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" className="flex-1">
                  <Button
                    className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}