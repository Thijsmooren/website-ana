import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Ana Ontoria Briones | Integrated Event Coordination & Tech Strategy",
  description: "Dublin Tech Expertise. Malaga Heart. Transforming corporate teams and individuals through immersive event design, strategy, and confidence coaching.",
  keywords: ["Event Coordination Malaga", "Corporate Retreats Spain", "Marketing Strategy", "Public Speaking Coach", "Malaga Tech Scene", "Ana Ontoria Briones", "Leadership Coaching"],
  authors: [{ name: "Ana Ontoria Briones" }],
  openGraph: {
    title: "Ana Ontoria Briones | Integrated Event Coordination & Tech Strategy",
    description: "Bridging Dublin tech expertise with Malaga's creative energy. Bespoke corporate events and individual empowerment.",
    url: "https://anaontoria.com",
    siteName: "Ana Ontoria Briones Portfolio",
    locale: "en_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ana Ontoria Briones | Malaga Event Excellence",
    description: "Dublin Tech Expertise. Malaga Heart.",
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
      <body className="antialiased font-sans">
        <Cursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
