import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CustomerInfo, VehicleInfo, RouteInfo } from '@/lib/types/constant'
import { format } from 'date-fns'

function ReviewField({ label, value }: Readonly<{ label: string; value: string }>) {
    return (
        <div>
            <p className="text-sm text-gray-500 mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-[#111827]">{value || '—'}</p>
        </div>
    )
}

export function Step4Review({ customer, vehicle, route }: Readonly<{ customer: CustomerInfo; vehicle: VehicleInfo; route: RouteInfo }>) {
    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-[#111827]">Review & Submit</CardTitle>
                <CardDescription>Please review your details before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Customer */}
                <div>
                <h3 className="text-base font-bold text-[#111827] mb-4">Customer Information</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <ReviewField label="Full Name" value={`${customer.firstName} ${customer.lastName}`.trim()} />
                    <ReviewField label="Email Address" value={customer.email} />
                    <ReviewField label="Phone Number" value={customer.phone} />
                </div>
                </div>

                {/* Vehicle */}
                <div>
                <h3 className="text-base font-bold text-[#111827] mb-4">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <ReviewField label="Type" value={vehicle.vehicleType} />
                    <ReviewField label="Make & Model" value={`${vehicle.make} ${vehicle.model}`.trim()} />
                    <ReviewField label="Year" value={vehicle.year} />
                    <ReviewField label="Condition" value={vehicle.condition} />
                    <ReviewField label="VIN" value={vehicle.vin} />
                    <ReviewField
                    label="Dimensions (cm)"
                    value={vehicle.length && vehicle.width && vehicle.height
                        ? `${vehicle.length} L × ${vehicle.width} W × ${vehicle.height} H`
                        : '—'}
                    />
                    <ReviewField label="Weight (kg)" value={vehicle.weight} />
                </div>
                </div>

                {/* Route */}
                <div>
                <h3 className="text-base font-bold text-[#111827] mb-4">Route Information</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <ReviewField label="Origin Country" value={route.originCountry} />
                    <ReviewField label="Origin Port" value={route.originPort} />
                    <ReviewField label="Destination Country" value={route.destinationCountry} />
                    <ReviewField label="Destination Port" value={route.destinationPort} />
                    {route.shippingDate && (
                    <ReviewField label="Preferred Shipping Date" value={format(route.shippingDate, 'dd/MM/yyyy')} />
                    )}
                </div>
                </div>

            </CardContent>
        </Card>
    )
}