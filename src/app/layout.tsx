import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers'
import { NavBar } from '@/app/components/NavBar'

export const metadata: Metadata = {
  title: "Tasks App",
  description: "A board for tasks and advertisements",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
