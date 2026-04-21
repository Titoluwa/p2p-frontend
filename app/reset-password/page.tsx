'use client'

import { useState, useEffect, Suspense } from "react"
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from "@/lib/context/auth-context"

type ResetStatus = 'idle' | 'loading' | 'success' | 'error' | 'invalid'

function StatusIcon({ status }: { readonly status: ResetStatus }): React.ReactNode {
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

    if (status === 'idle') {
        return (
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
                <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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

function EyeIcon({ visible }: { readonly visible: boolean }) {
    if (visible) {
        return (
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
        )
    }
    return (
        <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    )
}

function ResetContent() {
    const { resetPassword } = useAuth()
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')

    const [status, setStatus] = useState<ResetStatus>('idle')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [fieldError, setFieldError] = useState('')

    useEffect(() => {
        if (!token) {
            setStatus('invalid')
            setMessage('No reset token was provided. Please request a new password reset link.')
        }
    }, [token])

    const validatePasswords = (): boolean => {
        if (password.length < 8) {
            setFieldError('Password must be at least 8 characters.')
            return false
        }
        if (password !== confirmPassword) {
            setFieldError('Passwords do not match.')
            return false
        }
        setFieldError('')
        return true
    }

    const handleSubmit = async (e?: React.SubmitEvent | React.MouseEvent) => {
        e?.preventDefault()
        if (!token || status === 'loading') return
        if (!validatePasswords()) return

        setStatus('loading')
        try {
            const response = await resetPassword(token, password)

            if (response.success) {
                setStatus('success')
                setMessage(response?.message || '')
            } else {
                setStatus('error')
                setMessage(response?.message || 'This reset link is invalid or has expired. Please request a new one.')
            }
        } catch {
            setStatus('error')
            setMessage('Something went wrong while resetting your password. Please try again.')
        }
    }

    const headingText = {
        idle: 'Reset your password',
        loading: 'Updating password...',
        success: 'Password reset!',
        error: 'Reset failed',
        invalid: 'Invalid link',
    }[status]

    const subtitleText = {
        idle: "Choose a new password for your account. Make sure it's at least 8 characters long.",
        loading: 'Please wait while we update your password.',
        success: 'Your password has been reset successfully. You can now log in with your new password.',
        error: message || 'This reset link is invalid or has expired. Please request a new one.',
        invalid: 'No reset token was provided. Please check your email link and try again.',
    }[status]

    const statusCardClass = (() => {
        if (status === 'loading') return 'border-gray-200 bg-gray-50'
        if (status === 'success') return 'border-green-200 bg-[#DCF1E4]'
        if (status === 'error' || status === 'invalid') return 'border-red-200 bg-[#FDE8E8]'
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
                                    <form onSubmit={handleSubmit} className="w-full text-left space-y-4">
                                        {/* New password */}
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                                New password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    required
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value)
                                                        setFieldError('')
                                                    }}
                                                    placeholder="Min. 8 characters"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((v) => !v)}
                                                    className="absolute inset-y-0 right-3 flex items-center"
                                                    tabIndex={-1}
                                                >
                                                    <EyeIcon visible={showPassword} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Confirm password */}
                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirm new password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="confirmPassword"
                                                    type={showConfirm ? 'text' : 'password'}
                                                    required
                                                    value={confirmPassword}
                                                    onChange={(e) => {
                                                        setConfirmPassword(e.target.value)
                                                        setFieldError('')
                                                    }}
                                                    placeholder="Re-enter new password"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirm((v) => !v)}
                                                    className="absolute inset-y-0 right-3 flex items-center"
                                                    tabIndex={-1}
                                                >
                                                    <EyeIcon visible={showConfirm} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Inline field error */}
                                        {fieldError && (
                                            <p className="text-xs text-red-600 font-medium">{fieldError}</p>
                                        )}

                                        {/* Password strength hints */}
                                        <ul className="space-y-1">
                                            {[
                                                { label: 'At least 8 characters', met: password.length >= 8 },
                                                { label: 'Passwords match', met: password.length > 0 && password === confirmPassword },
                                            ].map(({ label, met }) => (
                                                <li key={label} className="flex items-center gap-2 text-xs">
                                                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${met ? 'bg-green-500' : 'bg-gray-200'}`}>
                                                        {met && (
                                                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                    <span className={met ? 'text-green-700' : 'text-gray-400'}>{label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </form>
                                )}

                                {status === 'loading' && (
                                    <p className="text-sm text-gray-500">
                                        Securely updating your password…
                                    </p>
                                )}

                                {status === 'success' && (
                                    <p className="text-sm text-green-700 font-medium">
                                        Your password has been updated. You can now log in with your new credentials.
                                    </p>
                                )}

                                {(status === 'error' || status === 'invalid') && (
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
                                    Reset password
                                </Button>
                            )}

                            {status === 'loading' && (
                                <Button
                                    disabled
                                    className="w-full bg-primary/50 text-white text-base font-semibold py-6 cursor-not-allowed"
                                >
                                    Resetting...
                                </Button>
                            )}

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
                                        onClick={() => router.push('/forgot-password')}
                                        className="w-full bg-primary hover:bg-primary-dark text-white text-base font-semibold py-6"
                                    >
                                        Request a new link
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push('/sign-in')}
                                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent py-6 text-base font-semibold"
                                    >
                                        Back to Log in
                                    </Button>
                                </>
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ResetContent />
        </Suspense>
    )
}