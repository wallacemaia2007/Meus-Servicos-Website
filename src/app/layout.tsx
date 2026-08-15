import "./globals.css";

import type { Metadata, Viewport } from "next";
import {
  DM_Serif_Display,
  Plus_Jakarta_Sans,
  Spline_Sans_Mono,
} from "next/font/google";
import { Toaster } from "sonner";

import { QueryProvider } from "@/components/common/query-provider";
import { SmoothScroll } from "@/components/common/smooth-scroll";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/data/dev-content";

const heroPreviewImage = `${site.url}/assets/images/hero-preview.png`;
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

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

// ═══════════════════════════════════════════════════════════
// SEO & METADATA — servicos.maiawall.com
// GSC: configure GOOGLE_SITE_VERIFICATION no ambiente de producao.
// GA4: o snippet do Google Analytics fica documentado no README.md
// ═══════════════════════════════════════════════════════════
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  publisher: site.fullName,
  category: "Tecnologia",
  keywords: site.searchTerms,
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: site.url,
  },
  manifest: "/assets/brand/site.webmanifest",
  icons: {
    icon: [
      { url: "/assets/brand/favicon.svg", type: "image/svg+xml" },
      {
        url: "/assets/brand/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: "/assets/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: heroPreviewImage,
        width: 1920,
        height: 992,
        alt: "Maiawall — Serviços Web Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@wallacemaia2007",
    creator: "@wallacemaia2007",
    title: site.title,
    description: site.description,
    images: [heroPreviewImage],
  },
  other: {
    "geo.region": "BR-MG",
    "geo.placename": "Uberlândia, Minas Gerais, Brasil",
    "business:contact_data:country_name": "Brasil",
    "business:contact_data:region": "Minas Gerais",
    "business:contact_data:locality": "Uberlândia",
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
            <SmoothScroll>
              <Header />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
            <Toaster richColors position="top-right" closeButton />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
