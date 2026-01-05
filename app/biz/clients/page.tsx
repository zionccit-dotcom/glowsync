"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ShieldCheck, Mail, Phone, MoreHorizontal } from "lucide-react"

const MOCK_CLIENTS = [
    { id: 1, name: "Michael B.", email: "mike@example.com", visits: 12, trustScore: 98, lastVisit: "2 days ago", status: "VIP" },
    { id: 2, name: "Sarah J.", email: "sarah@example.com", visits: 3, trustScore: 100, lastVisit: "1 week ago", status: "Active" },
    { id: 3, name: "Davil L.", email: "david@example.com", visits: 1, trustScore: 50, lastVisit: "1 month ago", status: "New" },
    { id: 4, name: "Jessica R.", email: "jess@example.com", visits: 0, trustScore: 20, lastVisit: "No-Show", status: "Blocked" },
]

export default function ClientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Client List</h1>
                    <p className="text-muted-foreground">Manage relationships and view TrustPay history.</p>
                </div>
                <Button>
                    Add Client
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Clients</CardTitle>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input placeholder="Search name or email..." />
                            <Button size="icon" variant="ghost"><Search className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {MOCK_CLIENTS.map(client => (
                            <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/40 transition-colors">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarFallback>{client.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{client.name}</p>
                                        <p className="text-sm text-muted-foreground">{client.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 text-sm">
                                    <div className="text-center">
                                        <p className="font-bold">{client.visits}</p>
                                        <p className="text-muted-foreground text-xs">Visits</p>
                                    </div>
                                    <div className="hidden md:block w-32">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Trust Score</span>
                                            <span className={client.trustScore < 60 ? "text-destructive" : "text-green-500"}>{client.trustScore}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${client.trustScore}%` }} />
                                        </div>
                                    </div>
                                    <Badge variant={client.status === 'Blocked' ? 'destructive' : 'outline'}>{client.status}</Badge>
                                </div>

                                <div className="flex gap-2">
                                    <Button size="icon" variant="ghost"><Mail className="h-4 w-4" /></Button>
                                    <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
