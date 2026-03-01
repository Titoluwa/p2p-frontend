'use client'

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";

export default function AccountSettings() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState({
        email: false,
        sms: false,
        marketing: false,
    });

    const toggle = (key: keyof typeof notifications) =>
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="space-y-6 lg:space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-1">Account Settings</h1>
                <p className="text-gray-600 text-sm sm:text-base">
                    Manage your account information and preferences
                </p>
            </div>

            <Tabs defaultValue="profile">
                <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 mb-6">
                    <TabsTrigger value="profile"
                        className="rounded-none border-b-[3px] border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:shadow-none data-[state=active]:bg-transparent px-4 py-2.5 text-md text-[#6B7280] data-[state=active]:text-[#111827] data-[state=active]:font-semibold"
                    >
                        Profile Information
                    </TabsTrigger>
                    <TabsTrigger value="security"
                        className="rounded-none border-b-[3px] border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:shadow-none data-[state=active]:bg-transparent px-4 py-2.5 text-md text-[#6B7280] data-[state=active]:text-[#111827] data-[state=active]:font-semibold"
                    >
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications"
                        className="rounded-none border-b-[3px] border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:shadow-none data-[state=active]:bg-transparent px-4 py-2.5 text-md text-[#6B7280] data-[state=active]:text-{#111827} data-[state=active]:font-semibold"
                    >
                        Notifications
                    </TabsTrigger>
                </TabsList>

                {/* ── Profile ── */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Profile Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {/* Avatar */}
                            <div className="relative inline-block mb-6">
                                <Avatar className="w-40 h-40">
                                    <AvatarFallback className="bg-gray-200 text-gray-400 text-2xl font-medium">
                                        {user?.firstName.slice(0, 1).toUpperCase()}{user?.lastName.slice(0, 1).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-800 whitespace-nowrap border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <Camera className="w-4 h-4" /> Add photo
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-3">
                                <div className="space-y-1.5">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue={user?.firstName} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue={user?.lastName} />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue={user?.email} />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" defaultValue={user?.phone} />
                            </div>

                            <Button className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white">
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── Security ── */}
                <TabsContent value="security">
                    <Card className="space-y-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Security</CardTitle>
                            <CardDescription>
                                Change your password to keep your account secure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="currentPwd">Current Password</Label>
                                <Input id="currentPwd" type="password" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="newPwd">New Password</Label>
                                <Input id="newPwd" type="password" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="confirmPwd">Confirm New Password</Label>
                                <Input id="confirmPwd" type="password" />
                            </div>
                            <div className="pt-5">
                                <Button className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white">
                                    Change Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── Notifications ── */}
                <TabsContent value="notifications">
                    <Card className="space-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg">Notification Preferences</CardTitle>
                            <CardDescription>Choose how you want to receive updates</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-6">
                            {([
                                { key: "email" as const, label: "Email Updates", desc: "Receive shipment status updates via email" },
                                { key: "sms" as const, label: "SMS Updates", desc: "Receive important notifications via SMS" },
                                { key: "marketing" as const, label: "Marketing Emails", desc: "Receive news and promotional offers" },
                            ]).map((item, i, arr) => (
                                <div key={item.key}>
                                    <div className="flex items-center justify-between py-6">
                                        <div>
                                            <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                        <Switch
                                            checked={notifications[item.key]}
                                            onCheckedChange={() => toggle(item.key)}
                                        />
                                    </div>
                                    {i < arr.length - 1 && <Separator />}
                                </div>
                            ))}
                            <div className="pt-10">
                                <Button className="bg-[#2563EB] hover:bg-[#2563EB]/80 text-white">
                                    Save Preferences
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}