"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, CalendarCheck, Clock, MoreHorizontal, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import * as React from "react"

export default function DashboardPage() {
    const [stats, setStats] = React.useState({
        revenue: 0,
        bookings: 0,
        activeClients: 0
    })
    const [recentBookings, setRecentBookings] = React.useState<any[]>([])

    React.useEffect(() => {
        async function loadDashboard() {
            // Fetch Bookings
            const { data: bookings } = await supabase
                .from('bookings')
                .select(`
                    *,
                    booking_items (
                        guest_name,
                        price_at_booking
                    )
                `)
                .order('created_at', { ascending: false })
                .limit(10)

            if (bookings) {
                const totalRev = bookings.reduce((sum, b) => sum + (b.total_price || 0), 0)
                setStats({
                    revenue: totalRev,
                    bookings: bookings.length,
                    activeClients: new Set(bookings.map(b => b.user_id)).size
                })
                setRecentBookings(bookings)
            }
        }
        loadDashboard()
    }, [])

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
                        <div className="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                        <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.bookings}</div>
                        <p className="text-xs text-muted-foreground">+180% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeClients}</div>
                        <p className="text-xs text-muted-foreground">unique guests in last 10 bookings</p>
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
                        <CardDescription>Live feed from TrustPay Secure Server.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentBookings.length === 0 && <div className="text-muted-foreground">No bookings found. Try booking a squad!</div>}

                            {recentBookings.map((booking) => (
                                <div key={booking.id} className="flex items-start">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>G</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1 w-full">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium leading-none">Guest {booking.user_id.substring(0, 6)}</p>
                                            {booking.trustpay_status === 'hold_active' && (
                                                <Badge variant="success" className="gap-1"><Shield className="h-3 w-3" /> TrustPay Secured</Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(booking.start_time).toLocaleDateString()} at {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>

                                        {/* Squad Members Detail */}
                                        {booking.booking_items && booking.booking_items.length > 0 && (
                                            <div className="mt-2 rounded-md bg-muted/50 p-3 text-sm space-y-2">
                                                {booking.booking_items.map((item: any, idx: number) => (
                                                    <div key={idx} className="flex justify-between">
                                                        <span>{item.guest_name}</span>
                                                        <span className="text-muted-foreground">${item.price_at_booking}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-auto font-medium pl-4">+${booking.total_price}</div>
                                </div>
                            ))}


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
