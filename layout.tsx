import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Pixelify_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const pixelify = Pixelify_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-pixel',
})

const jbMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-jbmono',
})

export const metadata: Metadata = {
  title: '21 — Городская ОС',
  description: 'Городская операционная система района: карма, задачи, карта, форум и краудфандинг.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f2ea',
  userScalable: false,
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body className={`${pixelify.variable} ${jbMono.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
