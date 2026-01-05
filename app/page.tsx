import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { CalendarDays, Users, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="h-5 w-5" />
            <span>GlowSync</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#pricing" className="hover:underline">Pricing</a>
            <a href="#about" className="hover:underline">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button size="sm" asChild>
              <a href="/book">Get Started</a>
            </Button>
          </div>

        </div>
      </header>

      <main className="flex-1">
        <section className="container px-4 text-center pt-24 pb-12 md:pt-32 md:pb-20">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            Your Time. Your Glow. <br className="hidden sm:inline" />
            <span className="text-muted-foreground">Done Right.</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground mb-8">
            The modern booking experience for beauty professionals.
            No hidden fees, no awkward gaps, just pure business growth.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="h-12 px-8">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Button>
            <Button size="lg" variant="outline" className="h-12 px-8">Demo Video</Button>
          </div>
        </section>

        <section id="features" className="container px-4 py-16 md:py-24 bg-muted/50 rounded-3xl my-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Squad Booking</h3>
              <p className="text-muted-foreground">
                Book for yourself, your kids, and your friends in a single checkout.
                Finally, a system that understands real life.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">TrustPay Protection</h3>
              <p className="text-muted-foreground">
                Eliminate no-shows with real card holds.
                Guaranteed payouts if they ghost you, without the awkward conversations.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 bg-primary/10 rounded-full">
                <CalendarDays className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Gap Filler</h3>
              <p className="text-muted-foreground">
                Our AI optimizes your schedule to prevent 15-minute dead zones.
                Maximize your revenue per hour automatically.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 md:py-12">
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
