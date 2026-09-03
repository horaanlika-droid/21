import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["cyrillic", "latin"],
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "21 — городская ОС",
  description: "Городская экосистема для автономной жизни",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${pressStart.variable}`}>
      <body className="antialiased font-sans bg-[#0f0f0f] flex justify-center items-center min-h-dvh p-4">
        {children}
      </body>
    </html>
  );
}