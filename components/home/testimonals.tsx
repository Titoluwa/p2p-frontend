'use client'

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { StarIcon } from "@/public/icons"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Mark Alisson",
    company: "EazyConcepts",
    rating: 4,
    quote: "Our experience with Port2Port has been nothing short of exceptional. Their strategic insights and meticulous planning have propelled our firm towards unprecedented growth.",
    avatar: "/images/profiles/test-5.jpg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "AutoExports Ltd",
    rating: 5,
    quote: "Fast, reliable and completely transparent throughout the entire shipping process. Our vehicles arrived on time and in perfect condition. Highly recommend!",
    avatar: "/images/profiles/test-1.jpg",
  },
  {
    id: 3,
    name: "James Okafor",
    company: "Lagos Motors",
    rating: 5,
    quote: "I've shipped over 30 vehicles through Port2Port and they've never let me down. The tracking system gives me real-time peace of mind.",
    avatar: "/images/profiles/test-2.jpg",
  },
  {
    id: 4,
    name: "Amara Nwosu",
    company: "Global Freight Co.",
    rating: 4,
    quote: "Professional team, competitive pricing, and smooth documentation process. Port2Port made expanding our fleet internationally effortless.",
    avatar: "/images/profiles/test-3.jpg",
  },
  {
    id: 5,
    name: "David Chen",
    company: "Pacific Auto Group",
    rating: 5,
    quote: "From quote to delivery, the entire process was seamless. Their customer service is always responsive and solutions-focused.",
    avatar: "/images/profiles/test-4.jpg",
  },
]

function StarRating({ rating }: Readonly<{ rating: number }>) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i.toFixed()} width="22" height="22" viewBox="0 0 24 24" fill={i < rating ? "#F2A900" : "none"} stroke="#F2A900" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((a) => (a + 1) % testimonials.length)

  const getVisible = () => {
    const indices = []
    for (let i = -2; i <= 2; i++) {
      indices.push((active + i + testimonials.length) % testimonials.length)
    }
    return indices
  }

  const visible = getVisible()
  const current = testimonials[active]

  return (
    <section className="bg-white pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
        <div className="flex flex-col items-center mb-8">
          <div className="max-w-fit flex items-center px-4 py-2 gap-3 mb-5 border border-[#E5E7EB] rounded-2xl bg-white">
            <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center">
              <StarIcon />
            </div>
            <span className="text-sm text-[#111827] font-medium whitespace-nowrap">Our Reviews</span>
          </div>
          <h2 className="font-sans font-medium text-2xl sm:text-4xl font-[500] text-[#0A2540] text-center">
            What People Say about Us
          </h2>
        </div>
      </div>

      <div className="relative w-full bg-[url('/images/bg-testimony.png')] bg-cover bg-top  pt-12 md:pt-16 pb-12 md:pb-16" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 pt-10 md:pt-16">

          <div className="flex items-center justify-between gap-2 sm:gap-6 mb-6 md:mb-10">

            <Button onClick={prev} aria-label="Previous"
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center hover:bg-[#2563EB] hover:border-[#2563EB] hover:text-white transition-colors text-[#6B7280] shrink-0"
            >
              <ArrowLeft size={16} className="sm:hidden" />
              <ArrowLeft size={20} className="hidden sm:block" />
            </Button>

            {/* Avatars */}
            <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-10 lg:gap-16 flex-1 overflow-hidden">
              {visible.map((idx, pos) => {
                const t = testimonials[idx]
                const isCenter = pos === 2
                return (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    aria-label={t.name}
                    className={`rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 focus:outline-none ${
                      isCenter
                        ? "w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-[140px] lg:h-[140px] border-2 border-[#2563EB] border-offset-2"
                        : "w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className="w-full h-full relative rounded-full">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover rounded-full"/>
                    </div>
                  </button>
                )
              })}
            </div>

            <Button aria-label="Next" onClick={next}
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#2563EB] flex items-center justify-center hover:bg-[#1D4ED8] transition-colors text-white shrink-0"
            >
              <ArrowRight size={16} className="sm:hidden" />
              <ArrowRight size={20} className="hidden sm:block" />
            </Button>
          </div>

          <div className="flex flex-col items-center text-center max-w-sm sm:max-w-lg md:max-w-xl mx-auto gap-2 md:gap-3">
            <p className="font-bold text-[#0A2540] text-base sm:text-lg">{current.name}</p>
            <p className="text-xs sm:text-sm text-[#6B7280]">{current.company}</p>
            <StarRating rating={current.rating} />
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed italic mt-1 min-h-[72px] sm:min-h-[80px]">
              "{current.quote}"
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}