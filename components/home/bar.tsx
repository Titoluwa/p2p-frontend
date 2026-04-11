import Image from "next/image"

const items = [
    "Trusted by dealers & exporters",
    "International shipping expertise",
    "Secure payments",
    "End-to-end tracking",
    "Trusted by dealers & exporters",
    "International shipping expertise",
    "Secure payments",
    "End-to-end tracking",
]

export function TrustBar() {
    return (
        <div className="bg-[#111827] py-5 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {items.map((item, i) => (
                <span key={i.toFixed()} className="flex items-center gap-8 mx-6 text-[#F8FAFC] text-sm font-medium shrink-0">
                    <Image src="/icons/four-star.svg" alt="star" className="mr-4" width={20} height={20} />
                    {item}
                </span>
                ))}
            </div>
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                    width: max-content;
                }
            `}</style>
        </div>
    )
}