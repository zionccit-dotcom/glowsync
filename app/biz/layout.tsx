"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    MessageSquare,
    Settings,
    Sparkles,
    LogOut
} from "lucide-react"

const sidebarItems = [
    { name: "Overview", href: "/biz", icon: LayoutDashboard },
    { name: "Calendar", href: "/biz/calendar", icon: CalendarDays },
    { name: "Clients", href: "/biz/clients", icon: Users },
    { name: "Marketing", href: "/biz/marketing", icon: MessageSquare },
    { name: "Settings", href: "/biz/settings", icon: Settings },
]

export default function BizLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen bg-muted/10">
            {/* Sidebar - Hidden on mobile for now, simple implementation */}
            <aside className="hidden w-64 border-r bg-card md:flex flex-col">
                <div className="flex h-16 items-center px-6 border-b">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                        <div className="bg-primary/20 p-1.5 rounded-lg">
                            <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                        GlowSync Biz
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                                pathname === item.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Mobile Header Placeholder */}
                <header className="flex h-16 items-center border-b bg-card px-6 md:hidden">
                    <span className="font-bold">GlowSync Biz</span>
                </header>

                <div className="flex-1 p-6 md:p-8 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
