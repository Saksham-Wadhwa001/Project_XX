import type { Metadata } from 'next'
import './globals.css'
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';

export const metadata: Metadata = {
  title: 'Project X - Booking Platform',
  description: 'Book items from sellers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
