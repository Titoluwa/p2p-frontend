import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 pb-8 border-b border-gray-700">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Subscribe to Newsletter</h3>
            <p className="text-sm text-gray-400">
              Vehicle Freight isn't complicated. With our service and attention to detail, it's logistics.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your Email"
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
            <Button className="bg-primary hover:bg-primary-dark text-white whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">COMPANY</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/routes" className="text-gray-400 hover:text-white transition-colors">
                  Routes
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-gray-400 hover:text-white transition-colors">
                  Track Shipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">LEGAL</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">CONTACT</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <a href="mailto:port2port@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  port2port@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <a href="tel:+234 9061 231 086" className="text-gray-400 hover:text-white transition-colors">
                  +234 9061 231 086
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-gray-400">
                  11 West Avenue
                  <br />
                  AF 109600
                </span>
              </li>
            </ul>
          </div>

          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-lg">P2</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              © 2025 Port2Port Inc.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
