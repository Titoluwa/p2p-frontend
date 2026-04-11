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
        <section className="relative text-white mx-4 sm:mx-6 lg:mx-14 my-6 rounded-2xl overflow-hidden min-h-[220px] md:min-h-[260px] flex items-end">
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />

            <div className="absolute inset-0 bg-[#0A2540CC]" />
            <div className="relative w-full px-6 sm:px-10 pb-10 pt-24 md:pt-28 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-16">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight md:max-w-xs shrink-0">
                    {title}
                </h1>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed md:max-w-sm lg:max-w-md">
                    {description}
                </p>
            </div>
        </section>
    )
}