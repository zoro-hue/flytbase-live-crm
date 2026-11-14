import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlytBase CRM — Mission-Critical CRM for Enterprise Operations",
  description:
    "A Questathon-powered, MCP-native CRM that unifies account intelligence, deals, stakeholders, live field signals, and evidence in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#000000] text-[#F4F4F5] min-h-screen antialiased selection:bg-[#FF5A00]/30 selection:text-white`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
