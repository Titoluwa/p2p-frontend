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
                <div>
                <h3 className="text-base font-bold text-[#111827] mb-4">Customer Information</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <ReviewField label="Name" value={`${customer.firstName} ${customer.lastName}`} />
                    <ReviewField label="Email Address" value={customer.email} />
                    <ReviewField label="Phone Number" value={customer.phone} />
                </div>
                </div>
                <div>
                <h3 className="text-base font-bold text-[#111827] mb-4">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <ReviewField label="Type" value={vehicle.vehicleType || vehicle.make} />
                    <ReviewField label="Make & Model" value={`${vehicle.make} ${vehicle.model}`} />
                    <ReviewField label="Year" value={vehicle.year} />
                    <ReviewField label="Condition" value={vehicle.condition} />
                    <ReviewField label="VIN" value={vehicle.vin} />
                </div>
                </div>
                <div>
                <h3 className="text-base font-bold text-[#111827] mb-4">Route Information</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <ReviewField label="Origin" value={route.originCountry} />
                    <ReviewField label="Destination" value={route.destinationCountry} />
                    {route.shippingDate && (
                    <ReviewField label="Preferred Shipping Date" value={format(route.shippingDate, 'dd/MM/yyyy')} />
                    )}
                </div>
                </div>
            </CardContent>
        </Card>
    )
}