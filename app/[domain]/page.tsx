"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, Star, MapPin, Instagram, Clock, ShieldCheck, Plus, Circle } from "lucide-react"
import { ServiceVideoCard } from "@/components/service-video-card"
import { cn } from "@/lib/utils"

// Mock Data for "The Shop"
const SHOP_DATA = {
    name: "Fade Master Elite",
    handle: "@fademaster_sf",
    rating: 4.9,
    reviews: 128,
    address: "123 Mission St, San Francisco",
    services: [
        {
            id: "s1",
            name: "Signature Fade",
            price: 65,
            duration: 45,
            videoUrl: ""
        },
        {
            id: "s2",
            name: "Beard Sculpt & Towel",
            price: 45,
            duration: 30,
            videoUrl: ""
        }
    ]
}

import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Mock Data for "The Shop"
// ...
export default function ShopPage() {
    const params = useParams()
    const router = useRouter()
    // In a real app, we fetch shop data based on params.domain
    const shopName = params.domain ? String(params.domain).replace(/-/g, ' ') : SHOP_DATA.name

    const [selectedServices, setSelectedServices] = React.useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleBooking = async () => {
        setIsSubmitting(true)

        // Calculate total price
        const totalPrice = selectedServices.reduce((acc, id) => {
            return acc + (SHOP_DATA.services.find(s => s.id === id)?.price || 0)
        }, 0)

        // 1. Create Booking
        // Note: In a real app, 'user_id' would be the Shop Owner's ID so it shows in their dash.
        // We will fallback to a hardcoded 'demo' ID or just 'guest' for now since we don't have the shop owner's UUID in the URL.
        const { error } = await supabase
            .from('bookings')
            .insert({
                user_id: 'guest_' + Math.random().toString(36).substr(2, 5),
                start_time: new Date().toISOString(), // "Now"
                end_time: new Date(Date.now() + 60 * 60000).toISOString(),
                status: 'confirmed',
                total_price: totalPrice,
                trustpay_status: 'hold_active'
            })

        if (error) {
            toast.error("Booking Failed", { description: error.message })
        } else {
            toast.success("Booking Request Sent!", { description: "The shop will confirm shortly." })
            // Reset selection
            setSelectedServices([])
        }
        setIsSubmitting(false)
    }

    const toggleService = (id: string) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    return (
        <div className="pb-32 md:pb-0">
            {/* 1. Shop Header (Mobile Friendly) */}
            <div className="relative h-48 bg-gradient-to-r from-zinc-900 to-zinc-800">
                {/* Banner/Cover Image would go here */}
                <div className="absolute -bottom-12 left-4 md:left-8 flex items-end gap-4">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                        <AvatarImage src="/avatar-placeholder.png" />
                        <AvatarFallback className="text-2xl bg-primary text-primary-foreground font-bold">FE</AvatarFallback>
                    </Avatar>
                    <div className="mb-2">
                        <h1 className="text-2xl font-bold text-background md:text-foreground capitalize mix-blend-difference">{shopName || "Elite Barber"}</h1>
                        <div className="flex items-center gap-1 text-sm text-yellow-500 bg-black/50 px-2 py-0.5 rounded-full w-fit">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="font-semibold">{SHOP_DATA.rating}</span>
                            <span className="text-muted-foreground ml-1">({SHOP_DATA.reviews})</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-4 mt-16 md:px-8 space-y-8 max-w-3xl mx-auto">

                {/* 2. Bio & Info */}
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" /> {SHOP_DATA.address}
                        </div>
                        <div className="flex items-center gap-1">
                            <Instagram className="h-4 w-4" /> {SHOP_DATA.handle}
                        </div>
                        <div className="flex items-center gap-1 text-green-500">
                            <Clock className="h-4 w-4" /> Open til 8:00 PM
                        </div>
                    </div>
                    <p className="text-muted-foreground">
                        San Francisco's premier grooming destination. Specialized in precision fades and straight razor shaves.
                        Complimentary beverage with every service.
                    </p>
                </div>

                {/* 3. Services Menu */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        Select Services
                        {selectedServices.length > 0 && <Badge>{selectedServices.length}</Badge>}
                    </h2>

                    <div className="grid gap-4">
                        {SHOP_DATA.services.map(service => (
                            <div
                                key={service.id}
                                className={cn(
                                    "group flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer hover:border-primary/50",
                                    selectedServices.includes(service.id) ? "border-primary bg-primary/5" : "bg-card"
                                )}
                                onClick={() => toggleService(service.id)}
                            >
                                <div className="flex gap-4 items-center">
                                    {/* Selection Radio/Check */}
                                    <div className={cn(
                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                        selectedServices.includes(service.id) ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
                                    )}>
                                        {selectedServices.includes(service.id) && <Check className="h-3 w-3" />}
                                    </div>

                                    <div>
                                        <h3 className="font-medium">{service.name}</h3>
                                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                                            <span>{service.duration} min</span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                                            <span>${service.price}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Optional Video Preview Icon */}
                                <div className="hidden md:block">
                                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        Preview
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Sticky Booking Footer */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur border-t transition-transform duration-300 z-50",
                selectedServices.length > 0 ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="container max-w-3xl mx-auto flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Estimate</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">
                                ${selectedServices.reduce((acc, id) => {
                                    const s = SHOP_DATA.services.find(s => s.id === id)
                                    return acc + (s?.price || 0)
                                }, 0)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                ({selectedServices.reduce((acc, id) => {
                                    const s = SHOP_DATA.services.find(s => s.id === id)
                                    return acc + (s?.duration || 0)
                                }, 0)} min)
                            </span>
                        </div>
                    </div>
                    <Button
                        size="lg"
                        className="rounded-full px-8 shadow-lg shadow-primary/20"
                        onClick={handleBooking}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Book Now"} <ShieldCheck className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
