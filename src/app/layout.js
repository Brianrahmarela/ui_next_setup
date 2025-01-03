import "./globals.css"
import { cn } from "@/lib/utils"

export const metadata = {
  title: 'UI Test',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen antialiased",
        )}
      >
        {children}
      </body>
    </html>
  )
}