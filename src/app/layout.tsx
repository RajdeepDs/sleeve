import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sleeve",
  description: "Sleeve | Rajdeep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${interSans.variable} ${geistMono.variable} h-full antialiased`}
      lang="en"
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
