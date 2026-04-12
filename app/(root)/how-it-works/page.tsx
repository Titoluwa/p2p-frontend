'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PageHero } from '@/components/page-hero'
import { GetQuote } from '@/components/home/get-quote'
import { DocumentsSection, ProcessSteps } from '@/components/how-it-works'
import { PortInfo, FaqSection } from '@/components/info-faqs'

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <PageHero title="How Port2Port Global RoRo Shipping Ltd Works" description="A simple, guided process for shipping your vehicle from the UK to markets across the globe."/>
      
      <ProcessSteps/>

      <DocumentsSection/>

      <PortInfo/>

      <FaqSection/>

      <GetQuote/>

      <Footer />
    </div>
  )
}
