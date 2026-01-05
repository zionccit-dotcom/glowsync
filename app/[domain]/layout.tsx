export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20">
            {children}
        </div>
    )
}
