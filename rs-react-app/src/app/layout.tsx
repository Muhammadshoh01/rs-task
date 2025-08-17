// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Pokemon Explorer',
    description: 'A simple Next.js project to explore Pokemon data',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}
