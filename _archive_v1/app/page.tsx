"use client"

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { CalendarDays, Users, ShieldCheck, Sparkles, ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden h-[600px] md:h-[700px]">
            <Image
              src="/hero.png"
              alt="Luxury Salon Interior"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 md:bg-gradient-to-r md:from-background md:via-background/70 md:to-transparent" />
          </div>

          <div className="container relative z-10 px-4 pt-32 pb-12 md:pt-48 md:pb-32">
            <div className="max-w-[700px] space-y-6 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Your Time. Your Glow. <br />
                <span className="text-primary">Done Right.</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                The premium booking experience for beauty professionals.
                <br className="hidden md:inline" /> No hidden fees, no awkward gaps, just pure business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="h-12 px-8 text-base" asChild>
                  <a href="/book">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background/50 backdrop-blur" onClick={() => toast("Demo Video Coming Soon!", { description: "We are currently filming our production quality demo." })}>
                  <PlayCircle className="mr-2 h-4 w-4" /> Demo Video
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container px-4 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Professionals Choose GlowSync</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">We solved the biggest headaches in the industry so you can focus on your craft.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow hover:shadow-lg transition-all">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image src="/haircut.png" alt="Squad Booking" fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-4 left-4 p-3 bg-primary/20 backdrop-blur rounded-full">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Squad Booking</h3>
                <p className="text-muted-foreground">
                  Book for yourself, your kids, and your friends in a single checkout.
                  Finally, a system that understands real life.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow hover:shadow-lg transition-all">
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* Using skincare image purely for aesthetic variance */}
                <Image src="/skincare.png" alt="TrustPay Protection" fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-4 left-4 p-3 bg-primary/20 backdrop-blur rounded-full">
                  <ShieldCheck className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">TrustPay Protection</h3>
                <p className="text-muted-foreground">
                  Eliminate no-shows with real card holds.
                  Guaranteed payouts if they ghost you, without the awkward conversations.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow hover:shadow-lg transition-all">
              {/* Fallback pattern for 3rd card since we generated 3 images (using hero cut for variety or just pattern) */}
              <div className="aspect-[4/3] relative bg-muted flex items-center justify-center">
                <CalendarDays className="h-20 w-20 text-muted-foreground/20" />
                <div className="absolute top-4 left-4 p-3 bg-primary/20 backdrop-blur rounded-full">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Smart Gap Filler</h3>
                <p className="text-muted-foreground">
                  Our AI optimizes your schedule to prevent 15-minute dead zones.
                  Maximize your revenue per hour automatically.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 md:py-12 bg-muted/20">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 GlowSync Beauty. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
