import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenAdvisor - Transparent Crypto Advisor Deals",
  description: "The first platform for compliant crypto advisor deals. Link your Twitter, showcase your advisor relationships, and build trust through radical transparency.",
  keywords: "crypto, advisor, KOL, compliance, transparency, Solana, token grants",
  openGraph: {
    title: "OpenAdvisor - Transparent Crypto Advisor Deals",
    description: "The first platform for compliant crypto advisor deals.",
    url: "https://openadvisor.io",
    siteName: "OpenAdvisor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenAdvisor - Transparent Crypto Advisor Deals",
    description: "The first platform for compliant crypto advisor deals.",
    creator: "@OpenAdvisor",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
