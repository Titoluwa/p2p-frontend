import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// import { StarIcon } from "@/public/icons"

interface Service {
    category: string
    title: string
    description: string
    image: string
    imageAlt: string
    href?: string
    bgColor?: string
    mainBgColor?: string
}

function StarIcon() {
    return (
        <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 256 256" fill="currentColor">
                <path d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15" />
            </svg>
        </div>
    )
}

const services: Service[] = [
    {
        category: "Cars & SUV Shipping",
        title: "Vehicles, shipped with care",
        description:
        "We offer secure roll-on roll-off (RORO) shipping for personal, classic cars and commercial cars and SUVs from the United Kingdom to right-hand-drive destinations. Our process ensures proper vehicle handling at the port, reliable transit, and clear communication throughout the shipment. This service is ideal for individuals, dealers, and businesses exporting standard vehicles.",
        image: "/images/services/3.jpg",
        imageAlt: "Row of cars parked in a lot",
        href: "/quote",
        bgColor: "bg-[#E7E9EC]",
    },
    {
        category: "Trucks & Motorhomes",
        title: "Built for bigger vehicles",
        description:
        "We handle the international shipment of larger vehicles, including pickup trucks, vans, and motorhomes. Each shipment is carefully assessed to ensure it meets port and vessel requirements, with secure loading and coordinated export handling. This service is designed for customers shipping oversized or commercial vehicles.",
        image: "/images/services/2.jpg",
        imageAlt: "Truck at shipping port",
        href: "/quote",
        bgColor: "bg-[#E9EFFD]",
    },
    {
        category: "Heavy & Agricultural Equipment",
        title: "Moving machines across borders",
        description:
        "Our heavy equipment shipping service supports the export of tractors, construction machinery, and agricultural equipment. We manage specialised port handling, secure loading, and documentation support to ensure safe international transport. This service is suitable for industrial, agricultural, and commercial equipment shipments.",
        image: "/images/services/4.jpg",
        imageAlt: "Large agricultural machinery",
        href: "/quote",
        bgColor: "bg-[#F8FAFC]",
        mainBgColor: "bg-[#0A2540]"
    },
    {
        category: "Electronic Vehicles",
        title: "Built for next generation vehicles",
        description:
        "We ship fully electric and hybrid vehicles using handling procedures designed for battery-powered transport. Our team follow safety and export requirements to ensure EVs are prepared and loaded securely. This service supports individuals, dealers, and businesses exporting modern electric vehicles from the UK to international markets.",
        image: "/images/services/5.jpg",
        imageAlt: "Electric vehicle charging",
        href: "/quote",
        bgColor: "bg-[#E7E9EC]",
    },
    {
        category: "Non-Running & Salvage Vehicles",
        title: "Even when it doesn't drive",
        description:
        "We safely ship non-running, accident, and salvage vehicles that cannot be driven under their own power. Using controlled port handling and specialised loading procedures, we ensure these vehicles are transported securely from the UK to their destination. Customers are required to clearly disclose vehicle condition before shipment.",
        image: "/images/services/1.jpg",
        imageAlt: "Container cranes at port",
        href: "/quote",
        bgColor: "bg-[#DEE8FC]",
        mainBgColor: "bg-[#F0F1F2]"
    },
]

// image-left layout (odd indexes: 0, 2, 4)
// function ServiceRowImageLeft({ service }: Readonly<{ service: Service }>) {
//     return (
//         <div className={`relative flex flex-col md:flex-row md:items-stretch min-h-[420px] md:min-h-[380px] ${service.mainBgColor}`}>

//             {/* Image — overlaps out of card on desktop */}
//             <div className=" w-[48%] h-auto rounded-2xl overflow-hidden md:absolute md:left-0 md:top-8 md:bottom-8 md:rounded-2xl md:z-10">
//                 <Image src={service.image} alt={service.imageAlt} fill className="object-cover"/>
//             </div>

//             <div className={`${service.bgColor} rounded-2xl mt-4 md:mt-0 md:ml-[36%] md:pl-[16%] md:pr-10 md:py-10 px-6 py-8 flex-1 flex flex-col justify-center`}>
//                 <div className="flex items-center gap-2 mb-5 max-w-fit border border-[0.5px] border-[#6B7280] rounded-xl px-3 py-1.5 bg-transparent">
//                     <StarIcon />
//                     <span className="text-sm text-[#111827] font-medium whitespace-nowrap">{service.category}</span>
//                 </div>

//                 <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] leading-tight mb-4">
//                     {service.title}
//                 </h2>
//                 <p className="text-sm text-[#6B7280] leading-relaxed mb-8">
//                     {service.description}
//                 </p>

//                 <Link href={service.href ?? "/quote"}>
//                     <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-5 rounded-xl w-fit">
//                         Request a Quote
//                     </Button>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// // image-right layout (even indexes: 1, 3)
// function ServiceRowImageRight({ service }: Readonly<{ service: Service }>) {
//     return (
//         <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-14 relative flex flex-col md:flex-row md:items-stretch min-h-[420px] md:min-h-[380px] ${service.mainBgColor}`}>
//         {/* Image — overlaps out of card on desktop, right side */}
//             <div className="w-full h-56 rounded-2xl overflow-hidden md:absolute md:right-0 md:top-8 md:bottom-8 md:w-[48%] md:h-auto md:rounded-2xl md:z-10">
//                 <Image src={service.image} alt={service.imageAlt} fill className="object-cover"/>
//             </div>

//             <div className={`${service.bgColor} rounded-2xl mt-4 md:mt-0 md:mr-[36%] md:pr-[16%] md:pl-10 md:py-10 px-6 py-8 flex-1 flex flex-col justify-center`}>
//                 <div className="flex items-center gap-2 mb-5 max-w-fit border-[0.5px] border-[#6B7280] rounded-xl px-3 py-1.5 bg-transparent">
//                     <StarIcon />
//                     <span className="text-sm text-[#111827] font-medium whitespace-nowrap">{service.category}</span>
//                 </div>

//                 <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] leading-tight mb-4">
//                     {service.title}
//                 </h2>
//                 <p className="text-sm text-[#6B7280] leading-relaxed mb-8">
//                     {service.description}
//                 </p>

//                 <Link href={service.href ?? "/quote"}>
//                     <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-5 rounded-xl w-fit">
//                         Request a Quote
//                     </Button>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export function ServicesDetail() {
//     return (
//         <section className="py-12 md:py-16 bg-red-500">
//             <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14 flex flex-col gap-10 md:gap-16 bg-blue-500">
//                 {services.map((service, i) =>
//                     i % 2 === 0 ? (
//                         <ServiceRowImageLeft key={service.category} service={service} />
//                     ) : (
//                         <ServiceRowImageRight key={service.category} service={service} />
//                     )
//                 )}
//             </div>
//         </section>
//     )
// }

function ServiceCard({ service, imageRight = false }: Readonly<{ service: Service; imageRight?: boolean }>) {
    return (
        <div className="flex flex-col md:relative md:flex-row md:items-stretch md:min-h-[380px]">
    
        {/* ── Image ── */}
        {/* Mobile: normal flow, full-width, fixed height, rounded top */}
        {/* Desktop: absolute, overlapping the card, left or right */}
        <div className={`
            relative w-full h-56 rounded-2xl overflow-hidden shrink-0
            md:absolute md:h-auto md:w-[48%] md:top-8 md:bottom-8 md:rounded-2xl md:z-10
            ${imageRight ? "md:right-0" : "md:left-0"}
        `}>
            <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover"
            />
        </div>
    
        {/* ── Card (text content) ── */}
        {/* Mobile: normal flow below image, rounded bottom, full padding */}
        {/* Desktop: offset inward to create overlap effect */}
        <div className={`
            ${service.bgColor} rounded-2xl
            px-6 py-8
            md:py-10 md:flex-1 md:flex md:flex-col md:justify-center
            ${imageRight
            ? "md:mr-[36%] md:pr-[16%] md:pl-10"
            : "md:ml-[36%] md:pl-[16%] md:pr-10"
            }
        `}>
            {/* Badge */}
            <div className="flex items-center gap-2 mb-5 max-w-fit border border-[#E5E7EB] rounded-xl px-3 py-1.5 bg-white">
            <StarIcon />
            <span className="text-sm text-[#111827] font-medium whitespace-nowrap">{service.category}</span>
            </div>
    
            <h2 className={`text-2xl sm:text-3xl font-bold leading-tight mb-4 ${service.bgColor === "bg-[#0A2540]" ? "text-white" : "text-[#0A2540]"}`}>
            {service.title}
            </h2>
            <p className={`text-sm leading-relaxed mb-8 ${service.bgColor === "bg-[#0A2540]" ? "text-gray-300" : "text-[#6B7280]"}`}>
            {service.description}
            </p>
    
            <Link href={service.href ?? "/quote"}>
            <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-5 rounded-xl w-fit">
                Request a Quote
            </Button>
            </Link>
        </div>
        </div>
    )
}
 
export function ServicesDetail() {
    return (
        <section className="py-12 md:py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 flex flex-col gap-10 md:gap-16">
            {services.map((service, i) => (
            <ServiceCard key={service.category} service={service} imageRight={i % 2 !== 0} />
            ))}
        </div>
        </section>
    )
}
 