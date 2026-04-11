import Image from "next/image"

const features = [
  { icon: "/icons/dollar-circle.svg", label: "Cost-effective" },
  { icon: "/icons/car.svg", label: "Ideal for vehicles & machinery" },
  { icon: "/icons/timer.svg", label: "Faster port handling" },
]

export function AboutRoro() {
    return (
        <section className="py-12 md:py-16 bg-[#F0F1F2]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">
            <div className="flex flex-col md:flex-row items-center md:gap-12 lg:gap-20">

            {/* Left: Text */}
            <div className="flex-1 mb-8 md:mb-0">
                {/* Badge */}
                <div className="max-w-fit flex items-center px-4 py-2 gap-3 mb-5 border border-[1.5px] border-[#E5E7EB] rounded-2xl">
                    <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center">
                        <Image src="/icons/four-star.svg" alt="star" width={20} height={20} />
                    </div>
                    <span className="text-base text-[#111827] font-medium whitespace-nowrap">
                        About RORO Shipping
                    </span>
                </div>

                <h2 className="font-sans text-2xl sm:text-3xl md:text-[38px] font-[500] text-[#0A2540] mb-4 leading-tight">
                    What is RORO Shipping?
                </h2>
                    <p className="text-[18px] sm:text-[18px] text-[#6B7280] mb-6 leading-relaxed lg:w-5/6 w-full">
                    Roll-On-Roll-Off (RORO) shipping allows vehicles to be driven directly onto vessels, 
                    making it one of the most cost-effective and secure shipping methods
                </p>

                <ul className="flex flex-col gap-3">
                {features.map((f) => (
                    <li key={f.label} className="flex items-center gap-5">
                        <Image src={f.icon} alt="star" width={24} height={24} />
                        <Image src="/icons/pointing.svg" alt="pointing" width={24} height={24} />
                        <span className="font-[400] text-[16px] text-[#3A3B3E]">{f.label}</span>
                    </li>
                ))}
                </ul>
            </div>

            {/* Right: Image */}
            <div className="flex flex-1 items-center justify-center">
                <div className="rounded-2xl overflow-hidden">
                    <Image src="/images/about-roro.jpg" alt="RORO shipping truck at port" width={694} height={494} className="w-full h-full object-cover" priority/>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}