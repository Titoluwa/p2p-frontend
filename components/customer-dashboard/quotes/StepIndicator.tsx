import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StepIndicator({ currentStep }: Readonly<{ currentStep: number }>) {
    return (
        <div className="flex items-center justify-center gap-0 mb-8">
            {[1, 2, 3, 4].map((step, idx) => {
                const isCompleted = step < currentStep
                const isActive = step === currentStep
                return (
                    <div key={step} className="flex items-center">
                        <div className={cn(
                            'w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                            isCompleted || isActive ? 'bg-[#2563EB] text-white' : 'bg-gray-200 text-gray-500'
                        )}>
                            {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : step}
                        </div>
                        {idx < 3 && (
                            <div className={cn('h-[2px] w-16 sm:w-20', step < currentStep ? 'bg-[#2563EB]' : 'bg-gray-200')} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}