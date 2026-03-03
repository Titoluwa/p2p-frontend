import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { VehicleInfo, VEHICLE_TYPES } from '@/lib/types/constant'
import { CustomSelect } from '@/components/customer-dashboard/quotes/CustomSelect'

export function Step2VehicleInfo({ data, onChange }: Readonly<{ data: VehicleInfo; onChange: (d: VehicleInfo) => void }>) {
    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-[#111827]">Vehicle Information</CardTitle>
                <CardDescription>Tell us about the vehicle you want to ship</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="space-y-1.5">
                <Label>Vehicle Type</Label>
                <CustomSelect placeholder="Select vehicle type" options={VEHICLE_TYPES} value={data.vehicleType}
                    onChange={val => onChange({ ...data, vehicleType: val })} />
                </div>
                <div className="space-y-1.5">
                <Label htmlFor="vin">VIN (Vehicle Identification Number)</Label>
                <Input id="vin" placeholder="Enter your Vehicle Identification Number" value={data.vin}
                    onChange={e => onChange({ ...data, vin: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" placeholder="e.g., Toyota" value={data.make} onChange={e => onChange({ ...data, make: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="e.g., Camry" value={data.model} onChange={e => onChange({ ...data, model: e.target.value })} />
                </div>
                </div>
                <div className="space-y-1.5">
                <Label htmlFor="year">Year</Label>
                <Input id="year" placeholder="e.g., 2022" value={data.year} onChange={e => onChange({ ...data, year: e.target.value })} />
                </div>
                <div className="space-y-2">
                <Label>Condition</Label>
                <RadioGroup value={data.condition}
                    onValueChange={val => onChange({ ...data, condition: val as 'Running' | 'Non-Running' })}
                    className="flex items-center gap-6">
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