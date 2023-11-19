import '@/styles/globals.css'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { Inter, Pixelify_Sans } from 'next/font/google'
import HeaderNavigation from "@/components/layout/HeaderNavigation"
import Footer from "@/components/layout/Footer"
import Script from "next/script"

const inter = Inter({ subsets: ['latin'] })
const pixelSans = Pixelify_Sans({subsets: ['latin'], variable: '--font-pixel', display: 'swap', adjustFontFallback: false})

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Next.js Bits',
  description: 'Quick Next.js bytes when you need them most.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')

  return (
    <html lang="en" data-theme={theme ? theme.value : 'dark'}>
      <body className={`${inter.className} ${pixelSans.variable}`}>
        <HeaderNavigation />
        <div style={{minHeight: "100vh"}}>
          {children}
        </div>
        <Footer />
        {process.env.NODE_ENV === "production" ? (
          <Script
            strategy="lazyOnload"
            data-domain="nextjsbits.com"
            src="https://plausible.io/js/script.js"
          />
        ) : false}
      </body>
    </html>
  )
}
