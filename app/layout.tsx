export const dynamic = 'force-dynamic'

import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] , variable: '--font-inter'});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"], 
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif',
})

export const metadata: Metadata = {
  title: "MoneyMinds",
  description: "MoneyMinds is an advanced banking system designed to streamline financial operations through innovative solutions. It offers secure and efficient management of personal and corporate finances, including features like real-time transaction processing and user-friendly interfaces for seamless customer interactions. The system is built to support scalability, ensuring it meets the demands of modern banking while adhering to strict security standards.",
  icons: {
    icon: '/icons/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>{children}</body>
    </html>
  );
}
