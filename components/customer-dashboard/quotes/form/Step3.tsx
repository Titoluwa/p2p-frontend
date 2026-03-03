import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RouteInfo, COUNTRIES, ORIGIN_COUNTRIES } from '@/lib/types/constant'
import { CustomSelect } from '@/components/customer-dashboard/quotes/CustomSelect'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

export function Step3RouteInfo({ data, onChange }: Readonly<{ data: RouteInfo; onChange: (d: RouteInfo) => void }>) {
    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-[#111827]">Route Information</CardTitle>
                <CardDescription>Where do you want to ship your vehicle?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="space-y-1.5">
                <Label>Origin Country</Label>
                <CustomSelect placeholder="Select origin" options={ORIGIN_COUNTRIES} value={data.originCountry}
                    onChange={val => onChange({ ...data, originCountry: val })} />
                </div>
                <div className="space-y-1.5">
                <Label>Destination Country</Label>
                <CustomSelect placeholder="Select destination" options={COUNTRIES} value={data.destinationCountry}
                    onChange={val => onChange({ ...data, destinationCountry: val })} />
                </div>
                <div className="space-y-1.5">
                <Label>Preferred Shipping Date (Optional)</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="outline" className={cn(
                        'hover:bg-transparent w-full justify-between font-normal border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]',
                        !data.shippingDate && 'text-gray-400'
                    )}>
                        {data.shippingDate ? format(data.shippingDate, 'dd/MM/yyyy') : 'DD/MM/YYYY'}
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={data.shippingDate}
                        onSelect={date => onChange({ ...data, shippingDate: date })}
                        disabled={date => date < new Date()} className="rounded-lg border" captionLayout="dropdown" />
                    </PopoverContent>
                </Popover>
                </div>
            </CardContent>
        </Card>
    )
}