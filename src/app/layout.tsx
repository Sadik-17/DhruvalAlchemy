import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Dhruval Solanki | Movement Artist & Choreographer",
  description: "Portfolio of Dhruval Solanki, a dance artist and teacher specializing in Kalaripayattu and Indian Contemporary Dance. Explore enchanting performances, major productions, and professional engagements.",
  keywords: ["Dhruval Solanki", "Movement Artist", "Choreographer", "Kalaripayattu", "Contemporary Dance", "Bharatanatyam", "Dance Teacher", "India"],
  authors: [{ name: "Dhruval Solanki" }],
  openGraph: {
    title: "Dhruval Solanki | Movement Artist",
    images: "/IMG_0135.PNG",
    description: "Explore the journey, performances, and professional engagements of Dhruval Solanki in specialized Kalaripayattu and Contemporary Dance.",
    url: "https://dhruval-alchemy.netlify.app",
    siteName: "Dhruval Solanki Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
