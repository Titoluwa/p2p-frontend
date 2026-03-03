'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function CustomSelect({ placeholder, options, value, onChange }: Readonly<{ placeholder: string, options: readonly string[], value: string, onChange: (val: string) => void }>) {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative">
            <button type="button" onClick={() => setOpen(p => !p)}
                className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-3 text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors">
                <span className={value ? 'text-gray-900' : 'text-gray-400'}>{value || placeholder}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {open && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {options.map(opt => (
                    <button key={opt} type="button"
                    onClick={() => { onChange(opt); setOpen(false) }}
                    className="w-full text-left px-4 py-3.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                    {opt}
                    </button>
                ))}
                </div>
            )}
        </div>
    )
}   