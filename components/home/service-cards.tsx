import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CarIcon, TruckIcon, AgricIcon, ElectricIcon, SalvageIcon, StarIcon } from "@/public/icons"

const services = [
    {
      id: 1,
      icon: <CarIcon /> ,
      title: "Cars & SUVs",
      description: "We ship personal and commercial cars and SUVs using reliable RORO shipping.",
      href: "/services/cars",
    },
    {
      id: 2,
      icon: <TruckIcon />,
      title: "Trucks & Motorhomes",
      description: "From pickup trucks to motorhomes, we handle oversized and commercial vehicles.",
      href: "/services/trucks",
    },
    {
      id: 3,
      icon: <AgricIcon/>,
      title: "Heavy & Agricultural Equipments",
      description: "We transport tractors, construction, and agricultural machinery.",
      href: "/services/heavy",
    },
    {
      id: 4,
      icon: <ElectricIcon />,
      title: "Electric Vehicles",
      description: "We provide specialised shipping for electric vehicles, ensuring safe handling and compliance.",
      href: "/services/electric",
    },
    {
      id: 5,
      icon: <SalvageIcon />,
      title: "Non-Running & Salvage Vehicles",
      description: "Non-running, accident, or salvage vehicles are safely shipped using controlled port handling.",
      href: "/services/salvage",
    },
]
export function Services() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          <div className="sm:col-span-2 lg:col-span-2 flex flex-col lg:justify-center
            items-center lg:items-start text-center lg:text-left mb-4 lg:mb-0">
            
            <div className="flex items-center px-4 py-2 gap-3 mb-5 border border-[#E5E7EB] rounded-2xl bg-white">
              <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center">
                <StarIcon />
              </div>
              <span className="text-sm text-[#111827] font-medium whitespace-nowrap">Our Services</span>
            </div>

            <h2 className="font-sans text-4xl/10 sm:text-4xl/10 md:text-[38px]/10 font-medium text-[#0A2540] mb-4 tracking-tight max-w-md md:max-w-lg lg:max-xl">
              Reliable, End-to-End Logistics Solutions
            </h2>

            <p className="text-base text-[#6B7280] leading-relaxed max-w-sm lg:max-w-md">
              From water to warehouse, we move your goods with precision and care.
            </p>
          </div>

          {services.slice(0, 2).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block" />
          {services.slice(2).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

      </div>
    </section>
  )
}
 
function ServiceCard({ service }: Readonly<{ service: typeof services[0] }>) {
  return (
    <div className="group rounded-2xl p-6 flex flex-col gap-3 border border-transparent transition-all duration-200
      bg-[#F0F1F2] text-[#111827]
      hover:shadow-md hover:bg-[#2563EB] hover:text-white cursor-pointer"
    >
      <div className="flex flex-row items-center gap-3">
        <div className="w-[70px] h-[70px] flex items-center justify-center shrink-0 text-[#111827] group-hover:text-white transition-colors duration-200">
        {service.icon}
        </div>
        <h3 className="font-light text-2xl leading-snug">
          {service.title}
        </h3>
      </div>
 
      <p className="mt-5 md:mt-10 lg:mt-20 text-sm leading-relaxed flex-1 text-[#6B7280] group-hover:text-white/90 transition-colors duration-200">
        {service.description}
      </p>
 
      <Link href={service.href} className="flex items-center gap-1.5 text-sm font-semibold mt-1 w-fit text-[#2563EB] group-hover:text-white transition-colors duration-200">
        Learn more <ArrowRight size={14} />
      </Link>
    </div>
  )
}