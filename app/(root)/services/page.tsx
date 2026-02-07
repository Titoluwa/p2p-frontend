'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

export default function Services() {
  const services = [
    {
      title: 'Everyday vehicles, shipped with care',
      description: 'We offer secure, door-to-door shipping for personal and commercial cars. With full insurance coverage and real-time tracking through our systems. The vehicle is secured in a climate-controlled container, ensuring arrival in perfect condition.',
      image: '/placeholder.svg',
      icon: '📦',
      category: 'Cars-to-Shipping',
    },
    {
      title: 'Built for bigger vehicles',
      description: 'We handle the international shipment of larger trucks, including pickup trucks and motorhomes. Each shipment is carefully managed with specialized equipment for safe loading and unloading. The service is designed for customers shipping items to or from any country.',
      image: '/placeholder.svg',
      icon: '🏗️',
      category: 'Trucks & Motorhomes',
    },
    {
      title: 'Moving machines across borders',
      description: 'We handle shipping and transport support for the import of various construction machinery and equipment. We arrange comprehensive handling from a remote warehouse straight to the customer. The service is designed for customers shipping equipment in containers worldwide.',
      image: '/placeholder.svg',
      icon: '⚙️',
      category: 'Heavy & Agricultural Equipment',
    },
    {
      title: 'Designed for volume exports',
      description: 'We provide bulk export solutions for vehicle dealers, fleet managers, and large-scale operations. Our streamlined processes ensure cost-effectiveness while maintaining the highest quality standards for your vehicles.',
      image: '/placeholder.svg',
      icon: '📦',
      category: 'Featured & Bulk Shipping',
    },
    {
      title: 'Even when it doesn\'t drive',
      description: 'We offer specialized shipping for non-operational vehicles, including salvage cars, project vehicles, and damaged goods. All necessary lifting and loading equipment is used to protect the vehicle during transport.',
      image: '/placeholder.svg',
      icon: '🔧',
      category: 'Non-Running & Shipping Vehicles',
    },
  ]

  const features = [
    { title: 'Trusted by dealers & exporters', description: 'Proven track record with vehicle dealers and exporters worldwide' },
    { title: 'International shipping expertise', description: 'Experienced in handling complex international logistics' },
    { title: 'Secure payments', description: 'Safe and transparent payment processing' },
    { title: 'End-to-end tracking', description: '24/7 real-time tracking of your shipment' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1C4AB0] to-[#2563EB] text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/placeholder.svg"
            alt="Port background"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Shipping Services</h1>
          <p className="text-lg text-gray-100 max-w-2xl">
            We provide reliable port-to-port and equipped shipping from top to the right-side destinations.
          </p>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-[#0F172A] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">+</span>
                <div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, i) => (
              <div key={i} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:grid-cols-2 md:[&>*:first-child]:order-2' : ''}`}>
                <div className="relative h-80 rounded-lg overflow-hidden bg-gray-900">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{service.icon}</span>
                    <span className="text-sm font-semibold text-primary">{service.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link href="/contact">
                    <Button className="bg-primary hover:bg-primary-dark text-white">
                      Request a Quote
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Ship Your Vehicle?</h2>
              <p className="text-gray-800 mb-6">
                Get a personalized logistics solution tailored to your business needs. Fast, transparent, and built to scale.
              </p>
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  Request a Quote <ArrowRight className="w-4 h-4 ml-2" />
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
