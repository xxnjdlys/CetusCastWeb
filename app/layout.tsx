import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CetusCast | Cast Photos, Videos & Audio to TV",
  description:
    "CetusCast is a Google Play app for casting photos, videos, and audio from your Android phone to TVs and DLNA-compatible devices.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
