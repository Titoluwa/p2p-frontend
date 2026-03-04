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
                        onValueChange={val => onChange({ ...data, condition: val as 'Running' | 'Non-running' })}
                        className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Running" id="running" />
                            <Label htmlFor="running" className="font-normal cursor-pointer">Running</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Non-running" id="Non-running" />
                            <Label htmlFor="Non-running" className="font-normal cursor-pointer">Non-running</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="space-y-1.5">
                    <Label>Dimensions (cm)</Label>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="length" className="text-xs text-gray-500">Length</Label>
                            <Input id="length" type="number" min="0" placeholder="e.g., 450" value={data.length}
                                onChange={e => onChange({ ...data, length: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="width" className="text-xs text-gray-500">Width</Label>
                            <Input id="width" type="number" min="0" placeholder="e.g., 180" value={data.width}
                                onChange={e => onChange({ ...data, width: e.target.value })} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="height" className="text-xs text-gray-500">Height</Label>
                            <Input id="height" type="number" min="0" placeholder="e.g., 150" value={data.height}
                                onChange={e => onChange({ ...data, height: e.target.value })} />
                        </div>
                    </div>
                </div>
                {/* Weight */}
                <div className="space-y-1.5">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" type="number" min="0" placeholder="e.g., 1500" value={data.weight}
                        onChange={e => onChange({ ...data, weight: e.target.value })} />
                </div>
            </CardContent>
        </Card>
    )
}