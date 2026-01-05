import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "GlowSync Biz | Run Your Beauty Business Better",
    description: "The all-in-one platform for salons and barbers. Switch from Booksy for better protection and lower fees.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased font-sans bg-background text-foreground">
                <Providers>
                    {children}
                    <Toaster position="bottom-right" theme="dark" />
                </Providers>
            </body>
        </html>
    );
}
