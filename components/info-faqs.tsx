'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const faqs = [
    {
        question: "How long does shipping take?",
        answer:
        "Transit times vary by route and destination, but estimates are provided once your shipment is confirmed.",
    },
    {
        question: "Is my vehicle insured during shipping?",
        answer:
        "Yes, all vehicles are covered by our standard marine insurance policy during transit. Additional coverage options are available upon request.",
    },
    {
        question: "Can I ship non-running vehicles?",
        answer:
        "Yes. We offer specialised handling for non-running, salvage, and accident-damaged vehicles using controlled port equipment.",
    },
    {
        question: "Can I leave personal items in my vehicle?",
        answer:
        "We advise against leaving personal items in your vehicle. Customs authorities may require the vehicle to be empty, and we cannot be held responsible for any items left inside.",
    },
]


function Badge({ label }: Readonly<{ label: string }>) {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 border-[0.5px] border-[#F8FAFC] rounded-2xl bg-transparent">
            <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15" />
                </svg>
            </div>
            <span className="text-sm text-white font-medium whitespace-nowrap">{label}</span>
        </div>
    )
}

export function PortInfo() {
    return (
        <section className="bg-[#0A2540]">
            {/* Full-bleed split: image left | dark panel right */}
            <div className="flex flex-col md:flex-row min-h-[420px] md:min-h-[500px]">

                {/* Image — full width on mobile, half on desktop */}
                <div className="relative w-full h-64 sm:h-80 md:h-auto md:w-1/2 shrink-0">
                    <Image src="/images/how-it.jpg" alt="Heavy agricultural equipment at port" fill className="object-cover rounded-xl lg:rounded-r-2xl" priority />
                </div>

                {/* Dark text panel */}
                <div className="bg-[#0A2540] w-full md:w-1/2 flex flex-col items-start px-8 sm:px-10 lg:px-14 py-10 md:py-16">
                    
                    <div className="px-8 sm:px-10 lg:px-14 py-3 md:py-4 flex flex-col gap-6">
                        <Badge label="How we move vehicles" />
                    </div>

                    <div className="px-8 sm:px-10 lg:px-14 py-10 md:py-16 flex flex-col gap-6">

                        <div className="max-w-2xl flex flex-col gap-6">
                            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-medium text-[#F8FAFC] leading-tight">
                                What Happens at the Port
                            </h2>

                            <p className="font-sans text-sm sm:text-base text-[#F8FAFC] leading-relaxed">
                                Once your vehicle arrives at the port, it undergoes a standard inspection
                                and verification process. The vehicle is then prepared and securely
                                loaded onto a roll-on roll-off (RORO) vessel. Our team coordinates
                                handling to ensure safety and compliance throughout this stage.
                            </p>

                            <div>
                            <Link href="/quote">
                                <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-[#F8FAFC] font-semibold px-6 py-5 rounded-md">
                                    Request a Quote
                                </Button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function FaqItem({ question, answer, isOpen, onToggle }: Readonly<{
    question: string
    answer: string
    isOpen: boolean
  onToggle: () => void
}>) {
    return (
        <div
            className={`rounded-r-lg border transition-colors duration-200 overflow-hidden border-l-[6px] border-t-none border-r-none border-b-none ${
                isOpen ? "border-[#BBCFF9]  bg-gradient-to-b from-[#FFFFFF] to-[#F0F4FF]" : "border-[#EBEBEC] bg-[#FBFBFE]"
            }`}
            >

            <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left" aria-expanded={isOpen} >
                <span className={`text-sm sm:text-base font-semibold leading-snug ${isOpen ? "text-[#2563EB]" : "text-[#0A2540]"}`}>
                    {question}
                </span>
                <span className={`shrink-0 transition-colors ${isOpen ? "text-[#2563EB]" : "text-[#6B7280]"}`}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
            </button>

            {isOpen && (
                <div className="px-5 sm:px-6 pb-5">
                    <p className="text-sm text-[#6B7280] leading-relaxed pt-4">{answer}</p>
                </div>
            )}
        </div>
    )
}

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

    return (
        <section className="py-12 md:py-16 bg-[#F8FAFC]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-4 mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 border-[0.5px] border-[#6B7280] rounded-lg bg-transparent">
                        <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 256 256" fill="currentColor">
                                <path d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15" />
                            </svg>
                        </div>
                        <span className="text-sm text-[#111827] font-medium">FAQs</span>
                    </div>

                    <h2 className="font-sans text-2xl sm:text-3xl font-[500] text-[#0A2540]">
                        Get answers to your questions
                    </h2>
                </div>

                {/* Accordion wrapper card */}
                <div className="bg-[#EEF2FF] rounded-2xl py-6 sm:py-10 px-14 sm:px-20 flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <FaqItem
                        key={faq.question}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === i}
                        onToggle={() => toggle(i)}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}