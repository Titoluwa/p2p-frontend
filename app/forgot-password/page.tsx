'use client'

import { useState } from "react"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from "@/lib/context/auth-context"

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

function StatusIcon({ status }: { readonly status: RequestStatus }): React.ReactNode {
    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                <svg
                    className="w-8 h-8 text-gray-400 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            </div>
        )
    }

    if (status === 'success') {
        return (
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <svg className="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                <svg className="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        )
    }

    // idle — envelope icon
    return (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
            <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
        </div>
    )
}

export default function ForgotPasswordPage() {
    const { forgotPassword } = useAuth()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<RequestStatus>('idle')
    const [message, setMessage] = useState('')

    const headingText = {
        idle: 'Forgot your password?',
        loading: 'Sending reset link...',
        success: 'Check your inbox',
        error: 'Something went wrong',
    }[status]

    const subtitleText = {
        idle: "No worries! Enter your email address and we'll send you a link to reset your password.",
        loading: 'Please wait while we send a reset link to your email.',
        success: message || "We've sent a password reset link to your email. Check your inbox and follow the instructions.",
        error: message || 'We could not send a reset link. Please try again.',
    }[status]

    const handleSubmit = async (e?: React.SubmitEvent | React.MouseEvent) => {
        e?.preventDefault()
        if (!email.trim() || status === 'loading') return

        setStatus('loading')
        try {
            const response = await forgotPassword(email.trim())

            if (response.success) {
                setStatus('success')
                setMessage(response?.message || '')
            } else {
                setStatus('error')
                setMessage(response?.message || 'Unable to send reset email. Please try again.')
            }
        } catch {
            setStatus('error')
            setMessage('Something went wrong. Please try again.')
        }
    }

    const statusCardClass = (() => {
        if (status === 'loading') return 'border-gray-200 bg-gray-50'
        if (status === 'success') return 'border-green-200 bg-[#DCF1E4]'
        if (status === 'error') return 'border-red-200 bg-[#FDE8E8]'
        return 'border-blue-100 bg-blue-50'
    })()

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10 py-8">
            <div className="max-w-8xl w-full">
                <div className="overflow-hidden grid md:grid-cols-2 gap-10">

                    {/* Left Column */}
                    <div className="px-4 sm:px-6 lg:px-12 flex flex-col justify-around">
                        <div className="mb-10">
                            {/* Logo Placeholder */}
                            <div className="w-24 h-10 bg-gray-300 mb-3" />

                            <h1 className="text-[42px] font-[300] text-[#111827] mb-3">
                                {headingText}
                            </h1>

                            <p className="text-gray-500 text-sm mb-8">
                                {subtitleText}
                            </p>

                            {/* Status / Form card */}
                            <div className={`rounded-xl border p-6 flex flex-col items-center text-center transition-all duration-500 ${statusCardClass}`}>
                                <StatusIcon status={status} />

                                {status === 'idle' && (
                                    <form onSubmit={handleSubmit} className="w-full text-left">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </form>
                                )}

                                {status === 'loading' && (
                                    <p className="text-sm text-gray-500">
                                        Sending to:{' '}
                                        <span className="font-medium text-gray-700">{email}</span>
                                    </p>
                                )}

                                {status === 'success' && (
                                    <p className="text-sm text-green-700 font-medium">
                                        A reset link has been sent to <span className="font-semibold">{email}</span>. The link expires in 15 minutes.
                                    </p>
                                )}

                                {status === 'error' && (
                                    <p className="text-sm text-red-600 font-medium">
                                        {message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col gap-3">
                            {status === 'idle' && (
                                <Button
                                    onClick={(e) => handleSubmit(e)}
                                    className="w-full bg-primary hover:bg-primary-dark text-white text-base font-semibold py-6"
                                >
                                    Send reset link
                                </Button>
                            )}

                            {status === 'loading' && (
                                <Button
                                    disabled
                                    className="w-full bg-primary/50 text-white text-base font-semibold py-6 cursor-not-allowed"
                                >
                                    Sending...
                                </Button>
                            )}

                            {status === 'success' && (
                                <>
                                    <Button
                                        onClick={() => router.push('/sign-in')}
                                        className="w-full bg-primary hover:bg-primary-dark text-white text-base font-semibold py-6"
                                    >
                                        Back to Log in
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setStatus('idle')
                                            setEmail('')
                                            setMessage('')
                                        }}
                                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent py-6 text-base font-semibold"
                                    >
                                        Try a different email
                                    </Button>
                                </>
                            )}

                            {status === 'error' && (
                                <>
                                    <Button
                                        onClick={() => {
                                            setStatus('idle')
                                            setMessage('')
                                        }}
                                        className="w-full bg-primary hover:bg-primary-dark text-white text-base font-semibold py-6"
                                    >
                                        Try again
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push('/sign-up')}
                                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent py-6 text-base font-semibold"
                                    >
                                        Create an account
                                    </Button>
                                </>
                            )}

                            <p className="text-sm text-gray-600 mt-1 text-center">
                                Remember your password?{' '}
                                <Link href="/sign-in" className="text-primary font-semibold hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="hidden md:block relative h-[90vh] overflow-hidden">
                        <Image
                            src="/images/auth-page.jpg"
                            alt="Port-vessel"
                            fill
                            className="object-cover object-right"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}