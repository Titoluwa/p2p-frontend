import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function GetQuote() {
  return (
    <section className="bg-[#F8FAFC] py-10 md:py-14 overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">
        <div className="relative bg-[#F2A900] rounded-3xl min-h-[340px] md:min-h-[300px]">
          <div className="flex flex-col lg:flex-row lg:items-stretch h-full">

            <div className="flex-1 px-8 sm:px-10 pt-10 pb-6 xl:ml-10 ml-0 md:py-12 z-10 relative max-w-xl">
              <div className="max-w-fit flex items-center px-3 py-1.5 gap-2 mb-6 border border-white rounded-xl">
                <div className="bg-white  p-1 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256" fill="#F2A900">
                    <path d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15" />
                  </svg>
                </div> 
                <span className="text-xs text-[#0A2540] font-semibold whitespace-nowrap">Get a Quote</span>
              </div>

              <h2 className="font-sans text-3xl sm:text-4xl font-medium text-[#0A2540] leading-tight mb-4">
                Ready to Ship Your Vehicle?
              </h2>
              <p className="text-sm sm:text-base text-[#111827] mb-8 leading-relaxed">
                {/* Get a personalized logistics solution tailored to your business
                needs. Fast, transparent, and built to scale. */}
                From water to warehouse, we move your goods with precision and care. 
                Get a personalized logistics solution tailored to your business needs. 
                Fast, transparent, and built to scale. 
              </p>

              <Link href="/quote">
                <Button className="bg-white text-[#0A2540] hover:bg-[#f0f0f0] font-semibold px-8 py-6 rounded-lg shadow-sm text-base">
                  Request a Quote
                </Button>
              </Link>
            </div>

            <div className="relative md:absolute
              xl:w-[848px] xl:h-[470px] xl:right-[-220px] xl:bottom-[-105px]
              lg:w-[576px] lg:h-[411px] lg:right-[-122px] lg:bottom-[-115px]
              md:w-[336px] md:h-[311px] md:right-[-62px] md:bottom-[-60px]
              sm:w-[536px] sm:h-[411px] sm:right-[-272px] sm:bottom-[-130px]
              w-[436px] h-[311px] right-[-132px] bottom-[-90px]
            ">
              <Image src="/images/truck.png" alt="Shipping truck" fill className="object-contain size-2xl" priority/>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}