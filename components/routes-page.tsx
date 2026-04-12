import { MapPin, Globe } from "lucide-react"


const ports = [
    { name: "Southampton", description: "Primary UK departure port" },
    { name: "London Gateway", description: "East coast shipping hub" },
    { name: "Liverpool", description: "Northwest regional port" },
]

const destinations = [
    {
        region: "South America",
        countries: [
            { name: "Brazil", transit: "3-4 weeks" },
            { name: "Argentina", transit: "3-4 weeks" },
            { name: "Colombia", transit: "4-5 weeks" },
            { name: "Ecuador", transit: "4-5 weeks" },
        ],
    },
    {
        region: "North America",
        countries: [
            { name: "USA", transit: "4-5 weeks" },
            { name: "Canada", transit: "4-5 weeks" },
            { name: "Mexico", transit: "5-6 weeks" },
            { name: "Costa Rica", transit: "5-6 weeks" },
        ],
    },
    {
        region: "Africa",
        countries: [
            { name: "Nigeria", transit: "4-5 weeks" },
            { name: "Ghana", transit: "4-5 weeks" },
            { name: "South Africa", transit: "5-6 weeks" },
            { name: "Kenya", transit: "5-6 weeks" },
        ],
    },
    {
        region: "Europe",
        countries: [
            { name: "France", transit: "3-4 weeks" },
            { name: "Italy", transit: "3-4 weeks" },
            { name: "UK", transit: "3-4 weeks" },
            { name: "Greece", transit: "3-4 weeks" },
        ],
    },
    {
        region: "Oceania",
        countries: [
            { name: "New Zealand", transit: "5-6 weeks" },
            { name: "Australia", transit: "6-7 weeks" },
            { name: "Fiji", transit: "6-7 weeks" },
            { name: "Samoa", transit: "4-5 weeks" },
        ],
    },
    {
        region: "Asia",
        countries: [
            { name: "China", transit: "5-6 weeks" },
            { name: "India", transit: "6-7 weeks" },
            { name: "South Korea", transit: "6-7 weeks" },
            { name: "Japan", transit: "4-5 weeks" },
        ],
    },
]


function LightBadge({ label }: Readonly<{ label: string }>) {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 border-[0.5px] border-[#6B7280] rounded-xl bg-transparent">
            <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 256 256" fill="currentColor">
                <path d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15" />
                </svg>
            </div>
            <span className="text-sm text-[#111827] font-medium whitespace-nowrap">{label}</span>
        </div>
    )
}

function DarkBadge({ label }: Readonly<{ label: string }>) {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 border-[0.5px] border-[#F8FAFC] rounded-xl bg-transparent">
            <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15" />
                </svg>
            </div>    
            <span className="text-sm text-white font-medium whitespace-nowrap">{label}</span>
        </div>
    )
}


export function DeparturePorts() {
    return (
        <section className="py-16 md:py-20 bg-[#F0F1F2]">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-4 mb-10">
                    <LightBadge label="Origin Ports (UK)" />
                    <h2 className="font-sans text-3xl sm:text-4xl font-[500] text-[#0A2540]">
                        UK Departure Port
                    </h2>
                    <p className="font-sans text-sm sm:text-base font-[500] text-[#6B7280] max-w-md leading-relaxed">
                        We operate through major UK ports to ensure reliable scheduling and efficient vessel access.
                    </p>
                </div>

                {/* Port cards — 1 col mobile, 3 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {ports.map((port) => (
                        <div key={port.name} className="bg-transparent rounded-xl border-[1.5px] border-[#6B7280] px-6 py-10 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow" >
                            {/* Icon circle */}
                            <div className="w-12 h-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center mb-3">
                                <MapPin size={20} />
                            </div>
                            <h3 className="text-base font-bold text-[#0A2540]">{port.name}</h3>
                            <p className="text-sm text-[#6B7280]">{port.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export function DestinationMarkets() {
    return (
        <section className="py-16 md:py-24 bg-[#0A2540]">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-4 mb-10">
                    <DarkBadge label="Worldwide Market" />
                    <h2 className="font-sans text-3xl sm:text-4xl font-[500] text-[#F8FAFC]">
                        Our Destination Markets
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-[#F8FAFC] max-w-md leading-relaxed">
                        We ship vehicles to selected international markets where UK-spec vehicles are widely accepted and used.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {destinations.map((dest) => (
                        <div key={dest.region} className="bg-white rounded-xl px-8 py-10 hover:bg-white/90 transition-colors text-[#111827]" >
                            {/* Region heading */}
                            <div className="flex items-center gap-2 mb-5">
                                <Globe size={18} className="text-[#2563EB] shrink-0" />
                                <h3 className="text-base font-bold">{dest.region}</h3>
                            </div>

                            {/* Country rows */}
                            <div className="flex flex-col gap-4">
                                {dest.countries.map((country) => (
                                <div key={country.name} className="flex items-center justify-between">
                                    <span className="text-sm font-[500]">{country.name}</span>
                                    <span className="text-sm text-[#6B7280]">{country.transit}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}