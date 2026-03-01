'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle2 } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    { number: 1, title: 'Request a Quote', description: 'Submit your vehicle details and shipping requirements' },
    { number: 2, title: 'Review & Confirm', description: 'Get pricing and confirm your shipping details with our team' },
    { number: 3, title: 'Prepare Documents', description: 'Prepare all required shipping documentation' },
    { number: 4, title: 'Ship & Track', description: 'Your vehicle is shipped with real-time tracking' },
  ]

  const documents = [
    { title: 'VIC Registration Document', status: 'Required' },
    { title: 'Photo ID & Passport or Driving License', status: 'Required' },
    { title: 'Invoice or purchase receipt of applicants', status: 'Required' },
    { title: 'Export Declaration', status: 'Optional' },
    { title: 'Insurance Certificate', status: 'Optional' },
  ]

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Typical timelines vary depending on your specific route, but most shipments take 2-4 weeks. International routes may take longer and timelines are confirmed in your quote.'
    },
    {
      question: 'Is my vehicle insured during shipping?',
      answer: 'Yes, all our vehicles are insured throughout the shipping process. Insurance details are included in your shipping documentation.'
    },
    {
      question: 'Can I ship personal items in my vehicle?',
      answer: 'Personal items inside the vehicle are typically not allowed due to customs regulations. However, we can discuss exceptions on a case-by-case basis.'
    },
    {
      question: 'What if my vehicle breaks down during shipping?',
      answer: 'Our team is equipped to handle vehicle breakdowns. We\'ll contact you immediately and work to resolve the issue or arrange alternative transport.'
    },
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How Port2Port Works</h1>
          <p className="text-lg text-gray-100">
            A simple, guided process for shipping your vehicle from port to port across the globe.
          </p>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-[#0F172A] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center text-center">
              <div>
                <h3 className="font-semibold">Trusted by dealers & exporters</h3>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div>
                <h3 className="font-semibold">International shipping expertise</h3>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div>
                <h3 className="font-semibold">Secure payments</h3>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div>
                <h3 className="font-semibold">End-to-end tracking</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Lorem ipsum dolor sit amet</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {steps.map((step) => (
              <Card key={step.number} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="font-semibold text-[#111827] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary-dark text-white">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden bg-[#111827]">
              <Image
                src="/placeholder.svg"
                alt="Documents"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📋</span>
                <span className="text-sm font-semibold text-primary">Documentation</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">Required Shipping Documents</h2>
              <p className="text-gray-600 mb-8">
                To ensure a smooth export process, the following documents are typically required:
              </p>
              <div className="space-y-3">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#111827]">{doc.title}</h3>
                      <p className="text-xs text-gray-500">{doc.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Port Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📦</span>
                <span className="text-sm font-semibold text-primary">Heavy & Agricultural Equipment</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">What Happens at the Port</h2>
              <p className="text-gray-600 mb-4">
                Once your vehicle arrives at its port, a detailed inspection is performed. After a full inspection of customs and port procedures, the vehicle is loaded onto a vessel or transport trucks. Our team ensures every stage follows safety and compliance standards.
              </p>
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  Request a Quote
                </Button>
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden bg-[#111827]">
              <Image
                src="/placeholder.svg"
                alt="Port operations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">💡</span>
              <span className="text-sm font-semibold text-primary">Help</span>
            </div>
            <h2 className="text-3xl font-bold">Get answers to your questions</h2>
          </div>

          <Accordion type="single" collapsible className="bg-white rounded-lg border border-gray-200">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-semibold text-[#111827]">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
