'use client'

import Image from "next/image"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function ContactForm() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        // handle submit
    }

    return (
        <section className="py-12 md:py-16 bg-[#F0F1F2] min-h-screen">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-14">

                    <div className="relative w-full lg:w-[42%] shrink-0 h-64 sm:h-80 lg:h-[400px]">
                        {/* Back image */}
                        <div className="absolute top-0 left-0 w-[62%] h-[75%] rounded-2xl overflow-hidden shadow-md">
                            <Image src="/images/services/3.jpg" alt="Cars at port" fill className="object-cover"/>
                        </div>
                        {/* Front image — offset bottom-right */}
                        <div className="absolute bottom-0 right-0 w-[65%] h-[75%] rounded-tl-2xl overflow-hidden border-l-[16px] border-t-[16px] border-[#F0F1F2]">
                            <Image src="/images/services/3.jpg" alt="Cars at port 2" fill className="object-cover rounded-none p"/>
                        </div>
                    </div>

                    <div className="w-full lg:w-[48%] bg-white rounded-md shadow-sm p-6 sm:p-8 shrink-0">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-2 md:p-12">

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="fullName" className="font-sans text-sm font-[500] text-[#111827]">
                                Full name
                            </label>
                            <Input id="fullName" name="fullName" type="text" placeholder="Gloria Hector" value={form.fullName} onChange={handleChange}
                                className="rounded-lg border-[0.5px] border-[#6B7280] bg-transparent placeholder:text-[#B3BBC4] focus-visible:ring-[#2563EB] h-12"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="font-sans text-sm font-[500] text-[#111827]">
                                Email Address
                            </label>
                            <div className="relative">
                                <Input id="email" name="email" type="email" placeholder="gloria.hector24@gmail.com" value={form.email} onChange={handleChange}
                                    className="rounded-lg border-[0.5px] border-[#6B7280] bg-transparent placeholder:text-[#B3BBC4] focus-visible:ring-[#2563EB] h-12 pr-10"
                                />
                                {/* Mail icon inside input */}
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B3BBC4] pointer-events-none">
                                    <Mail className="w-[16px] h-[16px]"/>
                                </span>
                            </div>
                        </div>  

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="subject" className="font-sans text-sm font-[500] text-[#111827]">
                                Subject
                            </label>
                            <Input id="subject" name="subject" type="text" placeholder="e.g Payment error" value={form.subject} onChange={handleChange}
                                className="rounded-lg border-[0.5px] border-[#6B7280] bg-transparent placeholder:text-[#B3BBC4] focus-visible:ring-[#2563EB] h-12"
                            />
                        </div>
            
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="message" className="font-sans text-sm font-[500] text-[#111827]">
                                Message
                            </label>
                            <Textarea id="message" name="message" placeholder="" value={form.message} onChange={handleChange} rows={6}
                                className="rounded-lg border-[0.5px] border-[#6B7280] bg-transparent focus-visible:ring-[#2563EB] resize-none"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl h-12 text-base mt-14">
                            Send Message
                        </Button>

                        </form>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}