import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: "Ana Ontoria Briones | Integrated Event Coordination & Tech Strategy",
  description: "Dublin Tech Expertise. Málaga Heart. Transforming corporate teams and individuals through immersive event design, strategy, and confidence coaching.",
  keywords: ["Event Coordination Málaga", "Corporate Retreats Spain", "Marketing Strategy", "Public Speaking Coach", "Málaga Tech Scene", "Ana Ontoria Briones", "Leadership Coaching"],
  authors: [{ name: "Ana Ontoria Briones" }],
  openGraph: {
    title: "Ana Ontoria Briones | Integrated Event Coordination & Tech Strategy",
    description: "Bridging Dublin tech expertise with Málaga's creative energy. Bespoke corporate events and individual empowerment.",
    url: "https://anaontoria.com",
    siteName: "Ana Ontoria Briones Portfolio",
    locale: "en_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ana Ontoria Briones | Málaga Event Excellence",
    description: "Dublin Tech Expertise. Málaga Heart.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased font-sans`}>
        <Cursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
