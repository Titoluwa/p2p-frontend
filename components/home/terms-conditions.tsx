import Image from "next/image"

const sections = [
    {
        title: "Electric Vehicle (EV) Export Safety & Compliance",
        items: [
            {
                heading: "Battery Declaration Requirement",
                body: "Clients must provide accurate information regarding the battery type, state of charge (SOC), and condition of all electric or hybrid vehicles prior to export.",
                subItems: null,
            },
            {
                heading: "State of Charge (SOC) Compliance",
                body: "All EVs must comply with carrier-mandated SOC limits (typically between 20%–30%). Vehicles exceeding this threshold may be refused by the carrier or incur additional handling charges.",
                subItems: null,
            },
            {
                heading: "Battery Condition & Safety",
                body: "EVs with damaged, leaking, swollen, or compromised batteries will not be accepted for export. The client is responsible for ensuring all EVs meet safety standards prior to delivery at port.",
                subItems: null,
            },
            {
                heading: "Documentation Requirements",
                body: "Clients must supply all EV-related documentation, including:",
                subItems: [
                    "Battery safety declarations",
                    "Manufacturer battery specifications (if required)",
                    "Any hazardous goods declarations requested by the carrier",
                ],
            },
            {
                heading: "Liability for EV-Related Incidents",
                body: "PORT2PORT GLOBAL RORO SHIPPING LTD is not liable for delays, refusals, or additional charges arising from non-compliant EVs, incorrect battery declarations, or carrier-imposed EV restrictions.",
                subItems: null,
            },
        ],
    },
]

export function TermsAndConditions() {
    return (
        <div className="bg-[#F0F1F2] min-h-screen">

            <div className="relative mx-4 sm:mx-6 lg:mx-14 mt-6 rounded-2xl overflow-hidden h-52 sm:h-64 md:h-72 flex items-center justify-center">
                <Image src="/images/auth-page.jpg" alt="Shipping port" fill className="object-cover" priority/>
                <div className="absolute inset-0 bg-[#0A2540CC]" />

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                        Terms &amp; Conditions
                    </h1>
                    <p className="text-sm sm:text-base text-white/80">
                        Effective Date: 1st April, 2026
                    </p>
                </div>
            </div>

            <div className="relative z-10 mx-4 sm:mx-6 lg:mx-14 -mt-8 px-4 sm:px-6 lg:px-14">
                <div className="bg-[#E7E9EC] backdrop-blur-sm rounded-2xl shadow-sm px-6 sm:px-10 lg:px-14 py-10 mb-10">
                {sections.map((section) => (
                    <div key={section.title} className="font-sans mb-10 last:mb-0">
                    <h2 className="text-lg sm:text-xl font-bold text-[#0A2540] mb-6">
                        {section.title}
                    </h2>

                    <ol className="flex flex-col gap-5 list-none text-[#6B7280] font-sans font-[500]">
                        {section.items.map((item, i) => (
                        <li key={item.heading} className="flex gap-3">
                            <span className="text-sm shrink-0 mt-0.5 w-5 text-right">
                                {i + 1}.
                            </span>

                            <div className="flex-1">
                            <p className="text-sm sm:text-base leading-relaxed text-justify">
                                <span className="">{item.heading} </span>
                                {item.body}
                            </p>

                            {item.subItems && (
                                <ul className="mt-3 flex flex-col gap-2 pl-2">
                                    {item.subItems.map((sub) => (
                                        <li key={sub} className="flex items-start gap-2 text-sm ">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6B7280] shrink-0" />
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            </div>
                        </li>
                        ))}
                    </ol>
                    </div>
                ))}
                </div>
            </div>

        </div>
    )
}