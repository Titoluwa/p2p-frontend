import Image from "next/image"
import { ArrowUpRight, ClipboardList, FileText, Ship, CircleAlert, CircleCheck } from "lucide-react"


const steps = [
    {
        icon: <ArrowUpRight size={20} />,
        title: "Request a Quote",
        description:
        "Start by submitting a quote request with your vehicle and destination details. Our team reviews the information and prepares a tailored shipping quote based on your shipment type and route.",
    },
    {
        icon: <ClipboardList size={20} />,
        title: "Review & Confirm",
        description:
        "Once your quote is ready, we'll contact you with pricing and shipping details. After reviewing and confirming, you can proceed with payment and begin the booking process.",
    },
    {
        icon: <FileText size={20} />,
        title: "Prepare Documents",
        description:
        "After confirmation, you'll be guided on the documents required for export. These may include proof of ownership and vehicle registration, depending on your shipment.",
    },
    {
        icon: <Ship size={20} />,
        title: "Ship & Track",
        description:
        "Your vehicle is received at the port, securely loaded onto the vessel, and shipped to its destination. You'll receive a tracking number to monitor shipment progress.",
    },
]

const documents = [
    { title: "V5C Registration Document", subtitle: null, status: "required" },
    { title: "Photo ID (Passport or Driving License)", subtitle: null, status: "required" },
    { title: "Invoice or purchase receipt", subtitle: null, status: "required" },
    { title: "Export Declaration", subtitle: "We can assist", status: "required" },
    { title: "Insurance Certificate", subtitle: "Included in service", status: "optional" },
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

export function ProcessSteps() {
    return (
        <section className="py-12 md:py-16 bg-[#F0F1F2]">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-14">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10 gap-4">
                    <Badge label="How Port2Port Works" />
                    <h2 className="font-sans text-3xl sm:text-4xl font-medium text-[#0A2540]">
                        Lorem ipsum dolor sit amet
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-[#6B7280] max-w-lg leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Phasellus maecenas vestibulum quis scelerisque fermentum malesuada neque lacus.
                    </p>
                </div>

                {/* Step cards — 2 col on mobile, 4 col on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {steps.map((step) => (
                    <div key={step.title} className="bg-white rounded-xl border-[1.5px] border-[#E5E7EB] p-5 sm:p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow min-h-[280px]">
                        {/* Icon circle */}
                        <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 mb-4">
                            {step.icon}
                        </div>
                        <h3 className="font-bold text-[#0A2540] text-lg sm:text-lg leading-snug pb-1 pt-8">
                            {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                ))}
                </div>

            </div>
        </section>
    )
}

export function DocumentsSection() {
    return (
        <section className="py-12 md:py-16 bg-[#E7E9EC]">
            <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-24 ">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10 gap-4">
                    <Badge label="Documentation" />
                    <h2 className="font-sans text-3xl sm:text-4xl font-[500] text-[#0A2540]">
                        Required Shipping Documents
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-[#6B7280] max-w-lg leading-relaxed">
                        To ensure a smooth export process, the following documents are typically required.
                    </p>
                </div>

                {/* Content: stacked on mobile, side-by-side on desktop */}
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                    {/* Stacked images — left column on desktop */}
                    <div className="relative w-full lg:w-[42%] shrink-0 h-64 sm:h-80 lg:h-[400px]">
                        {/* Back image */}
                        <div className="absolute top-0 left-0 w-[62%] h-[75%] rounded-2xl overflow-hidden shadow-md">
                            <Image src="/images/services/3.jpg" alt="Cars at port" fill className="object-cover"/>
                        </div>
                        {/* Front image — offset bottom-right */}
                        <div className="absolute bottom-0 right-0 w-[65%] h-[75%] rounded-tl-2xl overflow-hidden border-l-[16px] border-t-[16px] border-[#E7E9EC]">
                            <Image src="/images/services/3.jpg" alt="Cars at port 2" fill className="object-cover rounded-none p"/>
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 bg-[#F8FAFC] rounded-lg shadow-sm overflow-hidden px-10 py-4 pb-10 lg:mx-20 md:mx-10 mx-0 border-[0.5px] border-[#6B7280]">
                        {documents.map((doc, i) => (
                            <div key={doc.title} className={`flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 border-b border-[#B3BBC4]`}>
                                
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    {doc.status === "optional" ? (
                                        <CircleCheck size={24} className="text-[#6B7280] shrink-0 mt-0.5" />
                                    ) : (
                                        <CircleAlert size={24} className="text-[#2563EB] shrink-0 mt-0.5" />
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-[#0A2540] leading-snug">
                                            {doc.title}
                                        </p>
                                        {doc.subtitle && (
                                            <p className="text-xs text-[#6B7280] mt-0.5">{doc.subtitle}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Status badge */}
                                <span className={` font-sans
                                    text-xs font-medium px-4 py-2 rounded-md shrink-0
                                    ${doc.status === "optional"
                                        ? "bg-[#E9EAEC] text-[#6B7280]"
                                        : "bg-[#E9EFFD] text-[#2563EB]"}
                                    `}>
                                    {doc.status === "optional" ? "Optional" : "Required"}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}