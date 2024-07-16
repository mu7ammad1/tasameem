import { Rubik as FontSans } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navication from "@/components/UX/navication";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["arabic"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tasameem",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(fontSans.variable)}>
      <body className="bg-background text-foreground font-sans w-full flex justify-center items-center antialiased">
        <main className="max-w-7xl w-full">
          <Navication />
          {children}
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
