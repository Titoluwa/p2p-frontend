'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle } from 'lucide-react'

export default function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState('')

  const shipmentStatus = [
    { status: 'Vehicle Collected', date: 'Jan 12, 2025', location: 'Vehicle collected from customer location in Manchester', completed: true },
    { status: 'At UK Port', date: 'Jan 12, 2025', location: 'Vehicle arrived at Southampton port facility', completed: true },
    { status: 'In Transit', date: 'Jan 12, 2025', location: 'Loaded on vessel MS Ocean Express, en route to destination', completed: true },
    { status: 'Arrival at Destination', date: 'Expected Feb 10, 2025', location: 'Expected arrival at Mombasa port', completed: false },
  ]

  const shipmentDetails = {
    trackingId: 'UK-12345',
    status: 'In Transit',
    origin: 'Southampton, UK',
    destination: 'Mombasa, Kenya',
    departureDate: 'Jan 15, 2025',
    estimatedArrival: 'Feb 10, 2025',
  }

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Shipment</h1>
          <p className="text-lg text-gray-100">
            Tracking updates are provided once your vehicle has been booked and processed. Enter your tracking number below to view the current status of your shipment.
          </p>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-[#0F172A] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-primary">+</span>
              <span>Trusted by dealers & exporters</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">+</span>
              <span>International shipping expertise</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">+</span>
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">+</span>
              <span>End-to-end tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#111827]">Tracking Number</h2>
            <p className="text-gray-600 mb-4">
              You can find your tracking number in your booking confirmation email
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="e.g. UK-12345"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1 border border-gray-300"
              />
              <Button className="bg-primary hover:bg-primary-dark text-white whitespace-nowrap">
                Track
              </Button>
            </div>
          </Card>

          {/* Shipment Info */}
          <div className="mb-12 space-y-6">
            <Card className="p-6 bg-[#2563EB]/10 border border-primary">
              <Badge className="mb-4 bg-primary text-white">In Transit</Badge>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600">Tracking ID</h3>
                  <p className="text-lg font-bold text-[#111827] mt-1">{shipmentDetails.trackingId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600">Origin</h3>
                  <p className="text-lg font-bold text-[#111827] mt-1">{shipmentDetails.origin}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600">Destination</h3>
                  <p className="text-lg font-bold text-[#111827] mt-1">{shipmentDetails.destination}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600">Departure</h3>
                  <p className="text-lg font-bold text-[#111827] mt-1">{shipmentDetails.departureDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600">Est. Arrival</h3>
                  <p className="text-lg font-bold text-[#111827] mt-1">{shipmentDetails.estimatedArrival}</p>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-8 text-[#111827]">Shipment Status</h3>
              <div className="space-y-6">
                {shipmentStatus.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {item.completed ? (
                        <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-8 h-8 text-gray-300 flex-shrink-0" />
                      )}
                      {i < shipmentStatus.length - 1 && (
                        <div className={`w-1 flex-1 my-2 ${item.completed ? 'bg-primary' : 'bg-gray-300'}`} style={{ minHeight: '2rem' }} />
                      )}
                    </div>
                    <div className="pb-4">
                      <h4 className={`font-semibold ${item.completed ? 'text-[#111827]' : 'text-gray-600'}`}>
                        {item.status}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                      <p className="text-sm text-gray-600 mt-2">{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
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
              <h2 className="text-3xl font-bold mb-4 text-[#111827]">Ready to Ship Your Vehicle?</h2>
              <p className="text-gray-800 mb-6">
                Get a personalized logistics solution tailored to your business needs. Fast, transparent, and built to scale.
              </p>
              <Button className="bg-primary hover:bg-primary-dark text-white">
                Request a Quote
              </Button>
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
