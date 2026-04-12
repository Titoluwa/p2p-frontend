import Image from "next/image"
import { MapPin, Clock, Clock3, Anchor, Globe } from "lucide-react"


const routes = [
    { destination: "South America", frequency: "Weekly sailings", transit: "5-6 weeks" },
    { destination: "North America", frequency: "Bi-weekly sailings", transit: "5-6 weeks" },
    { destination: "Africa", frequency: "Bi-weekly sailings", transit: "5-6 weeks" },
    { destination: "Asia", frequency: "Weekly sailings", transit: "5-6 weeks" },
    { destination: "Europe", frequency: "Monthly sailings", transit: "5-6 weeks" },
    { destination: "Oceania", frequency: "Monthly sailings", transit: "5-6 weeks" },
]

const notes = [
    {
        icon: <Clock3 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />,
        text: "Transit times are approximate and may vary based on vessel schedules, port conditions, and weather",
    },
    {
        icon: <Anchor size={16} className="text-[#2563EB] shrink-0 mt-0.5" />,
        text: "RORO vessel availability depends on sailing schedules and booking capacity",
    },
    {
        icon: <Globe size={16} className="text-[#2563EB] shrink-0 mt-0.5" />,
        text: "Additional destinations may be available contact us for specific route enquiries",
    },
]


function Badge({ label }: Readonly<{ label: string }>) {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 border-[0.5px] border-[#6B7280] rounded-xl bg-transparent">
            <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 256 256" fill="currentColor">
                <path d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15" />
                </svg>
            </div>
            <span className="font-sans text-sm text-[#111827] font-medium whitespace-nowrap">{label}</span>
        </div>
    )
}


function RouteCard({ destination, frequency, transit }: Readonly<(typeof routes)[0]>) {
    return (
        <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-6 bg-[#F0F1F2] border border-[#B3BBC4] rounded-2xl hover:shadow-sm transition-shadow">
            {/* Left: icon + route info */}
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full border-none flex items-center justify-center shrink-0">
                    <MapPin size={26} className="text-[#2563EB]" />
                </div>
                <div className="min-w-0">
                <p className="text-sm sm:text-base font-[500] text-[#111827] truncate">
                    UK <span className="font-normal mx-1">→</span> {destination}
                </p>
                <p className="text-xs sm:text-sm text-[#6B7280]">{frequency}</p>
                </div>
            </div>

            {/* Right: transit time */}
            <div className="flex items-center gap-1.5 shrink-0 text-[#6B7280]">
                <Clock size={14} className="shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">{transit}</span>
            </div>
        </div>
    )
}


export function ShippingRoutes() {
    return (
        <section className="py-12 md:py-16 bg-[#F8FAFC]">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">

                {/* ── Header — mobile: centered stacked; desktop: badge+title left, subtitle right ── */}
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:justify-between md:text-left gap-4 mb-10">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <Badge label="Different Routes" />
                        <h2 className="font-sans text-3xl sm:text-4xl font-medium text-[#0A2540]">Shipping Routes</h2>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#6B7280] max-w-sm leading-relaxed md:text-left mt-0 md:mt-2">
                        Our most frequently used routes with regular vessel schedules
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

                {/* LEFT COLUMN: image + important notes card — right overlap on desktop */}
                <div className="relative w-full lg:w-[45%] shrink-0">

                    <div className="relative w-full lg:w-[85%] h-56 sm:h-72 lg:h-[420px] rounded-2xl overflow-hidden">
                        <Image src="/images/how-it-works.jpg" alt="Shipping port with container vessel" fill className="object-cover" priority/>
                    </div>

                    <div className=" mt-4 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[48%]">
                        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-lg px-6 py-6">
                        <h3 className="text-base font-[500] uppercase tracking-wider text-[#0A2540] mb-5 text-center">
                            Important Notes
                        </h3>
                        <ul className="flex flex-col gap-4">
                            {notes.map((note, i) => (
                                <li key={i.toFixed()} className="flex items-start gap-3">
                                    {note.icon}
                                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">{note.text}</p>
                                </li>
                            ))}
                        </ul>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: route list */}
                <div className="w-full lg:flex-1 flex flex-col gap-5">
                    {routes.map((route) => (
                        <RouteCard key={route.destination} {...route} />
                    ))}
                </div>

                </div>
            </div>
        </section>
    )
}