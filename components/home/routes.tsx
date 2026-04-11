import { StarIcon } from "@/public/icons"
import Image from "next/image"

export function Routes() {
  return (
    <section className="py-12 md:py-16 bg-[#0A2540]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">

        <div className="flex flex-col items-center mb-6">
          <div className="max-w-fit flex items-center px-4 py-2 gap-3 mb-5 border border-[#6B7280] rounded-2xl">
            <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center">
              <StarIcon/>
            </div>
            <span className="text-sm text-[#F8FAFC] font-medium whitespace-nowrap">Our Routes</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-medium mb-4 tracking-wide text-[#F8FAFC] text-center">
            From UK to other countries.
          </h2>
        </div>

        <div className="relative w-full mt-6">
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden">
            <Image src="/images/world-map.svg" alt="World shipping routes map" fill className="object-contain"/>
          </div>
        </div>

      </div>
    </section>
  )
}