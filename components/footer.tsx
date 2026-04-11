'use client'

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Mail, MapPin, Phone } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const companyLinks = [
  { label: "Services", href: "/services" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Routes", href: "/routes" },
  { label: "Track Shipment", href: "/track" },
]

const legalLinks = [
  { label: "Terms & Condition", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookies Policy", href: "/cookies" },
]

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.SubmitEvent) => {
    e.preventDefault()
    // handle subscribe
    setEmail("")
  }

  return (
    <footer className="bg-[#111827] text-white">
      
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
 
          <div className="border-l-4 border-[#2563EB] pl-4 shrink-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Subscribe to<br className="hidden sm:block" /> Newsletter
            </h3>
          </div>
 
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:max-w-xl md:max-w-2xl border border-white/20 rounded-lg p-1.5">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" required
              className="flex-1 bg-transparent border-none text-white placeholder:text-white/40 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-3"
            />
            <Button type="submit" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-5 py-2.5 rounded-md shrink-0 h-9">
              Subscribe
            </Button>
          </form>
 
        </div>
      </div>
 
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">
        <Separator className="bg-white/10" />
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">

          <div className="sm:col-span-3 lg:col-span-3">
            <div className="inline-block px-5 py-2 bg-[#D9D9D9] rounded-sm mb-4">
              <span className="font-bold text-[#111827]">Port2Port</span>
            </div>
            <p className="text-sm text-white leading-relaxed mb-5 max-w-xs">
              Vehicle freight isn't complicated. With our service and attention to detail, it's logistics.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-transparent border border-white/20 flex items-center justify-center hover:bg-[#2563EB] transition-colors">
                <FaLinkedin size={18} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-transparent border border-white/20 flex items-center justify-center hover:bg-[#2563EB] transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-transparent border border-white/20 flex items-center justify-center hover:bg-[#2563EB] transition-colors">
                <FaFacebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white hover:text-[#2563EB] transition-colors ">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Legal</h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white hover:text-[#2563EB] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-white">
                <span className="mt-0.5"><Mail className="w-4 text-[#2563EB]"/></span>
                <a href="mailto:port2port@gmail.com" className="hover:text-[#2563EB]/60 transition-colors">
                  port2port@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white">
                <span className="mt-0.5"><Phone className="w-4 text-[#2563EB]"/></span>
                <a href="tel:+2349085291086" className="hover:text-[#2563EB]/60 transition-colors">
                  +234 9085 291 086
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white">
                <span className="mt-0.5"><MapPin className="w-4 text-[#2563EB]"/></span>
                <span className="hover:text-[#2563EB]/60 transition-colors">113456 Melrose<br />SF 149860</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="flex items-center gap-2 mt-10">
          <p className="text-xs text-white">
            © 2026 Port2Port Inc. Developed by <span className="text-white">Sasomtech</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}