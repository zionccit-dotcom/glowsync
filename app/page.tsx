import { BizHeader } from "@/components/biz-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldCheck, Zap, Globe, Smartphone, CreditCard } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <BizHeader />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-24 pb-32 overflow-hidden">
                    <div className="container px-4 md:px-8 relative z-10">
                        <div className="max-w-3xl space-y-8">
                            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                                New: Import your 5-Star Reviews from Google
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                                Stop Paying for <br />
                                <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Fake Leads.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                The all-in-one booking platform that actually protects your revenue.
                                Mandatory deposits, zero "Boost" fees, and a custom website that fits your brand.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="h-14 px-8 text-lg">Start Free Trial</Button>
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg">Compare vs Booksy</Button>
                            </div>
                            <div className="pt-8 flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-bold">
                                            {i === 4 ? "+2k" : ""}
                                        </div>
                                    ))}
                                </div>
                                <p>Join 2,000+ Pros switching this month.</p>
                            </div>
                        </div>
                    </div>
                    {/* Abstract Background Decoration */}
                    <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
                </section>

                {/* The "Why Switch" Grid */}
                <section id="features" className="py-24 bg-muted/30 border-y">
                    <div className="container px-4 md:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Built to Fix the "Booksy Problems"</h2>
                            <p className="text-muted-foreground">We listened to 500+ professionals on Reddit and Capterra. Here is what we built.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <Card className="bg-background border-primary/10">
                                <CardHeader>
                                    <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                                        <ShieldCheck className="h-6 w-6 text-green-500" />
                                    </div>
                                    <CardTitle>Real "No-Show" Protection</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">Booksy holds nothing. We verify funds 24h before the appointment via Stripe holding.</p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 100% Guaranteed Payouts</li>
                                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Auto-charge Cancellations</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Feature 2 */}
                            <Card className="bg-background border-primary/10">
                                <CardHeader>
                                    <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                                        <Globe className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <CardTitle>Web-First Booking</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">Stop forcing clients to download an app. Give them a beautiful, branded link.</p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> No Login Required for Clients</li>
                                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Works on Instagram Bio</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Feature 3 */}
                            <Card className="bg-background border-primary/10">
                                <CardHeader>
                                    <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                                        <Zap className="h-6 w-6 text-purple-500" />
                                    </div>
                                    <CardTitle>Smart Gap Filler</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">Our AI hides awkward 15-minute gaps and only offers slots that maximize your day.</p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Optimized Schedule</li>
                                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> +20% Revenue / Week</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t">
                <div className="container px-4 text-center text-muted-foreground text-sm">
                    <p>&copy; 2026 GlowSync Business. Based in San Francisco.</p>
                </div>
            </footer>
        </div>
    );
}
