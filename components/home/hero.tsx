import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
              
      <section className="bg-[#F8FAFC] py-16 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-[381px] flex items-center justify-center p-2 gap-4 mb-6 border border-[#E5E7EB] rounded-2xl">
            <div className="text-[#F8FAFC] bg-[#F2A900] p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256"><title>Star-four-fill SVG Icon</title><path fill="currentColor" d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"/></svg>
            </div>
            <span className="text-xl text-[#111827] font-[500]">Best Vehicle Freight Shipping</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid items-center">
                <div className="md:col-span-2 justify-center">
                    <h1 className="font-sans text-4xl md:text-5xl font-[700] text-[#0A2540] text-center text-balance leading-[70px] tracking-wide mb-8">
                        Vehicle & RORO Shipping from <br />
                        {/* <span className="underline underline-offset-8 decoration-[#2563EB] decoration-4 decoration-wavy">  */}
                            Port 2 Port, 
                        {/* </span> */}
                        {" "} Made Simple
                    </h1>
                    <p className="text-base md:text-xl text-[#6B7280] mb-8 text-center mx-auto font-[500] max-w-xl">
                        Ship cars, trucks, heavy equipment and more with full tracking, secure payments, and expert handling.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link href="/services">
                            <Button size={"lg"} className="border-primary bg-[#2563EB] hover:border-[#2563EB]">
                                Request a Quote
                            </Button>
                        </Link>
                        <Link href="/how-it-works">
                            <Button variant="outline" size={"lg"} className="hover:bg-primary/20 hover:text-primary border-primary text-[#2563EB] bg-transparent">
                                How it Works
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="rounded-2xl">
            <Image src="/images/home-img-1.jpg" alt="Shipping vessel 1" width={100} height={100} className="object-contain h-4/5 w-4/5 rounded-2xl mt-20 mx-auto"/> 
        </div>
      </section>
    )
}   