'use client'

import React, { useState } from "react"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/context/auth-context'
import { useRouter } from 'next/navigation'

export default function AdminSignInPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [frontError, setFrontError] = useState<string | null>(null)
    const { login, error } = useAuth()
    const displayError = frontError || error
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
        if (frontError) setFrontError(null)
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setFrontError(null)

        try {
            await login({
                email: formData.email,
                password: formData.password,
            })
            router.push('/admin/dashboard')
        } catch (err: unknown) {
            if (err instanceof Error) {
                setFrontError(err.message)
            } else {
                setFrontError('Something went wrong. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10 py-8">
            <div className="max-w-8xl w-full">

                <div className="overflow-hidden grid md:grid-cols-2 gap-10 items-center">
                    {/* Left Column - Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="px-4 sm:px-6 lg:px-12 flex flex-col justify-around">
                            <div className="mb-10">
                                {/* Logo Placeholder */}
                                <div className="w-24 h-10 bg-gray-300 mb-6" />

                                <h1 className="text-[42px] font-[300] text-[#111827] mb-6">Admin Sign in</h1>

                                {/* Form */}
                                <div className="flex flex-col space-y-8">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email address
                                        </label>
                                        <Input id="email" name="email" type="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} className="border-gray-300 h-12]" />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            Password
                                        </label>
                                        <Input id="password" name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="border-gray-300 h-12" />
                                    </div>
                                </div>
                            </div>


                            {displayError && (
                                <div className="mb-4 rounded-md border border-red-300 bg-[#FDE8E8] p-3">
                                    <p className="text-sm text-red-600 font-medium">
                                        {displayError}
                                    </p>
                                </div>
                            )}
                            <div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary-dark text-white text-base font-semibold py-6">
                                    {isLoading ? 'Logging in...' : 'Log in'}
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Right Column - Image */}
                    <div className="hidden md:block relative h-[90vh] overflow-hidden">
                        <Image src="/images/auth-page.jpg" alt="Port-vessel" fill className="object-cover object-right" />
                    </div>
                </div>
            </div>
        </div>
    )
}
