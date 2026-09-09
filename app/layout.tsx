import type { Metadata } from "next";
import { Geist, Schibsted_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-schibsted",
  display: "swap",
});

const departureMono = localFont({
  src: "./fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premier Mortgage Resources — A place to call home",
  description:
    "Home financing built around your life. Explore buying or refinancing a home with Premier Mortgage Resources. Connect with a local loan officer. NMLS #1169.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${schibsted.variable} ${departureMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
