"use client"

import * as React from "react"
import { format, startOfWeek, addDays, isSameDay, parseISO, getHours } from "date-fns"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = React.useState(new Date())
    const [bookings, setBookings] = React.useState<any[]>([])

    React.useEffect(() => {
        const fetchBookings = async () => {
            const { data } = await supabase
                .from('bookings')
                .select('*')
            // Ideally filter by date range, but fetching all for MVP
            if (data) setBookings(data)
        }
        fetchBookings()
    }, [currentDate])

    const startDate = startOfWeek(currentDate)
    const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i))

    // Hours 9 AM to 8 PM
    const hours = [...Array(12)].map((_, i) => i + 9)

    const getBookingsForSlot = (day: Date, hour: number) => {
        return bookings.filter(b => {
            const bookingDate = parseISO(b.start_time)
            return isSameDay(bookingDate, day) && getHours(bookingDate) === hour
        })
    }

    return (
        <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setCurrentDate(addDays(currentDate, -7))}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="font-mono text-sm w-32 text-center border p-2 rounded">
                        {format(startDate, "MMM d")} - {format(addDays(startDate, 6), "MMM d")}
                    </div>
                    <Button variant="outline" size="icon" onClick={() => setCurrentDate(addDays(currentDate, 7))}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
                <div className="grid grid-cols-8 border-b bg-muted/40 text-sm font-medium">
                    <div className="p-4 border-r text-center text-muted-foreground">Time</div>
                    {weekDays.map(day => (
                        <div key={day.toString()} className={cn(
                            "p-4 border-r text-center",
                            isSameDay(day, new Date()) ? "text-primary font-bold bg-primary/5" : ""
                        )}>
                            <div className="text-xs text-muted-foreground">{format(day, "EEE")}</div>
                            <div className="text-lg">{format(day, "d")}</div>
                        </div>
                    ))}
                </div>

                <div className="flex-1 overflow-auto">
                    {hours.map(hour => (
                        <div key={hour} className="grid grid-cols-8 h-24 border-b relative group">
                            {/* Time Label */}
                            <div className="border-r p-2 text-xs text-muted-foreground text-center relative -top-3">
                                {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                            </div>

                            {/* Days */}
                            {weekDays.map(day => {
                                const slotBookings = getBookingsForSlot(day, hour)
                                return (
                                    <div key={day.toString()} className="border-r relative p-1 transition-colors hover:bg-muted/30">
                                        {/* Render Bookings */}
                                        {slotBookings.map(booking => (
                                            <div key={booking.id} className="bg-primary text-primary-foreground text-xs p-1 rounded mb-1 overflow-hidden h-full shadow-sm">
                                                <div className="font-bold truncate">{booking.user_id.replace('guest_', '')}</div>
                                                <div className="text-[10px] opacity-80">${booking.total_price}</div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
