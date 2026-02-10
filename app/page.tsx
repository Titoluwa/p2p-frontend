'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Zap } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { Partners } from '@/components/home/partners'
import { WhyChooseUs } from '@/components/home/why-choose-us'

export default function Home() {
  const services = [
    {
      id: 1,
      title: 'Cars & SUVs',
      description: 'Specialized in shipping personal and commercial vehicles with full tracking.',
      icon: '🚗',
    },
    { 
      id: 2,
      title: 'Trucks & Motorhomes',
      description: 'Experience with oversized vehicles and special cargo handling.',
      icon: '🚚',
    },
    {
      id: 3,
      title: 'Heavy & Agricultural Equipment',
      description: 'Expert handling of industrial machinery and farming equipment.',
      icon: '⚙️',
    },
    {
      id: 4,
      title: 'Dealers & Bulk Shipping',
      description: 'Reliable bulk shipping solutions for vehicle dealers.',
      icon: '📦',
    },
    {
      id: 5,
      title: 'Non-Running & Salvage Vehicles',
      description: 'Safe transportation of non-operational and salvage vehicles.',
      icon: '🔧',
    },
    {
      id: 6,
      title: 'Heavy Machinery Transport',
      description: 'Professional transport of heavy industrial equipment worldwide.',
      icon: '🏗️',
    },
  ]

  const highlights = [
    { id: 1, icon: '✓', title: 'Cost-effective solutions', description: 'Competitive pricing without compromising quality' },
    { id: 2, icon: '✓', title: 'Hard-to-ship vehicles', description: 'We handle unique and challenging shipping needs' },
    { id: 3, icon: '✓', title: 'Timely and shipping', description: 'On-time delivery guaranteed for your peace of mind' },
  ]

  const testimonials = [
    {
      id: 1,
      quote: 'Port2Port made shipping my vehicle so simple. Great communication and fast delivery!',
      author: 'Sarah Johnson',
      role: 'Customer',
      image: '/placeholder.svg?height=48&width=48',
    },
    { 
      id: 2,
      quote: 'Professional service with attention to detail. Highly recommended!',
      author: 'Michael Chen',
      role: 'Business Partner',
      image: '/placeholder.svg?height=48&width=48',
    },
    {
      id: 3,
      quote: 'The best shipping experience I\'ve had. Will definitely use again!',
      author: 'Emma Davis',
      role: 'Regular Customer',
      image: '/placeholder.svg?height=48&width=48',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero/>
      <Partners/>
      
      <WhyChooseUs/>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-900">
              <Image
                src="/placeholder.svg"
                alt="Port operations"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">How it Works</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Trusted by Businesses Who Rely on Speed and Reliability
              </h2>
              <div className="space-y-4">
                {highlights.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/how-it-works">
                <Button className="mt-6 bg-primary hover:bg-primary-dark text-white">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Shipping Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From personal vehicles to heavy machinery, we have the expertise to handle all your shipping needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.author}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </Card>
            ))}
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
