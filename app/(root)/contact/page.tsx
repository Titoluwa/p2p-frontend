'use client'

import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1C4AB0] to-[#2563EB] text-white py-16 md:py-24 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/placeholder.svg"
            alt="Port background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-100 max-w-2xl">
            Have a question about shipping your vehicle? Our team is here to help. Get in touch with us for quotes, shipment updates, or general inquiries.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#111827]">Get In Touch</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="w-full border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                  <Input
                    type="email"
                    placeholder="john.herman@gmail.com"
                    className="w-full border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Input
                    type="text"
                    placeholder="e.g. Payment error"
                    className="w-full border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea
                    placeholder="Your message here..."
                    className="w-full border border-gray-300 min-h-32"
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Images Section */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-40 rounded-lg overflow-hidden bg-[#111827] col-span-1">
                  <Image
                    src="/placeholder.svg"
                    alt="Vehicle 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden bg-[#111827] col-span-1">
                  <Image
                    src="/placeholder.svg"
                    alt="Vehicle 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden bg-[#111827] col-span-2">
                  <Image
                    src="/placeholder.svg"
                    alt="Port operations"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#0F172A] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Subscribe to Newsletter</h2>
          <p className="text-gray-400 mb-6">
            Vehicle Freight isn't complicated. With our service and attention to detail, it's logistics.
          </p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your Email"
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
            <Button className="bg-primary hover:bg-primary-dark text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
