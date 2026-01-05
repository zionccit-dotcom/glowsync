"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, CalendarCheck, Clock, MoreHorizontal, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$2,350.00</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                        <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12</div>
                        <p className="text-xs text-muted-foreground">+180% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">+201 since last hour</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">No-Shows Blocked</CardTitle>
                        <Shield className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">Saved approx. $180</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Recent Bookings Feed */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                        <CardDescription>You have 3 new "Squad Bookings" today.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">

                            {/* Squad Booking Item */}
                            <div className="flex items-start">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1 w-full">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium leading-none">John Doe & Squad (3)</p>
                                        <Badge variant="success" className="gap-1"><Shield className="h-3 w-3" /> TrustPay Secured</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Today, 2:00 PM - 3:30 PM (90m)</p>

                                    {/* Squad Members Detail */}
                                    <div className="mt-2 rounded-md bg-muted/50 p-3 text-sm space-y-2">
                                        <div className="flex justify-between">
                                            <span>John (Primary)</span>
                                            <span className="text-muted-foreground">Haircut ($45)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Mike (Guest)</span>
                                            <span className="text-muted-foreground">Beard Trim ($25)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Sam (Guest)</span>
                                            <span className="text-muted-foreground">Haircut ($45)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto font-medium pl-4">+$115.00</div>
                            </div>

                            {/* Single Booking Item */}
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Sarah Miller</p>
                                    <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                                </div>
                                <div className="ml-auto font-medium">+$65.00</div>
                            </div>

                            {/* Single Booking Item */}
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>WK</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">William Kim</p>
                                    <p className="text-sm text-muted-foreground">Tomorrow, 11:00 AM</p>
                                </div>
                                <div className="ml-auto font-medium">+$35.00</div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* Schedule / Gap Optimizer */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Schedule Optimization</CardTitle>
                        <CardDescription>
                            Smart Gap Filler is active.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="rounded-lg border p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span className="font-medium text-sm">Gap Filled!</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    System automatically offered a 15% discount for the 1:15 PM slot to fill a gap.
                                    <strong> Booked by Alex T.</strong>
                                </p>
                            </div>

                            <div className="rounded-lg border border-dashed p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                    <span className="font-medium text-sm">Potential Gap</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    You have a 45m gap tomorrow at 2:15 PM.
                                </p>
                                <Button size="sm" variant="secondary" className="w-full" onClick={() => toast.success("Promo Sent!", { description: "We sent a -15% offer to 50 local clients likely to book this slot." })}>
                                    Auto-Fill with Promo
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
