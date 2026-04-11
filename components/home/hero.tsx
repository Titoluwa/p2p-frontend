import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="bg-[#F8FAFC] py-16 md:py-24 overflow-hidden">

            <div className="mx-auto max-w-fit flex items-center justify-center px-4 py-2 gap-3 mb-6 border border-[#E5E7EB] rounded-2xl bg-white">
                <div className="text-[#F8FAFC] bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center">
                    <Image src="/icons/four-star.svg" alt="Best Vehicle Freight Shipping" width={20} height={20} className="text-white"/>
                </div>
                <span className="text-base md:text-lg text-[#111827] font-medium whitespace-nowrap">
                    Best Vehicle Freight Shipping
                </span>
            </div>

            {/* Heading */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center">
                <h1 className="font-sans max-w-3xl text-4xl md:text-5xl font-bold text-[#0A2540] text-center leading-10 tracking-wide mb-6">
                    RORO Shipping from{" "}
                    <span className="relative inline-block">
                        Port 2 Port,
                        {/* SVG underline positioned below the text */}
                        <span className="absolute left-0 -bottom-5 sm:-bottom-7 w-full flex justify-start pointer-events-none" aria-hidden="true">
                            <img src="/images/underline.svg" alt="" />
                        </span>
                    </span>
                    <br />
                    Made Simple
                </h1>

                <p className="text-base md:text-xl text-[#6B7280] mb-8 text-center mx-auto font-medium max-w-xl">
                    Ship cars, trucks, trailers and wheeled equipment
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    <Link href="/services">
                        <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl px-6"> 
                            Request a Quote
                        </Button>
                    </Link>
                    <Link href="/how-it-works">
                        <Button variant="outline" size="lg" className="border-[#2563EB] text-[#2563EB] bg-transparent hover:bg-[#2563EB]/10 rounded-xl px-6" >
                            How it Works
                        </Button>
                    </Link>
                </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="rounded-2xl overflow-hidden w-full">
                    <Image src="/images/home-1.png" alt="Shipping vessel 1" width={1200} height={600} className="object-cover w-full h-auto rounded-2xl" priority/>
                </div>
            </div>
        </section>
    )
}