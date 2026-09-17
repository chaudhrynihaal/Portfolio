import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";

const siteUrl = "https://nihaal.pro/";
const title = "Chaudhry Nihaal — AI & Automation Engineer";
const description =
  "Chaudhry Nihaal is an AI & Automation Engineer building n8n workflows, AI-powered websites, and custom dashboards for small businesses. See case studies, skills, and get in touch.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Chaudhry Nihaal" }],
  robots: "index, follow",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description:
      "AI & Automation Engineer helping small businesses scale faster with n8n workflows, AI-powered websites, and custom dashboards.",
    siteName: "Chaudhry Nihaal",
  },
  twitter: {
    card: "summary",
    title,
    description:
      "AI & Automation Engineer helping small businesses scale faster with n8n workflows, AI-powered websites, and custom dashboards.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chaudhry Nihaal",
  url: siteUrl,
  jobTitle: "AI & Automation Engineer",
  sameAs: ["https://github.com/chaudhrynihaal", "https://linkedin.com/in/nihaalasif"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
