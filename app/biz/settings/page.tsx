"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, CreditCard, Building, Lock } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight">Shop Settings</h1>

            <div className="grid gap-6">
                {/* Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Public Profile</CardTitle>
                        <CardDescription>How your shop appears on the booking page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="/avatar-placeholder.png" />
                                    <AvatarFallback>FE</AvatarFallback>
                                </Avatar>
                                <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                                    <Camera className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="space-y-1">
                                <Label>Shop Banner Image</Label>
                                <p className="text-xs text-muted-foreground">Recommended 1200x400px</p>
                                <Button variant="outline" size="sm">Upload Cover</Button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Shop Name</Label>
                                <Input defaultValue="Fade Master Elite" />
                            </div>
                            <div className="space-y-2">
                                <Label>Custom URL Slug</Label>
                                <div className="flex">
                                    <span className="flex items-center px-3 border rounded-l-md bg-muted text-muted-foreground text-sm">glowsync.com/</span>
                                    <Input className="rounded-l-none" defaultValue="fade-master" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* TrustPay Settings */}
                <Card className="border-green-500/20">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-green-500" />
                                <CardTitle>TrustPay™ & Payouts</CardTitle>
                            </div>
                            <Button variant="outline" className="text-green-500 border-green-500/50 hover:bg-green-500/10">Stripe Connected</Button>
                        </div>
                        <CardDescription>Manage your deposit rules and bank account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="p-4 border rounded-lg bg-muted/20">
                                <p className="text-sm font-medium">Available Balance</p>
                                <p className="text-2xl font-bold">$450.00</p>
                            </div>
                            <div className="p-4 border rounded-lg bg-muted/20">
                                <p className="text-sm font-medium">Next Payout</p>
                                <p className="text-2xl font-bold">Today</p>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <Label>Cancellation Policy</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                <option>Strict (Charge 50% for late cancel)</option>
                                <option>Moderate (Charge 25%)</option>
                                <option>Flexible (No charge)</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
