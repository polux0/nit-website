import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const louisFelligri = localFont({
  src: '../public/fonts/LOUISfelligri-Light.otf',
  variable: '--font-louis-felligri',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${louisFelligri.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
