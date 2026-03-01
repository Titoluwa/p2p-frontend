'use client'

import { useState, useEffect } from "react"
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from "@/lib/context/auth-context"

type VerificationStatus = 'loading' | 'success' | 'error' | 'invalid'

function StatusIcon({ status }: { readonly status: VerificationStatus }): React.ReactNode {
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
            <svg className="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    )
}

export default function VerifyPage() {
    const { verifyAccount } = useAuth()
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')

    const [status, setStatus] = useState<VerificationStatus>('loading')
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        if (!token) {
            setStatus('invalid')
            setMessage('No verification token was provided. Please check your email link and try again.')
            return
        }

        const verifyToken = async () => {
            try {
                const response = await verifyAccount(token)

                if (response.success) {
                    setStatus('success')
                    setMessage('Your email has been verified successfully. You can now log in to your account.')
                } else {
                    setStatus('error')
                    setMessage(response?.message || 'This verification link is invalid or has expired. Please request a new one.')
                }
            } catch {
                setStatus('error')
                setMessage('Something went wrong while verifying your email. Please try again.')
            }
        }

        verifyToken()
    }, [token])

    const headingText = {
        loading: 'Verifying your email...',
        success: 'Email verified!',
        error: 'Verification failed',
        invalid: 'Invalid link',
    }[status]

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
                                {status === 'loading'
                                    ? 'Please wait while we verify your email address.'
                                    : message}
                            </p>

                            {/* Status card */}
                            {(() => {
                                let statusCardClass = 'border-red-200 bg-red-50'
                                if (status === 'loading') statusCardClass = 'border-gray-200 bg-gray-50'
                                else if (status === 'success') statusCardClass = 'border-green-200 bg-green-50'
                                return (
                                    <div className={`rounded-xl border p-6 flex flex-col items-center text-center transition-all duration-500 ${statusCardClass}`}>
                                        <StatusIcon status={status} />

                                        {status === 'loading' && (
                                            <p className="text-sm text-gray-500">
                                                Checking token:{' '}
                                                <span className="font-mono text-gray-700 break-all">
                                                    {token ? `${token.slice(0, 8)}...${token.slice(-8)}` : ''}
                                                </span>
                                            </p>
                                        )}

                                        {status === 'success' && (
                                            <p className="text-sm text-green-700 font-medium">
                                                Your account is now active and ready to use.
                                            </p>
                                        )}

                                        {(status === 'error' || status === 'invalid') && (
                                            <p className="text-sm text-red-600 font-medium">
                                                {message}
                                            </p>
                                        )}
                                    </div>
                                )
                            })()}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col gap-3">
                            {status === 'success' && (
                                <Button
                                    onClick={() => router.push('/sign-in')}
                                    className="w-full bg-primary hover:bg-primary-dark text-white text-base font-semibold py-6"
                                >
                                    Continue to Log in
                                </Button>
                            )}

                            {(status === 'error' || status === 'invalid') && (
                                <>
                                    <Button
                                        onClick={() => router.push('/sign-up')}
                                        className="w-full bg-primary hover:bg-primary-dark text-white text-base font-semibold py-6"
                                    >
                                        Back to Sign up
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push('/resend-verification')}
                                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent py-6 text-base font-semibold"
                                    >
                                        Resend verification email
                                    </Button>
                                </>
                            )}

                            {status === 'loading' && (
                                <Button
                                    disabled
                                    className="w-full bg-primary/50 text-white text-base font-semibold py-6 cursor-not-allowed"
                                >
                                    Verifying...
                                </Button>
                            )}

                            <p className="text-sm text-gray-600 mt-1 text-center">
                                Already have an account?{' '}
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