"use client"

import { Calendar, Home, Users, Settings, Bell, Menu, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { toast } from "sonner"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-muted/40">
            {/* Sidebar - Desktop */}
            <aside className="hidden w-64 border-r bg-background md:block">
                <div className="flex h-14 items-center border-b px-6 font-bold text-lg">
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    GlowSync Biz
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <Button variant="secondary" className="justify-start">
                        <Home className="mr-2 h-4 w-4" />
                        Overview
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => toast.info("Calendar View", { description: "Syncing with Google Calendar..." })}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Calendar
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => toast.info("Client Database", { description: "Loading 573 active client profiles." })}>
                        <Users className="mr-2 h-4 w-4" />
                        Clients
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => toast.info("Settings", { description: "Global configuration panel." })}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex-1 font-semibold md:hidden">GlowSync</div>
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <ModeToggle />
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            MK
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
