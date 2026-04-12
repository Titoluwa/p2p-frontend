'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PageHero } from '@/components/page-hero'
import { GetQuote } from '@/components/home/get-quote'
import { ShippingRoutes } from '@/components/shipping-routes'
import { DeparturePorts, DestinationMarkets } from '@/components/routes-page'

export default function Routes() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <PageHero
        title="Our Shipping Routes"
        description="A simple, guided process for shipping your vehicle from the UK to markets across the globe."
      />

      <DeparturePorts/>
      
      <DestinationMarkets/>

      <ShippingRoutes />

      <GetQuote/>

      <Footer />
    </div>
  )
}
