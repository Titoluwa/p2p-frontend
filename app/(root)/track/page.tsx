'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PageHero } from '@/components/page-hero'
import { TrustBar } from '@/components/home/bar'
import { TrackShipment } from '@/components/track'

export default function TrackShipmentPage() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <PageHero 
        title="Track Your Shipment"
        description="Tracking updates are provided once your vehicle has been booked and processed. Enter your tracking number below to view the current status of your shipment."
      />
      <TrustBar/>

      <TrackShipment/>

      <Footer />
    </div>
  )
}
