"use client"
import * as React from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarCheck, DollarSign, TrendingUp, UserPlus, Clock, MoreHorizontal } from "lucide-react"

export default function DashboardPage() {
    const [revenue, setRevenue] = React.useState(0)
    const [bookingCount, setBookingCount] = React.useState(0)

    React.useEffect(() => {
        const fetchStats = async () => {
            const { data } = await supabase.from('bookings').select('total_price')
            if (data) {
                setBookingCount(data.length)
                setRevenue(data.reduce((sum, b) => sum + (b.total_price || 0), 0))
            }
        }
        fetchStats()

        // Real-time Subscription
        const channel = supabase
            .channel('dashboard_updates')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, (payload) => {
                // Optimistic update or just re-fetch
                const newBooking = payload.new as any
                setRevenue(prev => prev + (newBooking.total_price || 0))
                setBookingCount(prev => prev + 1)
            })
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Morning, Alex</h1>
                    <p className="text-muted-foreground">Here's what's happening in your shop today.</p>
                </div>
                <Button>
                    <CalendarCheck className="mr-2 h-4 w-4" /> New Appointment
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${revenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+15% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                        <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{bookingCount}</div>
                        <p className="text-xs text-muted-foreground">3 pending requests</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Smart Fill</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">Gaps filled by AI</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Clients</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+5</div>
                        <p className="text-xs text-muted-foreground">Since Monday</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Today's Schedule */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Today's Schedule</CardTitle>
                        <CardDescription>You are 85% booked for today.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Time Slot */}
                            <div className="flex items-center border-l-4 border-primary pl-4 py-2 hover:bg-muted/50 rounded-r-md transition-colors">
                                <div className="w-16 font-mono text-sm text-muted-foreground">10:00 AM</div>
                                <div className="flex-1 ml-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Michael B.</span>
                                        <Badge variant="secondary" className="text-[10px]">Client</Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground">Fade + Beard Trim</div>
                                </div>
                                <div className="text-sm font-bold">$65.00</div>
                                <Button variant="ghost" size="icon" className="ml-2"><MoreHorizontal className="h-4 w-4" /></Button>
                            </div>

                            {/* Time Slot - Gap */}
                            <div className="flex items-center border-l-4 border-transparent pl-4 py-2 bg-muted/20 border-dashed rounded-r-md">
                                <div className="w-16 font-mono text-sm text-muted-foreground opacity-50">11:00 AM</div>
                                <div className="flex-1 ml-4 flex items-center gap-2 text-muted-foreground italic text-sm">
                                    <Clock className="h-4 w-4" /> 45 min gap
                                </div>
                                <Button size="sm" variant="outline" className="h-7 text-xs">Auto-Fill Waitlist</Button>
                            </div>

                            {/* Time Slot */}
                            <div className="flex items-center border-l-4 border-primary pl-4 py-2 hover:bg-muted/50 rounded-r-md transition-colors">
                                <div className="w-16 font-mono text-sm text-muted-foreground">12:00 PM</div>
                                <div className="flex-1 ml-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Sarah J.</span>
                                        <Badge className="bg-green-500/15 text-green-500 hover:bg-green-500/25 border-0 text-[10px]">TrustPay™ Secured</Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground">Full Color Service</div>
                                </div>
                                <div className="text-sm font-bold">$120.00</div>
                                <Button variant="ghost" size="icon" className="ml-2"><MoreHorizontal className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Marketing / Notifications */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Live updates from your shop.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4 items-start">
                            <span className="relative flex h-2 w-2 top-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">New TrustPay Deposit</p>
                                <p className="text-xs text-muted-foreground">Received $25.00 deposit from <span className="text-foreground">Emily R.</span> for tomorrow.</p>
                            </div>
                            <div className="ml-auto text-xs text-muted-foreground">2m ago</div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <span className="flex h-2 w-2 bg-muted rounded-full top-2 relative" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Review Posted on Google</p>
                                <p className="text-xs text-muted-foreground">David L. left 5 stars: "Best cut in the city!"</p>
                            </div>
                            <div className="ml-auto text-xs text-muted-foreground">1h ago</div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <span className="flex h-2 w-2 bg-muted rounded-full top-2 relative" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Smart Gap Filler Active</p>
                                <p className="text-xs text-muted-foreground">Sent 5 SMS offers to fill the 2 PM slot.</p>
                            </div>
                            <div className="ml-auto text-xs text-muted-foreground">3h ago</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
