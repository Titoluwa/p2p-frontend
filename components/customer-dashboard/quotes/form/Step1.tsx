import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomerInfo } from '@/lib/types/constant'

export function Step1CustomerInfo({ data, onChange }: Readonly<{ data: CustomerInfo; onChange: (d: CustomerInfo) => void }>) {
    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-[#111827]">Customer Information</CardTitle>
                <CardDescription>Your contact details (auto-filled from your account)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={data.firstName} onChange={e => onChange({ ...data, firstName: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={data.lastName} onChange={e => onChange({ ...data, lastName: e.target.value })} />
                </div>
                </div>
                <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={data.email} onChange={e => onChange({ ...data, email: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={data.phone} onChange={e => onChange({ ...data, phone: e.target.value })} />
                </div>
            </CardContent>
        </Card>
    )
}