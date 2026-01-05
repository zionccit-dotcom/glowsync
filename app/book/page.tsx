"use client"

import * as React from "react"
import { Users, Plus, Trash2, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
// Import the new viral card
import { ServiceVideoCard } from "@/components/service-video-card"

// Mock Data with Video Placeholders
const SERVICES = [
    {
        id: "s1",
        name: "Classic Fade",
        price: 45,
        duration: 45,
        // Using a reliable placeholder video service or local asset would be better, using empty for gray gradient fallback
        videoUrl: "https://videos.pexels.com/video-files/3998399/3998399-uhd_2560_1440_25fps.mp4"
    },
    {
        id: "s2",
        name: "Beard Sculpting",
        price: 25,
        duration: 20,
        videoUrl: "" // Will show placeholder gradient
    },
    {
        id: "s3",
        name: "Hot Towel Shave",
        price: 35,
        duration: 30,
        videoUrl: ""
    },
    {
        id: "s4",
        name: "Kids Cut",
        price: 30,
        duration: 30,
        videoUrl: ""
    },
]

type SquadMember = {
    id: string
    name: string
    serviceId: string
}

export default function BookingPage() {
    const [squad, setSquad] = React.useState<SquadMember[]>([
        { id: "me", name: "Me (Primary)", serviceId: "" }
    ])

    const [step, setStep] = React.useState(1)

    const addMember = () => {
        setSquad(prev => [
            ...prev,
            { id: Math.random().toString(), name: "", serviceId: "" }
        ])
    }

    const removeMember = (id: string) => {
        setSquad(prev => prev.filter(m => m.id !== id))
    }

    const updateMember = (id: string, field: keyof SquadMember, value: string) => {
        setSquad(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))
    }

    const calculateTotal = () => {
        return squad.reduce((total, member) => {
            const service = SERVICES.find(s => s.id === member.serviceId)
            return total + (service?.price || 0)
        }, 0)
    }

    const calculateTotalDuration = () => {
        return squad.reduce((total, member) => {
            const service = SERVICES.find(s => s.id === member.serviceId)
            return total + (service?.duration || 0)
        }, 0)
    }

    return (
        <div className="container max-w-4xl mx-auto py-10 px-4">
            <div className="mb-8 space-y-2 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight">Book Appointment</h1>
                <p className="text-muted-foreground">Select premium services for you and your squad.</p>
            </div>

            {step === 1 && (
                <div className="space-y-8">
                    {squad.map((member, index) => (
                        <div key={member.id} className="space-y-4">
                            {/* Header for Member */}
                            <div className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center gap-2 font-semibold text-lg">
                                    {index === 0 ? <Users className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                                    {index === 0 ? "You (Primary Client)" : `Squad Member #${index}`}
                                </div>
                                {index !== 0 && (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            placeholder="Guest Name"
                                            value={member.name}
                                            onChange={(e) => updateMember(member.id, "name", e.target.value)}
                                            className="w-40 h-8"
                                        />
                                        <Button variant="ghost" size="icon" onClick={() => removeMember(member.id)} className="text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Video Service Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {SERVICES.map(service => (
                                    <ServiceVideoCard
                                        key={service.id}
                                        {...service}
                                        isSelected={member.serviceId === service.id}
                                        onSelect={() => updateMember(member.id, "serviceId", service.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Add Squad Button */}
                    <Button variant="outline" className="w-full border-dashed py-8 hover:bg-muted/50" onClick={addMember}>
                        <Plus className="mr-2 h-5 w-5" /> Add Another Person (Friend, Kid, etc.)
                    </Button>

                    {/* Sticky Footer */}
                    <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-background/95 backdrop-blur z-20 md:relative md:border-t-0 md:bg-transparent md:p-0 md:mt-8">
                        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Total Estimate</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold">${calculateTotal()}</span>
                                    <span className="text-sm text-muted-foreground">/ {calculateTotalDuration()} mins</span>
                                </div>
                            </div>
                            <Button size="lg" className="rounded-full px-8" onClick={() => setStep(2)} disabled={squad.some(m => !m.serviceId)}>
                                Select Time <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="h-24 md:hidden" /> {/* Spacer for sticky footer */}
                </div>
            )}

            {step === 2 && (
                <Card className="border-primary/20 shadow-lg max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                            Secure Booking
                        </CardTitle>
                        <CardDescription>Review details and add payment protection.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Booking Summary */}
                        <div className="rounded-lg bg-muted/50 p-4 space-y-3 border">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Today, 4:00 PM
                            </h4>
                            <div className="space-y-2">
                                {squad.map((member, i) => {
                                    const service = SERVICES.find(s => s.id === member.serviceId)
                                    return (
                                        <div key={member.id} className="flex justify-between items-center text-sm">
                                            <div>
                                                <span className="font-medium text-foreground">{member.id === 'me' ? "You" : member.name || "Guest"}</span>
                                                <span className="text-muted-foreground"> - {service?.name}</span>
                                            </div>
                                            <span className="font-medium">${service?.price}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="border-t pt-2 flex justify-between items-center font-bold">
                                <span>Total Due</span>
                                <span>${calculateTotal()}</span>
                            </div>
                        </div>

                        {/* TrustPay Section */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    TrustPay <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Secure Info</span>
                                </h3>
                                <div className="flex gap-1">
                                    <div className="h-4 w-6 bg-muted rounded decoration-clone"></div>
                                    <div className="h-4 w-6 bg-muted rounded decoration-clone"></div>
                                    <div className="h-4 w-6 bg-muted rounded decoration-clone"></div>
                                </div>
                            </div>

                            <div className="rounded-md border p-4 bg-background space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/5 rounded-full mt-1">
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium text-sm">No-Show Protection</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Your card is <strong>not charged now</strong>. A temporary hold may be placed 24 hours before your appointment. You only pay if you fail to show up or cancel late.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="card">Card Number</Label>
                                        <div className="relative">
                                            <Input id="card" placeholder="0000 0000 0000 0000" className="pl-10" />
                                            <div className="absolute left-3 top-2.5 text-muted-foreground">
                                                <ShieldCheck className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="expiry">Expiry</Label>
                                            <Input id="expiry" placeholder="MM/YY" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="cvc">CVC</Label>
                                            <Input id="cvc" placeholder="123" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Cardholder Name</Label>
                                        <Input id="name" placeholder="Name on card" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                        <Button className="flex-1" onClick={() => alert("Booking Confirmed & Protected with TrustPay!")}>
                            Confirm Reservation
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}
