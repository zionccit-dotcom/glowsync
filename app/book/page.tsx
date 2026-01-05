"use client"

import * as React from "react"
import { Users, Plus, Trash2, Calendar, Clock, CheckCircle2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Mock Data
const SERVICES = [
    { id: "s1", name: "Classic Haircut", price: 45, duration: 45 },
    { id: "s2", name: "Beard Trim", price: 25, duration: 20 },
    { id: "s3", name: "Full Shave", price: 35, duration: 30 },
    { id: "s4", name: "Kids Cut", price: 30, duration: 30 },
]

type SquadMember = {
    id: string
    name: string
    serviceId: string
}

export default function BookingPage() {
    const [squad, setSquad] = React.useState<SquadMember[]>([
        { id: "me", name: "Me (Primary)", serviceId: "s1" }
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
        // Basic logic: simplified as sequential for now, could be parallel in real app
        return squad.reduce((total, member) => {
            const service = SERVICES.find(s => s.id === member.serviceId)
            return total + (service?.duration || 0)
        }, 0)
    }

    return (
        <div className="container max-w-2xl mx-auto py-10 px-4">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Book Appointment</h1>
                <p className="text-muted-foreground">Select services for you and your squad.</p>
            </div>

            {step === 1 && (
                <div className="space-y-6">
                    {squad.map((member, index) => (
                        <Card key={member.id} className="relative overflow-hidden">
                            {index !== 0 && (
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                            )}
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        {index === 0 ? <Users className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                        {index === 0 ? "You" : `Squad Member #${index}`}
                                    </CardTitle>
                                    {index !== 0 && (
                                        <Button variant="ghost" size="icon" onClick={() => removeMember(member.id)} className="text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {index !== 0 && (
                                    <Input
                                        placeholder="Guest Name (e.g. Mike)"
                                        value={member.name}
                                        onChange={(e) => updateMember(member.id, "name", e.target.value)}
                                    />
                                )}

                                <div className="grid grid-cols-2 gap-2">
                                    {SERVICES.map(service => (
                                        <div
                                            key={service.id}
                                            onClick={() => updateMember(member.id, "serviceId", service.id)}
                                            className={cn(
                                                "cursor-pointer rounded-lg border p-3 transition-all hover:bg-muted",
                                                member.serviceId === service.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card"
                                            )}
                                        >
                                            <div className="font-medium text-sm">{service.name}</div>
                                            <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                                                <span>${service.price}</span>
                                                <span>{service.duration}m</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <Button variant="outline" className="w-full border-dashed py-6" onClick={addMember}>
                        <Plus className="mr-2 h-4 w-4" /> Add Another Person to Booking
                    </Button>

                    <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-background/95 backdrop-blur z-10 md:relative md:border-t-0 md:bg-transparent md:p-0">
                        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total ESTIMATE</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold">${calculateTotal()}</span>
                                    <span className="text-sm text-muted-foreground">/ {calculateTotalDuration()} mins</span>
                                </div>
                            </div>
                            <Button size="lg" onClick={() => setStep(2)} disabled={squad.some(m => !m.serviceId)}>
                                Select Time <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <Card className="border-primary/20 shadow-lg">
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
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

function ArrowRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
