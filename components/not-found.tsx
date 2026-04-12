import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search, Ship } from "lucide-react"

const quickLinks = [
    { label: "Our Services", href: "/services" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "Shipping Routes", href: "/routes" },
    { label: "Track Shipment", href: "/track" },
    { label: "Get a Quote", href: "/quote" },
    { label: "Contact Us", href: "/contact" },
]

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F0F4F8] flex flex-col">

            <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-14 py-10 relative overflow-hidden">

                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] sm:text-[28rem] font-black text-[#0A2540]/[0.03] select-none leading-none whitespace-nowrap">
                        404
                    </div>
                    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#2563EB]/5" />
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#F2A900]/8" />
                </div>

                <div className="relative z-10 w-full max-w-2xl">

                    {/* Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] rounded-xl bg-transparent shadow-sm">
                            <div className="text-white bg-[#F2A900] p-1.5 rounded-full flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 256 256" fill="currentColor">
                                <path d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15" />
                                </svg>
                            </div>
                            <span className="text-sm text-[#111827] font-medium">Page Not Found</span>
                        </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-[#0A2540] flex items-center justify-center shadow-xl">
                                <Ship size={40} className="text-white" />
                            </div>
                            {/* Pulse ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-[#2563EB]/30 animate-ping" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-6">
                        <h1 className="text-6xl sm:text-7xl font-black text-[#0A2540] leading-none mb-4 tracking-tight">
                            404
                        </h1>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540] mb-3">
                            This route doesn't exist
                        </h2>
                        <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-sm mx-auto">
                            Looks like this page has sailed off course. The page you're looking for may have been moved, renamed, or doesn't exist.
                        </p>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
                        <Link href="/">
                            <Button className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-6 rounded-xl text-base gap-2">
                                <Home size={16} /> Back to Home
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="w-full sm:w-auto border-[#2563EB] text-[#2563EB] bg-transparent hover:bg-[#2563EB]/10 font-semibold px-8 py-6 rounded-xl text-base gap-2"> 
                                <Search size={16} /> Get Help
                            </Button>
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 h-px bg-[#E5E7EB]" />
                            <span className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wider">
                                Or explore
                            </span>
                        <div className="flex-1 h-px bg-[#E5E7EB]" />
                    </div>

                    {/* Quick links grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {quickLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="flex items-center justify-between px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm font-semibold text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-sm transition-all duration-200 group" >
                                <span>{link.label}</span>
                                <ArrowLeft size={14} className="rotate-180 text-[#9CA3AF] group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all duration-200" />
                            </Link>
                        ))}
                    </div>

                </div>
            </main>

        </div>
    )
}