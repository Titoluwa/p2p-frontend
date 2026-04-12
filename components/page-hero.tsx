import Image from "next/image"

interface PageHeroProps {
    title: string
    description: string
    imageSrc?: string
    imageAlt?: string
}

export function PageHero({
    title,
    description,
    imageSrc = "/images/auth-page.jpg",
    imageAlt = "Page background",
}: Readonly<PageHeroProps>) {
    return (
        <section className="relative bg-[#F8FAFC] text-white mx-4 sm:mx-6 lg:mx-14 my-6 rounded-2xl overflow-hidden min-h-[220px] md:min-h-[260px] flex items-end">
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover object-center" priority />

            <div className="absolute inset-0 bg-[#0A2540CC]" />
            <div className="relative w-full px-6 sm:px-10 pb-10 pt-40 md:pt-48 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-16">
                <h1 className="font-sans text-[28px] sm:text-3xl md:text-[40px] font-[400] text-left tracking-wide md:max-w-md lg:max-w-lg shrink-0" style={{ lineHeight: "100%" }}>
                    {title}
                </h1>
                <p className="font-sans text-[16px] sm:text-[16px] text-[#F8FAFC] font-[300] tracking-wide md:max-w-sm lg:max-w-md" style={{ lineHeight: "120%" }}>
                    {description}
                </p>
            </div>
        </section>
    )
}