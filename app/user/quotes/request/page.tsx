'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, X, CalendarIcon, ChevronDown } from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

interface CustomerInfo {
    firstName: string
    lastName: string
    email: string
    phone: string
}

interface VehicleInfo {
    vehicleType: string
    vin: string
    make: string
    model: string
    year: string
    condition: "Running" | "Non-Running" | ""
}

interface RouteInfo {
    originCountry: string
    destinationCountry: string
    shippingDate: string
}

// ── Constants ─────────────────────────────────────────────────────────────────

const VEHICLE_TYPES = [
    "Cars & SUVs",
    "Vans",
    "Trucks & Motorhomes",
    "Trailers",
    "Wheeled Equipment (Agricultural Equipment)",
]

const COUNTRIES = [
    "Nigeria",
    "Ghana",
    "United Arab Emirates",
    "Jamaica",
    "Kenya",
    "South Africa",
    "United States",
]

const ORIGIN_COUNTRIES = ["United Kingdom"]

// ── Step Indicator ─────────────────────────────────────────────────────────────

function StepIndicator({ currentStep }: Readonly<{ currentStep: number }>) {
    return (
        <div className="flex items-center justify-center gap-0 mb-8">
            {[1, 2, 3, 4].map((step, idx) => {
                const isCompleted = step < currentStep
                const isActive = step === currentStep

                return (
                    <div key={step} className="flex items-center">
                        {/* Circle */}
                        <div
                            className={cn(
                                "w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                                isCompleted || isActive ? "bg-[#2563EB] text-white" : "bg-gray-200 text-gray-500"
                            )}
                        >
                            {isCompleted ? (
                                <Check className="w-5 h-5 stroke-[2.5]" />
                            ) : (
                                step
                            )}
                        </div>

                        {/* Connector line */}
                        {idx < 3 && (
                            <div
                                className={cn(
                                    "h-[2px] w-16 sm:w-20",
                                    step < currentStep ? "bg-[#2563EB]" : "bg-gray-200"
                                )}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

// ── Custom Select ──────────────────────────────────────────────────────────────

function CustomSelect({
    placeholder,
    options,
    value,
    onChange,
}: Readonly<{
    placeholder: string
    options: string[]
    value: string
    onChange: (val: string) => void
}>) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-3 text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors"
            >
                <span className={value ? "text-gray-900" : "text-gray-400"}>
                    {value || placeholder}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => {
                                onChange(opt)
                                setOpen(false)
                            }}
                            className="w-full text-left px-4 py-3.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ── Step 1: Customer Information ───────────────────────────────────────────────

function Step1({
    data,
    onChange,
}: Readonly<{
    data: CustomerInfo
    onChange: (d: CustomerInfo) => void
}>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-bold text-[#111827]">Customer Information</CardTitle>
                <CardDescription>Your contact details (auto-filled from your account)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            value={data.firstName}
                            onChange={(e) => onChange({ ...data, firstName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            value={data.lastName}
                            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => onChange({ ...data, email: e.target.value })}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => onChange({ ...data, phone: e.target.value })}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

// ── Step 2: Vehicle Information ────────────────────────────────────────────────

function Step2({
    data,
    onChange,
}: Readonly<{
    data: VehicleInfo
    onChange: (d: VehicleInfo) => void
}>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-bold text-[#111827]">Vehicle Information</CardTitle>
                <CardDescription>Tell us about the vehicle you want to ship</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="space-y-1.5">
                    <Label>Vehicle Type</Label>
                    <CustomSelect
                        placeholder="Select vehicle type"
                        options={VEHICLE_TYPES}
                        value={data.vehicleType}
                        onChange={(val) => onChange({ ...data, vehicleType: val })}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="vin">VIN (Vehicle Identification Number)</Label>
                    <Input
                        id="vin"
                        placeholder="Enter your Vehicle Identification Number"
                        value={data.vin}
                        onChange={(e) => onChange({ ...data, vin: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="make">Make</Label>
                        <Input
                            id="make"
                            placeholder="e.g., Toyota"
                            value={data.make}
                            onChange={(e) => onChange({ ...data, make: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="model">Model</Label>
                        <Input
                            id="model"
                            placeholder="e.g., Camry"
                            value={data.model}
                            onChange={(e) => onChange({ ...data, model: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="year">Year</Label>
                    <Input
                        id="year"
                        placeholder="e.g., 2022"
                        value={data.year}
                        onChange={(e) => onChange({ ...data, year: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Condition</Label>
                    <RadioGroup
                        value={data.condition}
                        onValueChange={(val) =>
                            onChange({ ...data, condition: val as "Running" | "Non-Running" })
                        }
                        className="flex items-center gap-6"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Running" id="running" />
                            <Label htmlFor="running" className="font-normal cursor-pointer">Running</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Non-Running" id="non-running" />
                            <Label htmlFor="non-running" className="font-normal cursor-pointer">Non-Running</Label>
                        </div>
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>
    )
}

// ── Step 3: Route Information ──────────────────────────────────────────────────

function Step3({
    data,
    onChange,
}: Readonly<{
    data: RouteInfo
    onChange: (d: RouteInfo) => void
}>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-bold text-[#111827]">Route Information</CardTitle>
                <CardDescription>Where do you want to ship your vehicle?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="space-y-1.5">
                    <Label>Origin Country</Label>
                    <CustomSelect
                        placeholder="Select origin"
                        options={ORIGIN_COUNTRIES}
                        value={data.originCountry}
                        onChange={(val) => onChange({ ...data, originCountry: val })}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label>Destination Country</Label>
                    <CustomSelect
                        placeholder="Select destination"
                        options={COUNTRIES}
                        value={data.destinationCountry}
                        onChange={(val) => onChange({ ...data, destinationCountry: val })}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="shippingDate">Preferred Shipping Date (Optional)</Label>
                    <div className="relative">
                        <Input
                            id="shippingDate"
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value={data.shippingDate}
                            onChange={(e) => onChange({ ...data, shippingDate: e.target.value })}
                            className="pr-10"
                        />
                        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// ── Step 4: Review & Submit ────────────────────────────────────────────────────

function ReviewField({ label, value }: Readonly<{ label: string; value: string }>) {
    return (
        <div>
            <p className="text-sm text-gray-500 mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-[#111827]">{value || "—"}</p>
        </div>
    )
}

function Step4({
    customer,
    vehicle,
    route,
}: Readonly<{
    customer: CustomerInfo
    vehicle: VehicleInfo
    route: RouteInfo
}>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-bold text-[#111827]">Review & Submit</CardTitle>
                <CardDescription>Fill in the details to get a shipping quote</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Customer */}
                <div>
                    <h3 className="text-base font-bold text-[#111827] mb-4">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <ReviewField label="Name" value={`${customer.firstName} ${customer.lastName}`} />
                        <ReviewField label="Email Address" value={customer.email} />
                        <ReviewField label="Phone Number" value={customer.phone} />
                    </div>
                </div>

                {/* Vehicle */}
                <div>
                    <h3 className="text-base font-bold text-[#111827] mb-4">Vehicle Information</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <ReviewField label="Type" value={vehicle.vehicleType || vehicle.make} />
                        <ReviewField label="Make & Model" value={vehicle.model} />
                        <ReviewField label="Year" value={vehicle.year} />
                        <ReviewField label="Condition" value={vehicle.condition} />
                        <ReviewField label="VIN" value={vehicle.vin} />
                    </div>
                </div>

                {/* Route */}
                <div>
                    <h3 className="text-base font-bold text-[#111827] mb-4">Route Information</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <ReviewField label="Origin" value={route.originCountry} />
                        <ReviewField label="Destination" value={route.destinationCountry} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// ── Success Modal ──────────────────────────────────────────────────────────────

function SuccessModal({ onClose }: Readonly<{ onClose: () => void }>) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close modal"
                className="absolute inset-0 bg-black/30 cursor-default"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 mx-4 w-full max-w-md text-center z-10">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-8 h-8 text-green-600 stroke-[2.5]" />
                    </div>
                </div>

                <h2 className="text-xl font-bold text-[#111827] mb-3">Quote Request Submitted!</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    Your quote request has been received. We'll review your information and send you a
                    detailed quote within 15-30 minutes.
                </p>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        className="border-[#2563EB] text-[#2563EB] hover:bg-blue-50"
                        onClick={onClose}
                    >
                        View my Shipments
                    </Button>
                    <Button
                        className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white"
                        onClick={onClose}
                    >
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function RequestQuotePage() {
    const { user } = useAuth()
    const [step, setStep] = useState(1)
    const [submitted, setSubmitted] = useState(false)

    const [customer, setCustomer] = useState<CustomerInfo>({
        firstName: user?.firstName ?? "Kunle",
        lastName: user?.lastName ?? "Remi",
        email: user?.email ?? "kunle.remi25@gmail.com",
        phone: user?.phone ?? "+234 568 768 5687",
    })

    const [vehicle, setVehicle] = useState<VehicleInfo>({
        vehicleType: "",
        vin: "",
        make: "",
        model: "",
        year: "",
        condition: "",
    })

    const [route, setRoute] = useState<RouteInfo>({
        originCountry: "United Kingdom",
        destinationCountry: "",
        shippingDate: "",
    })

    const handleNext = () => {
        if (step < 4) setStep((s) => s + 1)
        else setSubmitted(true)
    }

    const handleBack = () => {
        if (step > 1) setStep((s) => s - 1)
    }

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">Request a Quote</h1>
                <p className="text-gray-600 text-sm sm:text-base">Fill in the details to get a shipping quote</p>
            </div>

            {/* Step Indicator */}
            <StepIndicator currentStep={step} />

            {/* Step Content */}
            {step === 1 && <Step1 data={customer} onChange={setCustomer} />}
            {step === 2 && <Step2 data={vehicle} onChange={setVehicle} />}
            {step === 3 && <Step3 data={route} onChange={setRoute} />}
            {step === 4 && <Step4 customer={customer} vehicle={vehicle} route={route} />}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
                <Button
                    variant="outline"
                    className="w-44 border-[#2563EB] text-[#2563EB] hover:bg-blue-50"
                    onClick={step === 1 ? undefined : handleBack}
                >
                    {step === 1 ? "Cancel" : "Back"}
                </Button>
                <Button
                    className="w-44 bg-[#2563EB] hover:bg-[#2563EB]/80 text-white"
                    onClick={handleNext}
                >
                    {step === 4 ? "Submit Quote Request" : "Next"}
                </Button>
            </div>

            {/* Success Modal */}
            {submitted && <SuccessModal onClose={() => setSubmitted(false)} />}
        </div>
    )
}