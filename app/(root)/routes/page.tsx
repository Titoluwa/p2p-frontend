'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Routes() {
  const ports = [
    { name: 'Southampton', description: 'Primary UK departure port', icon: '🌍' },
    { name: 'London Gateway', description: 'East coast shipping hub', icon: '⚓' },
    { name: 'Liverpool', description: 'Northwest regional port', icon: '🏴󐁧󐁢󐁳󐁣󐁴󐁿' },
  ]

  const destinations = [
    {
      region: 'East Africa',
      countries: [
        { name: 'Kenya (Mombasa)', days: '3 weeks' },
        { name: 'Tanzania', days: '3 weeks' },
        { name: 'Uganda', days: '3-4 weeks' },
        { name: 'Somalia', days: '3-4 weeks' },
      ],
    },
    {
      region: 'Southern Africa',
      countries: [
        { name: 'South Africa (Durban)', days: '4 weeks' },
        { name: 'Botswana', days: '4-5 weeks' },
        { name: 'Zimbabwe (Kariba)', days: '4 weeks' },
        { name: 'Namibia', days: '4-5 weeks' },
      ],
    },
    {
      region: 'West Africa',
      countries: [
        { name: 'Ghana (Tema)', days: '2 weeks' },
        { name: 'Nigeria (Lagos)', days: '2-3 weeks' },
        { name: 'Ivory Coast', days: '2 weeks' },
        { name: 'Senegal', days: '2 weeks' },
      ],
    },
    {
      region: 'Asia Pacific',
      countries: [
        { name: 'Japan', days: '3 weeks' },
        { name: 'Australia', days: '5-7 weeks' },
        { name: 'New Zealand', days: '6-7 weeks' },
        { name: 'Singapore', days: '4 weeks' },
      ],
    },
  ]

  const routes = [
    { route: 'UK - Nigeria', days: '1-2 weeks', icon: '🌍' },
    { route: 'UK - South Africa', days: '4-5 weeks', icon: '🌍' },
    { route: 'UK - Ghana', days: '1-2 weeks', icon: '🌍' },
    { route: 'UK - Australia', days: '5-7 weeks', icon: '🌍' },
  ]

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Shipping Routes</h1>
          <p className="text-lg text-gray-100">
            A simple, guided process for shipping your vehicle from port to port across the globe.
          </p>
        </div>
      </section>

      {/* UK Departure Ports */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🌊</span>
              <span className="text-sm font-semibold text-primary">Major Ports info</span>
            </div>
            <h2 className="text-3xl font-bold">UK Departure Ports</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We operate through major UK ports to ensure convenient shipping options
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {ports.map((port, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow border border-primary border-opacity-30">
                <div className="text-4xl mb-4">{port.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{port.name}</h3>
                <p className="text-sm text-gray-600">{port.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Markets */}
      <section className="py-16 bg-gradient-to-br from-[#1C4AB0] to-[#2563EB] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🚀</span>
              <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">Heavy & Agricultural Equipment</span>
            </div>
            <h2 className="text-3xl font-bold">Our Destination Markets</h2>
            <p className="text-gray-200 mt-4 max-w-2xl mx-auto">
              We ship vehicles to selected international markets where UK-sourced vehicles are in high demand
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {destinations.map((dest, i) => (
              <Card key={i} className="p-6 bg-white bg-opacity-10 border border-white border-opacity-20 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-4 text-white">{dest.region}</h3>
                <div className="space-y-2">
                  {dest.countries.map((country, j) => (
                    <div key={j} className="flex justify-between items-center text-sm">
                      <span className="text-gray-100">{country.name}</span>
                      <span className="text-gray-300 text-xs">{country.days}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden bg-gray-900">
              <Image
                src="/placeholder.svg"
                alt="Port operations"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📍</span>
                <span className="text-sm font-semibold text-primary">Help</span>
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Popular Shipping Routes</h2>
              <p className="text-gray-600 mb-6">
                Our most frequently used routes with regular sailings
              </p>
              <div className="space-y-3 mb-8">
                {routes.map((route, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{route.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{route.route}</h3>
                        <p className="text-xs text-gray-500">Monthly sailings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{route.days}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4 bg-white bg-opacity-30 w-fit px-3 py-1 rounded-full">
                <span className="text-sm font-semibold">📦 Get a Quote</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Ship Your Vehicle?</h2>
              <p className="text-gray-800 mb-6">
                Get a personalized logistics solution tailored to your business needs. Fast, transparent, and built to scale.
              </p>
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  Request a Quote
                </Button>
              </Link>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Shipping container"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
