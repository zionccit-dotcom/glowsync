"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const navItems = [
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/#pricing" },
        { name: "About", href: "/#about" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4 md:px-8">
                <div className="hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Sparkles className="h-5 w-5" />
                        <span className="hidden font-bold sm:inline-block">GlowSync</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile Logo */}
                <Link href="/" className="flex items-center space-x-2 md:hidden">
                    <Sparkles className="h-5 w-5" />
                    <span className="font-bold">GlowSync</span>
                </Link>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <div className="hidden md:flex">
                        <Button size="sm" asChild>
                            <Link href="/book">Get Started</Link>
                        </Button>
                    </div>
                    {/* Mobile Menu Button */}
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden border-t p-4 bg-background">
                    <nav className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-foreground/70 hover:text-foreground"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button size="sm" asChild className="w-full">
                            <Link href="/book">Get Started</Link>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}
