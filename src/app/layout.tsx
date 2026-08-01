import "./globals.css";

import type { Metadata, Viewport } from "next";
import {
  DM_Serif_Display,
  Plus_Jakarta_Sans,
  Spline_Sans_Mono,
} from "next/font/google";
import { Toaster } from "sonner";

import { QueryProvider } from "@/components/common/query-provider";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/data/dev-content";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline-sans-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 674,
        alt: "Wallace Maia — Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  alternates: {
    canonical: site.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="theme-dev" suppressHydrationWarning>
      <body
        className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${splineSansMono.variable} min-h-screen bg-dev-bg text-dev-text antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster richColors position="top-right" closeButton />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
