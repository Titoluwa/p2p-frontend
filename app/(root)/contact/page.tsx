'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PageHero } from '@/components/page-hero'
import { ContactForm } from '@/components/contact-form'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <PageHero
        title="Contact Us"
        description="Have a question about shipping your vehicle? Our team is here to help. Get in touch with us for quotes, shipment updates, or general inquiries."
      />

      <ContactForm/>

      <Footer />
    </div>
  )
}
