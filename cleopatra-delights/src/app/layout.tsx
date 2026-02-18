import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cleopatra Delights | Artisan Desserts by an Engineer",
  description: "An African engineer's precision meets three continents of flavor. Family-size brownies, cookies, and cakes from Egypt, Greece, and Turkey. Jacksonville's premier artisan bakery.",
  keywords: ["bakery", "Jacksonville", "desserts", "brownies", "cookies", "cakes", "Egyptian", "Greek", "Turkish", "artisan"],
  openGraph: {
    title: "Cleopatra Delights | Artisan Desserts",
    description: "Engineered for delight. Family-size desserts from three continents.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
