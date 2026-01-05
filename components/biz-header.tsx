"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function BizHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <span>GlowSync <span className="text-muted-foreground font-normal">Biz</span></span>
                </Link>

                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
                    <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
                    <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                    <Link href="/demo-client" className="hover:text-foreground transition-colors text-primary">View Client Demo</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-sm font-medium hover:underline hidden sm:block">Log in</Link>
                    <Button>Get Started Free</Button>
                </div>
            </div>
        </header>
    )
}
