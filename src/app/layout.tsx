import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter, Pixelify_Sans } from 'next/font/google'
import HeaderNavigation from "@/components/layout/HeaderNavigation/HeaderNavigation"
import Footer from "@/components/layout/Footer/Footer"

const inter = Inter({ subsets: ['latin'] })
const pixelSans = Pixelify_Sans({subsets: ['latin'], variable: '--font-pixel'})

export const metadata: Metadata = {
  title: 'Next.js Bits',
  description: 'Quick Next.js videos when you need them most.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${pixelSans.variable}`}>
        <HeaderNavigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
