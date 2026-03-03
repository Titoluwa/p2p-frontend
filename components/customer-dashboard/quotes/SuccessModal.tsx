import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import Link from 'next/link'

export function SuccessModal({ open, onClose }: Readonly<{ open: boolean; onClose: () => void }>) {
    return (
        <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) onClose() }}>
            <DialogContent className="sm:max-w-lg rounded-2xl px-8 py-10 text-center">
                <DialogTitle className="sr-only">Quote Request Submitted</DialogTitle>
                <DialogDescription className="sr-only">Your quote request has been received successfully.</DialogDescription>
                <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-8 h-8 text-green-600 stroke-[2.5]" />
                    </div>
                </div>
                <h2 className="text-xl font-bold text-[#111827] mb-3">Quote Request Submitted!</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    Your quote request has been received. We'll review your information and send you a detailed quote within 15–30 minutes.
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <Link href="/user/shipments">
                        <Button variant="outline" className="w-full border-[#2563EB] text-[#2563EB] hover:bg-blue-50" onClick={onClose}>
                        View my Shipments
                        </Button>
                    </Link>
                    <Link href="/user/dashboard">
                        <Button className="w-full bg-[#2563EB] hover:bg-[#2563EB]/80 text-white" onClick={onClose}>
                        Go to Dashboard
                        </Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    )
}