import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Compass, PlusCircle, ArrowLeftRight, UserCircle } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KnotSwap Electronics",
  description: "Community hardware barter network",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background relative`}>
        <main>{children}</main>

        {/* Updated KnotSwap Mobile Navigation Tray */}
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex justify-around items-center px-2 z-50 shadow-md">
          <Link href="/" className="flex flex-col items-center text-[10px] font-bold tracking-tight gap-0.5 text-muted-foreground hover:text-primary transition">
            <Compass className="h-5 w-5" />
            Discover
          </Link>
          <Link href="/post" className="flex flex-col items-center text-[10px] font-bold tracking-tight gap-0.5 text-muted-foreground hover:text-primary transition">
            <PlusCircle className="h-5 w-5" />
            Post Item
          </Link>
          <Link href="/trades" className="flex flex-col items-center text-[10px] font-bold tracking-tight gap-0.5 text-muted-foreground hover:text-primary transition">
            <ArrowLeftRight className="h-5 w-5" />
            Trades
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-[10px] font-bold tracking-tight gap-0.5 text-muted-foreground hover:text-primary transition">
            <UserCircle className="h-5 w-5" />
            Profile
          </Link>
        </nav>
      </body>
    </html>
  );
}


