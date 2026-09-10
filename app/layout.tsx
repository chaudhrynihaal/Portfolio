import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Chaudhry Nihaal",
  description: "AI & Automation Engineer helping small businesses scale faster.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="mx-auto max-w-6xl px-5 pb-40 pt-6 sm:px-8">
          <Nav />
          <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[360px_1fr] lg:gap-24">
            <Sidebar />
            <main className="flex flex-col gap-28">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
