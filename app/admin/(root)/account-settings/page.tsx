'use client'

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {
    Camera,
    ChevronDown,
    Copy,
    AlertCircle,
    User,
    Lock,
    Bell,
    Settings2,
    KeyRound,
} from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"

// ── Shared tab trigger class (mirrors customer AccountSettings) ────────────────

const TAB_CLASS =
    "rounded-none border-b-[3px] border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:shadow-none data-[state=active]:bg-transparent px-4 py-2.5 text-sm text-[#6B7280] data-[state=active]:text-[#111827] data-[state=active]:font-semibold whitespace-nowrap"

// ── SectionHeader ─────────────────────────────────────────────────────────────
// Renders the icon + bold title + separator that tops every tab card

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500 shrink-0">{icon}</span>
                <h2 className="text-base font-bold text-[#111827]">{title}</h2>
            </div>
            <Separator className="mb-6" />
        </>
    )
}

// ── CustomSelect ──────────────────────────────────────────────────────────────
// Dropdown used in System Preferences; styled to match the screenshot border/chevron

function CustomSelect({
    value,
    options,
    onChange,
}: {
    value: string
    options: string[]
    onChange: (v: string) => void
}) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white hover:border-gray-300 focus:outline-none"
            >
                <span className="text-gray-800">{value}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => { onChange(opt); setOpen(false) }}
                            className="w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ── CheckboxRow ───────────────────────────────────────────────────────────────
// Label on the left, checkbox on the right — used in Notification tab

function CheckboxRow({
    id,
    label,
    checked,
    onCheckedChange,
}: {
    id: string
    label: string
    checked: boolean
    onCheckedChange: (v: boolean) => void
}) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer select-none">
                {label}
            </label>
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="rounded-sm border-gray-300 data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB]"
            />
        </div>
    )
}

// ── ApiKeyRow ─────────────────────────────────────────────────────────────────
// Single API key entry with masked value + Regenerate button

function ApiKeyRow({
    label,
    maskedKey,
    onRegenerate,
}: {
    label: string
    maskedKey: string
    onRegenerate: () => void
}) {
    return (
        <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-4">
            <div>
                <p className="text-sm font-semibold text-[#111827]">{label}</p>
                <p className="text-sm text-gray-400 font-mono mt-0.5">{maskedKey}</p>
            </div>
            <Button
                variant="outline"
                className="text-sm text-gray-600 border-gray-200 hover:bg-gray-50 shrink-0"
                onClick={onRegenerate}
            >
                Regenerate
            </Button>
        </div>
    )
}

// ── CreateApiKeyDialog ────────────────────────────────────────────────────────
// Step 1 dialog: key name + environment + permissions checkboxes

function CreateApiKeyDialog({
    open,
    onClose,
    onGenerate,
}: {
    open: boolean
    onClose: () => void
    onGenerate: (key: string) => void
}) {
    const [keyName, setKeyName] = useState("")
    const [environment, setEnvironment] = useState("Production")
    const [permissions, setPermissions] = useState<Record<string, boolean>>({
        "Read Quotes": false,
        "Write Quotes": false,
        "Read Shipments": false,
        "Write Shipments": false,
        "Read Customers": false,
        "Write Customers": false,
        "Read Documents": false,
        "Write Documents": false,
    })

    const toggle = (key: string) =>
        setPermissions((prev) => ({ ...prev, [key]: !prev[key] }))

    const handleGenerate = () => {
        const newKey = `pk_live_${Math.random().toString(36).slice(2, 18)}`
        onGenerate(newKey)
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
            <DialogContent className="sm:max-w-md rounded-2xl px-8 py-8">
                <DialogTitle className="text-xl font-bold text-[#111827] text-center mb-6">
                    Create API Key
                </DialogTitle>

                {/* Key Name */}
                <div className="space-y-1.5 mb-5">
                    <Label htmlFor="keyName">
                        Key Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="keyName"
                        placeholder="e.g., Production API , Mobile App Key"
                        value={keyName}
                        onChange={(e) => setKeyName(e.target.value)}
                    />
                </div>

                {/* Environment */}
                <div className="space-y-1.5 mb-5">
                    <Label>
                        Environment <span className="text-red-500">*</span>
                    </Label>
                    <CustomSelect
                        value={environment}
                        options={["Production", "Staging", "Development"]}
                        onChange={setEnvironment}
                    />
                </div>

                {/* Permissions */}
                <div className="space-y-1.5 mb-6">
                    <Label>
                        Permissions <span className="text-red-500">*</span>
                    </Label>
                    <div className="border border-gray-200 rounded-lg px-4 py-1">
                        {Object.entries(permissions).map(([key, checked]) => (
                            <CheckboxRow
                                key={key}
                                id={`perm-${key}`}
                                label={key}
                                checked={checked}
                                onCheckedChange={() => toggle(key)}
                            />
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <Button
                        variant="outline"
                        className="w-full border-[#2563EB] text-[#2563EB] hover:bg-blue-50"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-full bg-[#2563EB] hover:bg-[#2563EB]/80 text-white"
                        onClick={handleGenerate}
                    >
                        Generate Key
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// ── GeneratedKeyDialog ────────────────────────────────────────────────────────
// Step 2 dialog: show the newly generated key with copy button + warning banner

function GeneratedKeyDialog({
    open,
    apiKey,
    onClose,
}: {
    open: boolean
    apiKey: string
    onClose: () => void
}) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
            <DialogContent className="sm:max-w-md rounded-2xl px-8 py-8">
                <DialogTitle className="text-xl font-bold text-[#111827] text-center mb-5">
                    Create API Key
                </DialogTitle>

                {/* Warning banner */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 mb-6">
                    <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-yellow-700">Save this key securely!</p>
                        <p className="text-sm text-yellow-600 mt-0.5">
                            This is the only time you'll see the complete key. Make sure to copy it now.
                        </p>
                    </div>
                </div>

                {/* Key display */}
                <div className="space-y-1.5 mb-6">
                    <Label>Your New API Key</Label>
                    <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-3 bg-white">
                        <span className="text-sm text-gray-800 font-mono flex-1 truncate">{apiKey}</span>
                        <button
                            onClick={handleCopy}
                            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                            aria-label="Copy API key"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                    {copied && <p className="text-xs text-green-600">Copied to clipboard!</p>}
                </div>

                <Button
                    className="w-full bg-[#2563EB] hover:bg-[#2563EB]/80 text-white"
                    onClick={onClose}
                >
                    Done
                </Button>
            </DialogContent>
        </Dialog>
    )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function AdminAccountSettings() {
    const { user } = useAuth()

    // ── Notification state ──
    const [emailNotifs, setEmailNotifs] = useState({
        newQuoteRequests: false,
        newShipmentsCreated: false,
        documentUploads: false,
        paymentConfirmations: false,
        newSupportTickets: false,
    })
    const [browserNotif, setBrowserNotif] = useState(false)

    const toggleEmail = (key: keyof typeof emailNotifs) =>
        setEmailNotifs((prev) => ({ ...prev, [key]: !prev[key] }))

    // ── System Preferences state ──
    const [timezone, setTimezone] = useState("Pacific Time")
    const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")
    const [currency, setCurrency] = useState("USD ($)")

    // ── API Management state ──
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [generatedKey, setGeneratedKey] = useState<string | null>(null)

    const handleGenerate = (key: string) => {
        setShowCreateDialog(false)
        setGeneratedKey(key)
    }

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Page header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">
                    Account Settings
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                    Manage your account and system preferences
                </p>
            </div>

            <Tabs defaultValue="profile">
                {/* ── Tab bar ── */}
                <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 mb-6 overflow-x-auto">
                    <TabsTrigger value="profile" className={TAB_CLASS}>Admin Profile</TabsTrigger>
                    <TabsTrigger value="security" className={TAB_CLASS}>Security</TabsTrigger>
                    <TabsTrigger value="notification" className={TAB_CLASS}>Notification</TabsTrigger>
                    <TabsTrigger value="system" className={TAB_CLASS}>System Preferences</TabsTrigger>
                    <TabsTrigger value="api" className={TAB_CLASS}>API Management</TabsTrigger>
                </TabsList>

                {/* ── Admin Profile ── */}
                <TabsContent value="profile">
                    <Card>
                        <CardContent className="p-6 space-y-5">
                            <SectionHeader icon={<User className="w-5 h-5" />} title="Admin Profile" />

                            {/* Avatar upload */}
                            <div className="relative inline-block mb-8">
                                <Avatar className="w-36 h-36">
                                    <AvatarFallback className="bg-gray-200 text-gray-400 text-3xl font-medium">
                                        {user?.data.user.firstName?.slice(0, 1).toUpperCase()}
                                        {user?.data.user.lastName?.slice(0, 1).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-800 whitespace-nowrap border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <Camera className="w-4 h-4" /> Add photo
                                </button>
                            </div>

                            {/* Name fields */}
                            <div className="grid grid-cols-2 gap-4 pt-3">
                                <div className="space-y-1.5">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue={user?.data.user.firstName ?? "Kunle"} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue={user?.data.user.lastName ?? "Remi"} />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue={user?.data.user.email ?? "kunle.remi25@gmail.com"} />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" defaultValue={user?.data.user.phone ?? "+234 568 768 5687"} />
                            </div>

                            <Button className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white">
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── Security ── */}
                <TabsContent value="security">
                    <Card>
                        <CardContent className="p-6 space-y-5">
                            <SectionHeader icon={<Lock className="w-5 h-5" />} title="Security" />

                            <div className="space-y-1.5">
                                <Label htmlFor="currentPwd">Current Password</Label>
                                <Input id="currentPwd" type="password" placeholder="Enter current password" />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="newPwd">New Password</Label>
                                <Input id="newPwd" type="password" placeholder="Enter new password" />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="confirmPwd">Confirm New Password</Label>
                                <Input id="confirmPwd" type="password" placeholder="Confirm new password" />
                            </div>

                            <div className="pt-2">
                                <Button className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white">
                                    Update Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── Notification ── */}
                <TabsContent value="notification">
                    <Card>
                        <CardContent className="p-6">
                            <SectionHeader icon={<Bell className="w-5 h-5" />} title="Notification Settings" />

                            {/* Email Notifications group */}
                            <p className="text-sm font-bold text-[#111827] mb-2">Email Notifications</p>
                            <div className="mb-6">
                                <CheckboxRow
                                    id="newQuotes"
                                    label="New quote requests"
                                    checked={emailNotifs.newQuoteRequests}
                                    onCheckedChange={() => toggleEmail("newQuoteRequests")}
                                />
                                <CheckboxRow
                                    id="newShipments"
                                    label="New shipments created"
                                    checked={emailNotifs.newShipmentsCreated}
                                    onCheckedChange={() => toggleEmail("newShipmentsCreated")}
                                />
                                <CheckboxRow
                                    id="docUploads"
                                    label="Document uploads"
                                    checked={emailNotifs.documentUploads}
                                    onCheckedChange={() => toggleEmail("documentUploads")}
                                />
                                <CheckboxRow
                                    id="paymentConf"
                                    label="Payment confirmations"
                                    checked={emailNotifs.paymentConfirmations}
                                    onCheckedChange={() => toggleEmail("paymentConfirmations")}
                                />
                                <CheckboxRow
                                    id="supportTickets"
                                    label="New support tickets"
                                    checked={emailNotifs.newSupportTickets}
                                    onCheckedChange={() => toggleEmail("newSupportTickets")}
                                />
                            </div>

                            <Separator className="mb-5" />

                            {/* Browser Notifications group */}
                            <p className="text-sm font-bold text-[#111827] mb-2">Browser Notifications</p>
                            <div className="mb-6">
                                <CheckboxRow
                                    id="browserNotif"
                                    label="Enable browser notifications"
                                    checked={browserNotif}
                                    onCheckedChange={() => setBrowserNotif((p) => !p)}
                                />
                            </div>

                            <Button className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white">
                                Save Preference
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── System Preferences ── */}
                <TabsContent value="system">
                    <Card>
                        <CardContent className="p-6 space-y-5">
                            <SectionHeader icon={<Settings2 className="w-5 h-5" />} title="System Preferences" />

                            <div className="space-y-1.5">
                                <Label>Time Zone</Label>
                                <CustomSelect
                                    value={timezone}
                                    options={[
                                        "Pacific Time",
                                        "Mountain Time",
                                        "Central Time",
                                        "Eastern Time",
                                        "GMT",
                                        "WAT (West Africa Time)",
                                    ]}
                                    onChange={setTimezone}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label>Date Format</Label>
                                <CustomSelect
                                    value={dateFormat}
                                    options={["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]}
                                    onChange={setDateFormat}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label>Currency Display</Label>
                                <CustomSelect
                                    value={currency}
                                    options={["USD ($)", "GBP (£)", "EUR (€)", "NGN (₦)", "AED (د.إ)"]}
                                    onChange={setCurrency}
                                />
                            </div>

                            <Button className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white">
                                Save Preferences
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── API Management ── */}
                <TabsContent value="api">
                    <Card>
                        <CardContent className="p-6 space-y-5">
                            <SectionHeader icon={<KeyRound className="w-5 h-5" />} title="API Management" />

                            <p className="text-sm text-gray-500 -mt-2">
                                Manage API keys for external integrations and services
                            </p>

                            <div className="space-y-3">
                                <ApiKeyRow
                                    label="Production API Key"
                                    maskedKey="pk_live_••••••••••••••3f2a"
                                    onRegenerate={() => {}}
                                />
                                <ApiKeyRow
                                    label="Test API Key"
                                    maskedKey="pk_test_••••••••••••••7b9d"
                                    onRegenerate={() => {}}
                                />
                            </div>

                            <Button
                                className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white"
                                onClick={() => setShowCreateDialog(true)}
                            >
                                Create New API Key
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Step 1 – Create form */}
                    <CreateApiKeyDialog
                        open={showCreateDialog}
                        onClose={() => setShowCreateDialog(false)}
                        onGenerate={handleGenerate}
                    />

                    {/* Step 2 – Show generated key */}
                    <GeneratedKeyDialog
                        open={!!generatedKey}
                        apiKey={generatedKey ?? ""}
                        onClose={() => setGeneratedKey(null)}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}