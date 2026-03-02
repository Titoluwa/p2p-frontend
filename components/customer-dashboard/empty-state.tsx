
export function EmptyState({emptyText}: Readonly<{emptyText: string}>) {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div>
                {/* <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <rect x="15" y="12" width="42" height="50" rx="4" fill="#d1d5db" />
                    <rect x="20" y="20" width="28" height="3" rx="1.5" fill="#9ca3af" />
                    <rect x="20" y="27" width="22" height="3" rx="1.5" fill="#9ca3af" />
                    <rect x="20" y="34" width="25" height="3" rx="1.5" fill="#9ca3af" />
                    <circle cx="57" cy="18" r="12" fill="#e5e7eb" />
                    <path d="M57 13v6M57 22v1" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" />
                </svg> */}
                <img src="/images/images-none.png" alt="" width={160} height={160} className='grayscale' />
            </div>
            <p className="text-xl font-bold text-[#111827]">{emptyText}</p>
        </div>
    )
}