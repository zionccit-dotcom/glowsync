"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Zap, MessageSquare, Send, Gift, Calendar } from "lucide-react"

export default function MarketingPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Smart Marketing</h1>
                    <p className="text-muted-foreground">Automated tools to keep your chair full.</p>
                </div>
            </div>

            {/* AI Gap Filler - The Killer Feature */}
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary rounded-md">
                            <Zap className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <CardTitle>Ai Gap Filler</CardTitle>
                            <CardDescription>Automatically fill empty slots in your schedule.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                        <div className="space-y-1">
                            <Label className="text-base">Auto-Blast Standby List</Label>
                            <p className="text-sm text-muted-foreground">
                                When a cancellation happens within 24h, text top 10 clients who usually book that day.
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                        <div className="space-y-1">
                            <Label className="text-base">Discounted Last-Minute Slots</Label>
                            <p className="text-sm text-muted-foreground">
                                Offer 10% off for appointments booked strictly to fill a 1-hour gap.
                            </p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Blast Message */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" /> SMS Blast
                        </CardTitle>
                        <CardDescription>Send a manual update to all clients.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Message</Label>
                            <textarea className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]" placeholder="Hey everyone! I have 2 slots open this Friday..." />
                        </div>
                        <Button className="w-full">
                            <Send className="mr-2 h-4 w-4" /> Send to 148 Clients
                        </Button>
                    </CardContent>
                </Card>

                {/* Automation Rules */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" /> Automations
                        </CardTitle>
                        <CardDescription>Set it and forget it.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-pink-500/10 rounded flex items-center justify-center text-pink-500">
                                    <Gift className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium">Birthday Offer</p>
                                    <p className="text-xs text-muted-foreground">Send $5 off coupon on birthday</p>
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-blue-500/10 rounded flex items-center justify-center text-blue-500">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium">"We Miss You"</p>
                                    <p className="text-xs text-muted-foreground">Text clients unseen for 6 weeks</p>
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
