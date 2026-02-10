import LogoLoop from '@/components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
    { src: "/images/logos/image-1.png", alt: "Company 1", href: "https://company1.com" },
    { src: "/images/logos/image-2.png", alt: "Company 2", href: "https://company2.com" },
    { src: "/images/logos/image-3.png", alt: "Company 3", href: "https://company3.com" },
    { src: "/images/logos/image-4.png", alt: "Company 4", href: "https://company4.com" },
    { src: "/images/logos/image.png", alt: "Company 5", href: "https://company5.com" },
];

export function Partners() {
    return (
        <section className="bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto py-16 md:py-24 overflow" style={{ position: 'relative', overflow: 'hidden'}}>
            <h2 className="text-center text-[#0A2540]  font-[700] mb-8 text-[32px]">Our Beloved Partners</h2>
            <LogoLoop
                logos={imageLogos}
                speed={60}
                direction="left"
                logoHeight={40}
                gap={80}
                hoverSpeed={20}
                scaleOnHover
                fadeOut
                fadeOutColor="#F8FAFC"
                ariaLabel="Technology partners"
            />
        </div>        
        </section>
    );
}