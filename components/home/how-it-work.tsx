import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const steps = [
  { label: "Request a Quote", href: "/quote" },
  { label: "Get Your Price", href: "/how-it-works" },
  { label: "Pay & Upload Documents", href: "/how-it-works" },
  { label: "Track Your Shipment", href: "/track" },
]

export function HowItWork() {
    return (
        <section className="py-12 md:py-16 bg-[#F8FAFC]">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">

                {/* Badge */}
                <div className="max-w-fit flex items-center px-4 py-2 gap-3 mb-6 border border-[#E5E7EB] rounded-2xl bg-white">
                    <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center">
                        <Image src="/icons/four-star.svg" alt="star" width={20} height={20} />
                    </div>
                    <span className="text-base text-[#111827] font-medium whitespace-nowrap">
                        How it Works
                    </span>
                </div>

                {/* Heading row */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
                    <h2 className="text-[28px] sm:text-[34px] md:text-[40px] text-[#0A2540] font-[500] leading-[1.5] tracking-[0.5] max-w-xl">
                        Trusted by Businesses Who Rely on Speed and Reliability
                    </h2>
                    <p className="text-sm sm:text-base text-[#6B7280] font-medium md:text-justify md:max-w-[320px] lg:max-w-[380px] leading-[1.5] tracking-[0.8]">
                        Hear how our logistics solutions help companies deliver better,
                        faster, and smarter everyday
                    </p>
                </div>

                {/* Content row: image + steps */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">

                    {/* Image */}
                    <div className="w-full md:w-2/4 lg:w-2/4 shrink-0">
                        <div className="rounded-2xl overflow-hidden">
                            <Image src="/images/how-it-works.jpg" alt="Shipping port with containers" width={600} height={440} className="w-full h-auto object-cover" priority />
                        </div>
                    </div>

                    {/* Steps list */}
                    <div className="flex flex-col gap-3 flex-1 ">
                        {steps.map((step) => (
                            <Link key={step.href + step.label} href={step.href} className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 bg-transparent border border-[#E5E7EB] rounded-xl hover:border-[#2563EB] hover:shadow-sm transition-all duration-200 group">
                                <span className="text-sm sm:text-base font-semibold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                                    {step.label}
                                </span>
                                <ArrowRight size={18} className="text-[#6B7280] group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}