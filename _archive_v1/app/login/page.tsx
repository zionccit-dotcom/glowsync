"use client"

import { createBrowserClient } from '@supabase/ssr'
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import * as React from "react"

export default function LoginPage() {
    const [supabase] = React.useState(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ))
    const router = useRouter()

    React.useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') {
                router.refresh()
                router.push('/book')
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [router, supabase])

    return (
        <div className="min-h-screen flex flex-col bg-muted/20">
            <SiteHeader />
            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-lg border-primary/10">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Welcome to GlowSync</CardTitle>
                        <CardDescription>Sign in to manage your appointments and squad.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Auth
                            supabaseClient={supabase}
                            appearance={{
                                theme: ThemeSupa,
                                variables: {
                                    default: {
                                        colors: {
                                            brand: 'hsl(var(--primary))',
                                            brandAccent: 'hsl(var(--primary))',
                                        }
                                    }
                                }
                            }}
                            providers={[]}
                            theme="dark"
                            redirectTo={`${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'https://glowsync-beauty.vercel.app' : 'http://localhost:3000'}/auth/callback`}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
