'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
// import { useRouter } from 'next/navigation'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/how-it-works', label: 'How it Works' },
    { href: '/routes', label: 'Routes' },
    { href: '/track', label: 'Track Shipment' },
    { href: '/contact', label: 'Contact' },
  ]
  //Make the header responsive to know which route is active so it can be highlighted with the primary color
  // const router = useRouter()
  // const activeRoute = router.
  // console.log(activeRoute)
  
  return (
    <header className="bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-2 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-3 px-10 bg-[#D9D9D9] flex items-center justify-center">
            <span className="hidden sm:inline font-bold text-gray-900">Port2Port</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 py-3 px-5 bg-[#FEFFFF] border border-[#E5E7EB] rounded-md">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-[#6B7280] hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/sign-in" className="hidden sm:block">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              Sign In
            </Button>
          </Link>

          <Link href="/sign-up" className="hidden sm:block">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              Sign Up
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/auth">
              <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                Sign In/Sign up
              </Button>
            </Link>
          </div>
        </nav>
      )}

    </header>
  )
}
