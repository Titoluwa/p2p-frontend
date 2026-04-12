'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PageHero } from '@/components/page-hero'
import { GetQuote } from '@/components/home/get-quote'
import { LiteTrustBar } from '@/components/home/bar'
import { ServicesDetail } from '@/components/services-detail'

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero
        title="Our Shipping Services"
        description="We provide reliable port-to-port vehicle and equipment shipping from the UK to right-hand-drive destinations worldwide."
      />

      <LiteTrustBar/>
      <ServicesDetail/>
      <GetQuote/>
      <Footer />
    </div>
  )
}
