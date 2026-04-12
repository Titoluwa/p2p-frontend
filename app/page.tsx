'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/home/hero'
import { Partners } from '@/components/home/partners'
import { HowItWork } from '@/components/home/how-it-work'
import { AboutRoro } from '@/components/home/about'
import { Testimonials } from '@/components/home/testimonals'
import { Services } from '@/components/home/service-cards'
import { TrustBar } from '@/components/home/bar'
import { Routes } from '@/components/home/routes'
import { GetQuote } from '@/components/home/get-quote'

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <Hero />
      <Partners />
      <HowItWork />
      <AboutRoro />
      <TrustBar/>
      <Services/>
      <Testimonials />
      <Routes/>
      <GetQuote/>
      <Footer />
    </div>
  )
}
